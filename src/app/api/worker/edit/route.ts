import Joi from "joi"
import CWorker from "@/class/worker"
import CContract from "@/class/contract"
import CContractType from "@/class/contract-type"
import CHf from "@/class/hf"
import CResearch from "@/class/research"
import CSpecialist from "@/class/specialist"
import { mongo, minio } from "@/utility/connect"
import {NextResponse} from "next/server";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            if (rsRequest.hf_code) rsRequest.hf_code = rsRequest.hf_code.replace(/ /gi, '') //удаление пробелов
            if (rsRequest.hf_code) rsRequest.hf_code = rsRequest.hf_code.split(',') //в массив

            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                contract_type_ids: Joi.array().min(0).max(10).items(Joi.string().min(24).max(24)).empty(['', null]).default(null),
                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).empty(['', null]).default(null),

                price_ultrasound: Joi.boolean().allow(null).empty('').default(null),
                price_mammography: Joi.boolean().allow(null).empty('').default(null),
                price_xray: Joi.boolean().allow(null).empty('').default(null),

                subdivision: Joi.string().min(0).max(255).empty(['', null]).default(null),
                profession: Joi.string().min(0).max(255).empty(['', null]).default(null),
            })

            value = await schema.validateAsync(rsRequest)

            if (value.contract_type_ids && !value.contract_type_ids.length) value.contract_type_ids = null

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let searchWorker = await CWorker.GetById([value.id])
            searchWorker = searchWorker[0]

            let price = 0
            let arResearch = []
            let arSpecialist = []

            let arResearchIds = []
            let arSpecialistIds = []

            let hfContract = null

            //ВЫБОР ТИПОВ ДОГОВОРОВ ИЗ ДОГОВОРА
            if (searchWorker.contract_id) {
                //загрузка договора
                hfContract = await CContract.GetById ([searchWorker.contract_id])
                if (!hfContract.length) throw ({code: 30100000, msg: 'Договор не найден'})
                hfContract = hfContract[0]


                //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ОБЩИХ указанных в контракте
                //если типы добавлены в контракт
                if (hfContract.contract_type_ids) {
                    let arType = await CContractType.GetById(hfContract.contract_type_ids) //загрузка типов

                    //добавляем в общему массиву
                    for (let contract_type of arType) {
                        if (contract_type.research_ids) arResearch = [...arResearch, ...contract_type.research_ids]
                        if (contract_type.specialist_ids) arSpecialist = [...arSpecialist, ...contract_type.specialist_ids]
                    }
                }
            }


            //ВЫБОР ТИПОВ ДОГОВОРОВ ИЗ ПОЛЬЗОВАТЕЛЯ
            if (value.contract_type_ids) {
                //Запрос с контрактам
                let arType = await CContractType.GetById(value.contract_type_ids) //загрузка типов
                if (value.contract_type_ids.length !== arType.length) throw ({code: 30100000, msg: 'Не все типы договоров найдены'})

                //добавляем в общему массиву
                for (let contract_type of arType) {
                    if (contract_type.research_ids) arResearch = [...arResearch, ...contract_type.research_ids]
                    if (contract_type.specialist_ids) arSpecialist = [...arSpecialist, ...contract_type.specialist_ids]
                }
            }

            //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ВРЕДНЫХ ФАКТОРОВ
            //загрузка кодов
            if (value.hf_code) {

                let arHf = await CHf.GetByCode (value.hf_code)

                //сохраняем каждый из массива вредных факторов
                for (let hf of arHf) {
                    if (hf.research_ids)
                        arResearch = [...arResearch, ...hf.research_ids]

                    if (hf.specialist_ids)
                        arSpecialist = [...arSpecialist, ...hf.specialist_ids]
                }
            }

            //ОБРАБОТКА ПОЛУЧЕННЫХ ИСЛЕДОВАНИЙ И СПЕЦИАЛИСТОВ
            //Оставляем уникальные
            arResearch = await CResearch.GetById (arResearch, {price:true})
            arSpecialist = await CSpecialist.GetById (arSpecialist, {price:true})

            arResearch = Field(arResearch)
            arSpecialist = Field(arSpecialist)

            arResearchIds = FieldToId (arResearch)
            arSpecialistIds = FieldToId (arSpecialist)

            //----------------------------------------------------------------------
            //РАСЧЕТ ЦЕНЫ

            //Фиксированный прайс не указан в Договоре
            if (!hfContract.price) {
                //считает
                for (let item of arResearch) {
                    if ((item._price) && (item._price))
                        price += item._price.price
                }
                for (let item of arSpecialist) {
                    if ((item._price) && (item._price))
                        price += item._price.price
                }
            } else {
                //указана фиксированная цена
                price = hfContract.price
            }

            let arFields = {
                contract_type_ids: value.contract_type_ids,
                hf_code: value.hf_code,

                price: price,
                price_ultrasound: value.price_ultrasound,
                price_mammography: value.price_mammography,
                price_xray: value.price_xray,

                research_ids: arResearchIds,
                specialist_ids: arSpecialistIds,

                research: arResearch,
                specialist: arSpecialist,

                subdivision: value.subdivision,
                profession: value.profession,
            }

            let result = await CWorker.Edit ( value.id, arFields )

            return NextResponse.json({
                err: 0,
                response: {
                    _id: value.id
                }
            })

        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RWorker Edit'}, ...err})
    }
}

function FieldToId (arr) {
    if (!arr || !arr.length) return null

    let newArr = []
    for (let item of arr) {
        newArr.push(item._id)
    }

    return newArr
}

function Field (arr) {
    if (!arr || !arr.length) return null

    let newArr = []
    for (let item of arr) {
        let newItem = {
            _id: item._id,
            name: item.name,
            price: null
        }
        if ((item._price) && (item._price))
            newItem.price = item._price.price

        newArr.push(newItem)
    }

    return newArr
}