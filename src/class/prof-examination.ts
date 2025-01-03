/*
    Проф осмотры
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class ProfExamination {

    static async Add ( clinic_id, user_id, fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(clinic_id)

            fields.contract_id = new DB().ObjectID(fields.contract_id)
            fields.patient_user_id = new DB().ObjectID(fields.patient_user_id)

            fields.create_user_id = new DB().ObjectID(user_id) //пользователь создатель
            fields.create_date = new Date()

            //проверка номера кабинета на существование

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('employee')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CEmployee Add'}, ...err})
        }
    }

    static async GetById ( clinic_id, ids ) {
        try {
            clinic_id = new DB().ObjectID(clinic_id)
            ids = new DB().ObjectID(ids)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    clinic_id: clinic_id,
                    _id: {$in: ids},
                    delete: {$ne: true}
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
                    from: 'patient',
                    localField: 'patient_user_id',
                    foreignField: '_id',
                    as: '_patient_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialty',
                    localField: 'specialty_ids',
                    foreignField: '_id',
                    as: '_specialty_ids'
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
                    from: 'user',
                    localField: 'chairperson_user_id',
                    foreignField: '_id',
                    as: '_chairperson_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'doctor',
                    localField: 'chairperson_doctor_id',
                    foreignField: '_id',
                    as: '_chairperson_doctor_id'
                }
            })
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('employee')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CEmployee GetById'}, ...err})
        }
    }

    static async Get ( clinic_id, fields ) {
        try {
            clinic_id = new DB().ObjectID(clinic_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    clinic_id: clinic_id,
                    delete: {$ne: true}
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
                    from: 'patient',
                    localField: 'patient_user_id',
                    foreignField: '_id',
                    as: '_patient_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialty',
                    localField: 'specialty_ids',
                    foreignField: '_id',
                    as: '_specialty_ids'
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
                    from: 'user',
                    localField: 'chairperson_user_id',
                    foreignField: '_id',
                    as: '_chairperson_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'doctor',
                    localField: 'chairperson_doctor_id',
                    foreignField: '_id',
                    as: '_chairperson_doctor_id'
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('employee')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CEmployee Get'}, ...err})
        }
    }

    static async GetCount ( clinic_id, fields ) {
        try {
            clinic_id = new DB().ObjectID(clinic_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    clinic_id: clinic_id,
                    delete: {$ne: true}
                }
            })

            arAggregate.push({
                $count: 'count'
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('employee')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CEmployee GetCount'})
        }
    }

    static async Edit ( clinic_id, user_id, id , fields ) {
        try {
            clinic_id = new DB().ObjectID(clinic_id)
            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            let arFields = {
                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('employee')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: {...fields, ...arFields}})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CEmployee Edit'}, ...err})
        }
    }

    static async Delete ( clinic_id, user_id, id ) {
        try {
            clinic_id = new DB().ObjectID(clinic_id)
            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            let arFields = {
                delete: true,
                delete_user_id: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('employee')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: arFields}, {upsert: true})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CEmployee Delete'}, ...err})
        }
    }
}
