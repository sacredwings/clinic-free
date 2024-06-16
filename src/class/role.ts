/*
    Роли
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Role {

    static async Add ( fields ) {
        try {
            fields.create_user_id = new DB().ObjectID(fields.create_user_id)
            fields.create_date = new Date()
            if (!fields.access)
                fields.access = []

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole Add'}, ...err})
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

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {}
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

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('role')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CRole Edit'}, ...err})
        }
    }
}
