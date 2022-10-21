import Joi from "joi"
import CWorker from "../../../classes/worker"
import CContract from "../../../classes/contract"
import CContractType from "../../../classes/contract-type"
import CHf from "../../../classes/hf"
import CResearch from "../../../classes/research"
import CSpecialist from "../../../classes/specialist"
import CUser from "../../../classes/user"
import DbConnect from "../../../util/DbConnect";

export default async (req, res) => {
    let value
    try {
        try {
            req.body.hf_code = req.body.hf_code.replace(/ /gi, '') //удаление пробелов
            req.body.hf_code = req.body.hf_code.split(',') //в массив
            //схема
            const schema = Joi.object({
                contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                contract_type_ids: Joi.array().min(0).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),
                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty('').default(null),

                first_name: Joi.string().min(1).max(255).required(),
                last_name: Joi.string().min(1).max(255).required(),
                patronymic_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),

                man: Joi.number().integer().min(0).max(1).required(),

                date_birth: Joi.date().min('1-1-1900').max('1-1-2030').required(),

                price_ultrasound: Joi.boolean().allow(null).empty('').default(null),
                price_mammography: Joi.boolean().allow(null).empty('').default(null),
                price_xray: Joi.boolean().allow(null).empty('').default(null),

                oms_policy_number: Joi.number().integer().min(999999999999999).max(9999999999999999).allow(null).empty('').default(null),
                snils: Joi.number().integer().min(9999999999).max(99999999999).allow(null).empty('').default(null),
                dogovor_type: Joi.number().integer().min(0).max(1).allow(null).empty('').default(0),

                region: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                city: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                street: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                house: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                housing: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                apt: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                building: Joi.string().min(0).max(255).allow(null).empty('').default(null),

                passport_serial: Joi.number().integer().min(1).max(9999).allow(null).empty('').default(null),
                passport_number: Joi.number().integer().min(1).max(999999).allow(null).empty('').default(null),
                passport_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                passport_issued_by: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                phone: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),
                phone_additional: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),

                subdivision: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                profession: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                employment_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                work_place: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                work_experience: Joi.number().integer().min(0).max(100).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let price = 0
            let arResearch = []
            let arSpecialist = []

            let hfContract = null

            //ВЫБОР ТИПОВ ДОГОВОРОВ ИЗ ДОГОВОРА
            if (value.contract_id) {
                //загрузка договора
                hfContract = await CContract.GetById ([value.contract_id])
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

                //добавляем в общему массиву
                for (let contract_type of arType) {
                    if (contract_type.research_ids) arResearch = [...arResearch, ...contract_type.research_ids]
                    if (contract_type.specialist_ids) arSpecialist = [...arSpecialist, ...contract_type.specialist_ids]
                }
            }

            //console.log(arResearch)
            //console.log(arSpecialist)

            //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ВРЕДНЫХ ФАКТОРОВ
            //загрузка кодов
            let arHf = await CHf.GetByCode (value.hf_code)

            //сохраняем каждый из массива вредных факторов
            for (let hf of arHf) {
                arResearch = [...arResearch, ...hf.research_ids]
                arSpecialist = [...arSpecialist, ...hf.specialist_ids]
            }

            //Оставляем уникальные с прайсами
            arResearch = await CResearch.GetByIdPrice (arResearch)
            arSpecialist = await CSpecialist.GetByIdPrice (arSpecialist)

            //console.log(arResearch)
            //console.log(arSpecialist)

            for (let item of arResearch) {
                if ((item._price) && (item._price[0]))
                    price += item._price[0].price
            }
            for (let item of arSpecialist) {
                if ((item._price) && (item._price[0]))
                    price += item._price[0].price
            }

            //поиск пользователя среди существующих
            let arFields = {
                first_name: value.first_name,
                last_name: value.last_name,
                patronymic_name: value.patronymic_name,
                date_birth: value.date_birth
            }
            let searchUser = await CUser.GetByFields(arFields)

            if (!searchUser) {
                arFields = {
                    first_name: value.first_name,
                    last_name: value.last_name,
                    patronymic_name: value.patronymic_name,

                    man: value.man,

                    date_birth: value.date_birth,

                    oms_policy_number: value.oms_policy_number,
                    snils: value.snils,

                    region: value.region,
                    city: value.city,
                    street: value.street,
                    house: value.house,
                    housing: value.housing,
                    apt: value.apt,
                    building: value.building,

                    passport_serial: value.passport_serial,
                    passport_number: value.passport_number,
                    passport_date: value.passport_date,

                    passport_issued_by: value.passport_issued_by,
                    phone: value.phone,
                    phone_additional: value.phone_additional,
                }
                await CUser.Add ( arFields )
            }

            arFields = {
                user_id: searchUser ? searchUser._id : arFields._id,

                contract_id: value.contract_id,
                contract_type_ids: value.contract_type_ids,
                hf_code: value.hf_code,

                price: price,
                price_ultrasound: null,
                price_mammography: null,
                price_xray: null,

                research_ids: arResearch,
                specialist_ids: arSpecialist,

                subdivision: value.subdivision,
                profession: value.profession,
                employment_date: value.employment_date,

                work_place: value.work_place,
                work_experience: value.work_experience,
            }

            if (hfContract) {
                //добавление последних полей
                if ((hfContract.price_ultrasound) && (value.price_ultrasound)) {
                    arFields.price_ultrasound = hfContract.price_ultrasound
                    price += hfContract.price_ultrasound
                }
                if ((hfContract.price_mammography) && (value.price_mammography)) {
                    arFields.price_mammography = hfContract.price_mammography
                    price += hfContract.price_mammography
                }
                if ((hfContract.price_xray) && (value.price_xray)) {
                    arFields.price_xray = hfContract.price_xray
                    price += hfContract.price_xray
                }
            }

            let result = await CWorker.Add ( arFields )

            res.status(200).json({
                code: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RWorker Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}