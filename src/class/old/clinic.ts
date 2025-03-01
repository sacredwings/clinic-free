/*
    Клиники
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Clinic {

    static async Add ( user_id, fields ) {
        try {
            fields.create_user_id = new DB().ObjectID(user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CClinic Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().ObjectID(ids)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    _id: {$in: ids},
                    delete: {$ne: true}
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CClinic GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CClinic Get'}, ...err})
        }
    }

    static async GetCount ( fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            arAggregate.push({
                $count: 'count'
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CClinic GetCount'})
        }
    }

    static async Edit ( user_id, id , fields ) {
        try {
            //ПРОВЕРКА / на первое время редактировать может только создатель
            user_id = new DB().ObjectID(user_id) //есть разрешение радактировать
            id = new DB().ObjectID(id)

            let arFields = {
                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            let result = collection.updateOne({_id: id}, {$set: {...fields, ...arFields}})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CClinic Edit'}, ...err})
        }
    }

    static async Delete ( user_id, id ) {
        try {
            //ПРОВЕРКА / проверка записей принадлежащих клинике по всем таблицам

            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            let arFields = {
                delete: true,
                delete_user: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CClinic Delete'})
        }
    }
}
