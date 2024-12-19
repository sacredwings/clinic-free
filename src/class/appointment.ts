/*
    Приемы
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Appointment {

    static async Add ( clinic_id, user_id, fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(fields.clinic_id)

            fields.room_id = new DB().ObjectID(fields.room_id)
            fields.doctor_id = new DB().ObjectID(fields.doctor_id)
            fields.doctor_user_id = new DB().ObjectID(fields.doctor_user_id)
            fields.patient_user_id = new DB().ObjectID(fields.patient_user_id)

            fields.specialty_ids = new DB().ObjectID(fields.specialty_ids)
            fields.service_ids = new DB().ObjectID(fields.service_ids)

            //проверка существования врача
            //проверка занятости врача
            //проверка существования кабинета
            //проверка занятости кабинета
            //проверка существования пользователя
            //проверка занятости пользователя

            //проверка работает ли врач во время записи

            fields.create_user_id = new DB().ObjectID(fields.create_user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('appointment')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CAppointment Add'}, ...err})
        }
    }

    static async GetById ( clinic_id, ids ) {
        try {
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
                    from: 'room',
                    localField: 'room_id',
                    foreignField: '_id',
                    as: '_room_id'
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
            arAggregate.push({
                $lookup: {
                    from: 'user',
                    localField: 'doctor_user_id',
                    foreignField: '_id',
                    as: '_doctor_user_id'
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
                    localField: 'specialty_ids',
                    foreignField: '_id',
                    as: '_specialty_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'service',
                    localField: 'service_ids',
                    foreignField: '_id',
                    as: '_service_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_room_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_doctor_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_doctor_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_patient_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('appointment')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CAppointment GetById'}, ...err})
        }
    }

    static async Get ( clinic_id, fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {
                    clinic_id: clinic_id,
                    delete: {$ne: true}
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'room',
                    localField: 'room_id',
                    foreignField: '_id',
                    as: '_room_id'
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
            arAggregate.push({
                $lookup: {
                    from: 'user',
                    localField: 'doctor_user_id',
                    foreignField: '_id',
                    as: '_doctor_user_id'
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
                    localField: 'specialty_ids',
                    foreignField: '_id',
                    as: '_specialty_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'service',
                    localField: 'service_ids',
                    foreignField: '_id',
                    as: '_service_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_room_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_doctor_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_doctor_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_patient_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('appointment')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CAppointment Get'}, ...err})
        }
    }

    static async GetCount ( clinic_id, fields ) {
        try {
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
            let collection = mongoClient.collection('appointment')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CAppointment GetCount'})
        }
    }

    static async Edit ( clinic_id, user_id, id , fields ) {
        try {
            id = new DB().ObjectID(id)

            fields.room_id = new DB().ObjectID(fields.room_id)
            fields.doctor_id = new DB().ObjectID(fields.doctor_id)
            fields.doctor_user_id = new DB().ObjectID(fields.doctor_user_id)
            fields.patient_user_id = new DB().ObjectID(fields.patient_user_id)

            fields.specialty_ids = new DB().ObjectID(fields.specialty_ids)
            fields.service_ids = new DB().ObjectID(fields.service_ids)

            let arFields = {
                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('appointment')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: {...fields, ...arFields}})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CAppointment Edit'}, ...err})
        }
    }

    static async Delete ( clinic_id, user_id, id ) {
        try {
            id = new DB().ObjectID(id)
            user_id = new DB().ObjectID(user_id)

            let arFields = {
                delete: true,
                delete_user_id: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('appointment')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CAppointment Delete'})
        }
    }
}
