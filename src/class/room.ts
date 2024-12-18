/*
    Кабинеты
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Room {

    static async Add ( clinic_id, user_id, fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.create_user_id = new DB().ObjectID(user_id)
            fields.create_date = new Date()

            //проверка номера кабинета на существование

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('room')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRoom Add'}, ...err})
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

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('room')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRoom GetById'}, ...err})
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

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('room')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRoom Get'}, ...err})
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
            let collection = mongoClient.collection('room')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CRoom GetCount'})
        }
    }

    static async Edit ( clinic_id, user_id, id , fields ) {
        try {
            id = new DB().ObjectID(id)

            let arFields = {
                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('room')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: {...fields, ...arFields}})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRoom Edit'}, ...err})
        }
    }

    static async Delete ( clinic_id, user_id, id ) {
        try {
            id = new DB().ObjectID(id)

            let arFields = {
                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('room')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRoom Delete'}, ...err})
        }
    }
}
