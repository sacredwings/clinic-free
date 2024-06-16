/*
    Приемы
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Appointment {

    static async Add ( fields ) {
        try {
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
            let collection = mongoClient.collection('appointment')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CAppointment GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {}
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

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('appointment')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CAppointment Edit'}, ...err})
        }
    }
}
