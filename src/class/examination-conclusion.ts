/*
    Роли
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class ExaminationConclusion {

    static async Add ( clinic_id, user_id, fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(clinic_id)

            fields.prof_examination_id = new DB().ObjectID(fields.prof_examination_id)
            fields.patient_user_id = new DB().ObjectID(fields.patient_user_id)
            fields.specialty_id = new DB().ObjectID(fields.specialty_id)
            fields.doctor_id = new DB().ObjectID(fields.doctor_id)

            fields.create_user_id = new DB().ObjectID(user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole Add'}, ...err})
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
                    from: 'prof_examination',
                    localField: 'prof_examination_id',
                    foreignField: '_id',
                    as: '_prof_examination_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'user',
                    localField: 'patient_user_id',
                    foreignField: '_id',
                    as: '_patient_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialty',
                    localField: 'specialty_id',
                    foreignField: '_id',
                    as: '_specialty_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'doctor',
                    localField: 'doctor_id',
                    foreignField: '_id',
                    as: '_doctor_id'
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole GetById'}, ...err})
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
                    from: 'prof_examination',
                    localField: 'prof_examination_id',
                    foreignField: '_id',
                    as: '_prof_examination_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'user',
                    localField: 'patient_user_id',
                    foreignField: '_id',
                    as: '_patient_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialty',
                    localField: 'specialty_id',
                    foreignField: '_id',
                    as: '_specialty_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'doctor',
                    localField: 'doctor_id',
                    foreignField: '_id',
                    as: '_doctor_id'
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole Get'}, ...err})
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
            let collection = mongoClient.collection('role')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CRole GetCount'})
        }
    }

    static async Edit ( clinic_id, user_id, id , fields ) {
        try {
            clinic_id = new DB().ObjectID(clinic_id)
            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            fields.prof_examination_id = new DB().ObjectID(fields.prof_examination_id)
            fields.patient_user_id = new DB().ObjectID(fields.patient_user_id)
            fields.specialty_id = new DB().ObjectID(fields.specialty_id)
            fields.doctor_id = new DB().ObjectID(fields.doctor_id)

            let arFields = {
                prof_examination_id: prof_examination_id,
                patient_user_id: fields.patient_user_id,
                specialty_id: fields.specialty_id,
                doctor_id: fields.doctor_id,

                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: {...fields, ...arFields}})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole Edit'}, ...err})
        }
    }

    static async Delete ( clinic_id, user_id, id ) {
        try {
            //ПРОВЕРКА / где роли уже используются

            clinic_id = new DB().ObjectID(clinic_id)
            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            let arFields = {
                delete: true,
                delete_user_id: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CRole Delete'})
        }
    }
}
