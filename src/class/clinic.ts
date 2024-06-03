// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Clinic {

    static async Add ( fields ) {
        try {
            fields.create_user_id = new DB().ObjectID(fields.create_user_id)
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
                    _id: {$in: ids}
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
            fields.org_id = new DB().ObjectID(fields.org_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    org_id: fields.org_id
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

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('clinic')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CClinic Update'}, ...err})
        }
    }
}
