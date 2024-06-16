/*
    Должность
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Worker {

    static async Add(fields) {
        try {
            fields.create_user_id = new DB().ObjectID(fields.create_user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('worker')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Add'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {}
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('worker')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Get'}, ...err})
        }
    }

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('worker')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Update'}, ...err})
        }
    }
}
