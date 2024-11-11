/*
    Должность
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"
import CContract from "@/class/contract";
import CContractType from "@/class/contract-type";
import CHf from "@/class/hf";
import CResearch from "@/class/research";
import CSpecialist from "@/class/specialist";
import {CUser} from "../../../social-framework/src"

export default class ProfExamination {

    static async Add(fields) {
        try {
            let arResearch = []
            let arSpecialist = []

            let arResearchIds = []
            let arSpecialistIds = []

            let hfContract = null

            //----------------------------------------------------------------------
            //СБОР СПЕЦИАЛИСТОВ И ИСЛЕДОВНИЙ

            //ВЫБОР ТИПОВ ДОГОВОРОВ ИЗ ДОГОВОРА
            if (fields.contract_id) {
                //загрузка договора
                hfContract = await CContract.GetById ([fields.contract_id])
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
            if (fields.contract_type_ids) {
                //Запрос с контрактам
                let arType = await CContractType.GetById(fields.contract_type_ids) //загрузка типов
                if (fields.contract_type_ids.length !== arType.length) throw ({code: 30100000, msg: 'Не все типы договоров найдены'})

                //добавляем в общему массиву
                for (let contract_type of arType) {
                    if (contract_type.research_ids) arResearch = [...arResearch, ...contract_type.research_ids]
                    if (contract_type.specialist_ids) arSpecialist = [...arSpecialist, ...contract_type.specialist_ids]
                }
            }

            //ЗДЕСЬ ВЫТАСКИВАЕМ ИЗ ВРЕДНЫХ ФАКТОРОВ
            //загрузка кодов
            if (fields.hf_code) {

                let arHf = await CHf.GetByCode (fields.hf_code)

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
                    if (fields.man === 1)
                        arPrice.price_worker_man = hfContract.price_worker_man
                    else
                        arPrice.price_worker_woman = hfContract.price_worker_woman

                    arPrice.price += arPrice.price_worker_man
                    arPrice.price += arPrice.price_worker_woman

                }

                //дополнительные поля
                if ((hfContract.price_ultrasound) && (fields.check_ultrasound)) {
                    arPrice.price_ultrasound = hfContract.price_ultrasound
                    arPrice.price += arPrice.price_ultrasound
                }
                if ((hfContract.price_mammography) && (fields.check_mammography)) {
                    arPrice.price_mammography = hfContract.price_mammography
                    arPrice.price += arPrice.price_mammography
                }
                if ((hfContract.price_xray) && (fields.check_xray)) {
                    arPrice.price_xray = hfContract.price_xray
                    arPrice.price += arPrice.price_xray
                }
                if ((hfContract.price_pcr) && (fields.check_pcr)) {
                    arPrice.price_pcr = hfContract.price_pcr
                    arPrice.price += arPrice.price_pcr
                }
                if ((hfContract.price_hti) && (fields.check_hti)) {
                    arPrice.price_hti = hfContract.price_hti
                    arPrice.price += arPrice.price_hti
                }
                if ((hfContract.price_brucellosis) && (fields.check_brucellosis)) {
                    arPrice.price_brucellosis = hfContract.price_brucellosis
                    arPrice.price += arPrice.price_brucellosis
                }
            }

            //----------------------------------------------------------------------
            //поиск пользователя среди существующих
            let arFieldsSearch = {
                first_name: fields.first_name,
                last_name: fields.last_name,
                second_name: fields.second_name,
                date_birth: fields.date_birth
            }
            let arUser = await CUser.GetByField(arFieldsSearch)

            //создание пользователя
            if (!arUser) {
                let arFieldsUser = {
                    first_name: fields.first_name,
                    last_name: fields.last_name,
                    second_name: fields.second_name,
                    man: fields.man,
                    date_birth: fields.date_birth,

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
                    phone: fields.phone,
                    //phone_additional: value.phone_additional,
                }
                arUser = await CUser.Add ( arFieldsUser )
            }

            //СОЗДАНИЕ ОСМОТРА
            let arWorker = {
                clinic_id: new DB().ObjectID(fields.clinic_id),
                user_id: new DB().ObjectID(arUser._id),

                contract_id: new DB().ObjectID(fields.contract_id),
                contract_type_ids: new DB().ObjectID(fields.contract_type_ids),
                hf_code: fields.hf_code,

                check_ultrasound: fields.check_ultrasound,
                check_mammography: fields.check_mammography,
                check_xray: fields.check_xray,

                check_pcr: fields.check_pcr,
                check_hti: fields.check_hti,
                check_brucellosis: fields.check_brucellosis,

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

                research_ids: new DB().ObjectID(arResearchIds),
                specialist_ids: new DB().ObjectID(arSpecialistIds),

                research: arResearch,
                specialist: arSpecialist,

                subdivision: fields.subdivision,
                profession: fields.profession,

                create_user_id: new DB().ObjectID(fields.create_user_id),
                create_date: new Date()
            }

            //let result = await CProfExamination.Add ( arWorker )

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof_examination')
            await collection.insertOne(arWorker)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().ObjectID(ids)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    _id: {$in: ids}
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: '_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'contract',
                    localField: 'contract_id',
                    foreignField: '_id',
                    as: '_contract_id',
                    pipeline: [
                        { $lookup:
                                {
                                    from: 'org',
                                    localField: 'org_id',
                                    foreignField: '_id',
                                    as: '_org_id'
                                }
                        },
                        {
                            $unwind:
                                {
                                    path: '$_org_id',
                                    preserveNullAndEmptyArrays: true
                                }
                        }
                    ]
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'contract-type',
                    localField: 'contract_type_ids',
                    foreignField: '_id',
                    as: '_contract_type_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_contract_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof_examination')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.contract_id = new DB().ObjectID(fields.contract_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: '_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'contract',
                    localField: 'contract_id',
                    foreignField: '_id',
                    as: '_contract_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'contract-type',
                    localField: 'contract_type_ids',
                    foreignField: '_id',
                    as: '_contract_type_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_contract_id',
                    preserveNullAndEmptyArrays: true
                }
            })

            if (fields.clinic_id)
                arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.q)
                arAggregate[0].$match.q = fields.q
            if (fields.contract_id)
                arAggregate[0].$match.contract_id = fields.contract_id

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof_examination')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination Get'}, ...err})
        }
    }

    static async GetCount ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.contract_id = new DB().ObjectID(fields.contract_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            arAggregate.push({
                $count: 'count'
            })

            if (fields.clinic_id)
                arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.q)
                arAggregate[0].$match.q = fields.q
            if (fields.contract_id)
                arAggregate[0].$match.contract_id = fields.contract_id

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof_examination')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CProfExamination GetCount'})
        }
    }

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof_examination')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination Update'}, ...err})
        }
    }

    static async Delete ( id, user_id ) {
        try {
            id = new DB().ObjectID(id)
            user_id = new DB().ObjectID(user_id)

            let arFields = {
                delete: true,
                delete_user: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof_examination')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CProfExamination Delete'})
        }
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