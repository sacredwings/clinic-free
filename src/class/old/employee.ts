/*
    Сотрудники
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Employee {

    static async Add ( clinic_id, user_id, fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(clinic_id)

            fields.user_id = new DB().ObjectID(fields.user_id) //пользователь сотрудника
            fields.role_ids = new DB().ObjectID(fields.role_ids)
            fields.specialty_ids = new DB().ObjectID(fields.specialty_ids)

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
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: '_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'role',
                    localField: 'role_ids',
                    foreignField: '_id',
                    as: '_role_ids'
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
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: '_user_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'role',
                    localField: 'role_ids',
                    foreignField: '_id',
                    as: '_role_ids'
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

            fields.user_id = new DB().ObjectID(fields.user_id) //пользователь сотрудника
            fields.role_ids = new DB().ObjectID(fields.role_ids)
            fields.specialty_ids = new DB().ObjectID(fields.specialty_ids)

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
