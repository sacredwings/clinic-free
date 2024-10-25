// @ts-nocheck
import Joi from "joi"
import CUser from "@/class/user"
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

                contract_type_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty(Joi.array().length(0)).default(null),
                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty('').default(null),

                check_ultrasound: Joi.boolean().allow(null).empty('').default(null),
                check_mammography: Joi.boolean().allow(null).empty('').default(null),
                check_xray: Joi.boolean().allow(null).empty('').default(null),

                check_pcr: Joi.boolean().allow(null).empty('').default(null),
                check_hti: Joi.boolean().allow(null).empty('').default(null),
                check_brucellosis: Joi.boolean().allow(null).empty('').default(null),

                subdivision: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                profession: Joi.string().min(0).max(255).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(rsRequest)

            //if (value.contract_type_ids && !value.contract_type_ids.length) value.contract_type_ids = null

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let searchWorker = await CWorker.GetById([value.id])
            searchWorker = searchWorker[0]

            let searchUser = await CUser.GetById([searchWorker.user_id])
            searchUser = searchUser[0]

            //let price = 0
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

                    //загрузка типов
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
            //РАСЧЕТ ЦЕНЫ ДОПОЛНИТЕЛЬНОГО

            let arPrice = {
                price_ultrasound: 0,
                price_mammography: 0,
                price_xray: 0,

                price_pcr: 0,
                price_hti: 0,
                price_brucellosis: 0,

                price_worker_hf: 0,
                price_worker_all: 0,
                price_worker_man: 0,
                price_worker_woman: 0,

                price: 0
            }

            //нет фиксированных сумм
            if (!hfContract.price_worker_all && !hfContract.price_worker_man && !hfContract.price_worker_woman) {

                //ВРЕДНЫЙ ФАКТОР
                if (arResearch)
                    for (let item of arResearch)
                        if (item.price) arPrice.price_worker_hf += item.price

                if (arSpecialist)
                    for (let item of arSpecialist)
                        if (item.price) arPrice.price_worker_hf += item.price

                //по умолчанию основной - вредный фактор
                arPrice.price += arPrice.price_worker_hf
            }

            //console.log(hfContract)
            if (hfContract) {
                //основные поля
                if (hfContract.price_worker_all) {
                    arPrice.price_worker_all = hfContract.price_worker_all
                    arPrice.price = arPrice.price_worker_all
                }
                if (hfContract.price_worker_man && hfContract.price_worker_woman) {
                    if (searchUser.man === 1)
                        arPrice.price_worker_man = hfContract.price_worker_man
                    else
                        arPrice.price_worker_woman = hfContract.price_worker_woman

                    arPrice.price += arPrice.price_worker_man
                    arPrice.price += arPrice.price_worker_woman

                }

                //дополнительные поля
                if ((hfContract.price_ultrasound) && (value.check_ultrasound)) {
                    arPrice.price_ultrasound = hfContract.price_ultrasound
                    arPrice.price += arPrice.price_ultrasound
                }
                if ((hfContract.price_mammography) && (value.check_mammography)) {
                    arPrice.price_mammography = hfContract.price_mammography
                    arPrice.price += arPrice.price_mammography
                }
                if ((hfContract.price_xray) && (value.check_xray)) {
                    arPrice.price_xray = hfContract.price_xray
                    arPrice.price += arPrice.price_xray
                }
                if ((hfContract.price_pcr) && (value.check_pcr)) {
                    arPrice.price_pcr = hfContract.price_pcr
                    arPrice.price += arPrice.price_pcr
                }
                if ((hfContract.price_hti) && (value.check_hti)) {
                    arPrice.price_hti = hfContract.price_hti
                    arPrice.price += arPrice.price_hti
                }
                if ((hfContract.price_brucellosis) && (value.check_brucellosis)) {
                    arPrice.price_brucellosis = hfContract.price_brucellosis
                    arPrice.price += arPrice.price_brucellosis
                }
            }

            let arFields = {
                contract_type_ids: value.contract_type_ids,
                hf_code: value.hf_code,

                check_ultrasound: value.check_ultrasound,
                check_mammography: value.check_mammography,
                check_xray: value.check_xray,

                check_pcr: value.check_pcr,
                check_hti: value.check_hti,
                check_brucellosis: value.check_brucellosis,

                price_ultrasound: arPrice.price_ultrasound ? arPrice.price_ultrasound : null,
                price_mammography: arPrice.price_mammography ? arPrice.price_mammography : null,
                price_xray: arPrice.price_xray ? arPrice.price_xray : null,

                price_pcr: arPrice.price_pcr ? arPrice.price_pcr : null,
                price_hti: arPrice.price_hti ? arPrice.price_hti : null,
                price_brucellosis: arPrice.price_brucellosis ? arPrice.price_brucellosis : null,

                price_worker_hf: arPrice.price_worker_hf ? arPrice.price_worker_hf : null,
                price_worker_all: arPrice.price_worker_all ? arPrice.price_worker_all : null,
                price_worker_man: arPrice.price_worker_man ? arPrice.price_worker_man : null,
                price_worker_woman: arPrice.price_worker_woman ? arPrice.price_worker_woman : null,

                price: arPrice.price,

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

        if ((item._price) && (item._price.price))
            newItem.price = item._price.price

        newArr.push(newItem)
    }

    return newArr
}
