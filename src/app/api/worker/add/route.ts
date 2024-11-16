// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CProfExamination from "@/class/prof-examination"
import CContract from "@/class/contract"
import CContractType from "@/class/contract-type"
import CHf from "@/class/hf"
import CResearch from "@/class/research"
import CSpecialist from "@/class/specialist"
import {CUser} from "../../../../../../social-framework/src"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            if (rsRequest.hf_code) rsRequest.hf_code = rsRequest.hf_code.replace(/ /gi, '') //удаление пробелов
            if (rsRequest.hf_code) rsRequest.hf_code = rsRequest.hf_code.split(',') //в массив

            //схема
            const schema = Joi.object({
                contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                contract_type_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty(Joi.array().length(0)).default(null),
                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty(Joi.array().length(0)).default(null),

                first_name: Joi.string().min(1).max(255).required(),
                last_name: Joi.string().min(1).max(255).required(),
                second_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),

                man: Joi.number().integer().min(0).max(1).required(),
                date_birth: Joi.date().min('1-1-1900').max('1-1-2030').required(),

                check_ultrasound: Joi.boolean().allow(null).empty('').default(null),
                check_mammography: Joi.boolean().allow(null).empty('').default(null),
                check_xray: Joi.boolean().allow(null).empty('').default(null),

                check_pcr: Joi.boolean().allow(null).empty('').default(null),
                check_hti: Joi.boolean().allow(null).empty('').default(null),
                check_brucellosis: Joi.boolean().allow(null).empty('').default(null),

                //oms_policy_number: Joi.number().integer().min(999999999999999).max(9999999999999999).allow(null).empty('').default(null),
                //snils: Joi.number().integer().min(9999999999).max(99999999999).allow(null).empty('').default(null),
                //dogovor_type: Joi.number().integer().min(0).max(1).allow(null).empty('').default(0),

                //region: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //city: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //street: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //house: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //housing: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //apt: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //building: Joi.string().min(0).max(255).allow(null).empty('').default(null),

                //passport_serial: Joi.number().integer().min(1).max(9999).allow(null).empty('').default(null),
                //passport_number: Joi.number().integer().min(1).max(999999).allow(null).empty('').default(null),
                //passport_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                //passport_issued_by: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                phone: Joi.number().min(1000000000).max(9999999999).allow(null).empty('').default(null),
                //phone_additional: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),

                subdivision: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                profession: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                //employment_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                //work_place: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //work_experience: Joi.number().integer().min(0).max(100).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            //let price = 0
            let arResearch = []
            let arSpecialist = []

            let arResearchIds = []
            let arSpecialistIds = []

            let hfContract = null

            //----------------------------------------------------------------------
            //СБОР СПЕЦИАЛИСТОВ И ИСЛЕДОВНИЙ

            //ВЫБОР ТИПОВ ДОГОВОРОВ ИЗ ДОГОВОРА
            if (value.contract_id) {
                //загрузка договора
                hfContract = await CContract.GetById ([value.contract_id])
                if (!hfContract.length) throw ({code: 30100000, msg: 'Договор не найден'})
                hfContract = hfContract[0]

                //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ОБЩИХ указанных в контракте
                //если типы добавлены в контракт
                if (hfContract.contract_type_ids) {

                    //загрузка типов
                    let arType = await CContractType.GetById(hfContract.contract_type_ids)

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

            if (hfContract) {
                //основные поля
                if (hfContract.price_worker_all) {
                    arPrice.price_worker_all = hfContract.price_worker_all
                    arPrice.price = arPrice.price_worker_all
                }
                if (hfContract.price_worker_man && hfContract.price_worker_woman) {
                    if (value.man === 1)
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

            //----------------------------------------------------------------------
            //поиск пользователя среди существующих
            let arFieldsSearch = {
                first_name: value.first_name,
                last_name: value.last_name,
                second_name: value.second_name,
                date_birth: value.date_birth
            }
            let arUser = await CUser.GetByField(arFieldsSearch)

            //создание пользователя
            if (!arUser) {
                let arFieldsUser = {
                    first_name: value.first_name,
                    last_name: value.last_name,
                    second_name: value.second_name,
                    man: value.man,
                    date_birth: value.date_birth,

                    //oms_policy_number: value.oms_policy_number,
                    //snils: value.snils,

                    //region: value.region,
                    //city: value.city,
                    //street: value.street,
                    //house: value.house,
                    //housing: value.housing,
                    //apt: value.apt,
                    //building: value.building,

                    //passport_serial: value.passport_serial,
                    //passport_number: value.passport_number,
                    //passport_date: value.passport_date,

                    //passport_issued_by: value.passport_issued_by,
                    phone: value.phone,
                    //phone_additional: value.phone_additional,
                }
                arUser = await CUser.Add ( arFieldsUser )
            }

            //СОЗДАНИЕ РАБОТНИКА
            let arWorker = {
                user_id: arUser._id,

                contract_id: value.contract_id,
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

            let result = await CProfExamination.Add ( arWorker )

            return NextResponse.json({
                err: 0,
                response: result
            })

        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RWorker Add'}, ...err})
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
