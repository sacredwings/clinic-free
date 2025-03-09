// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class CUser {

    static async Add(fields) {
        try {
            if (fields.clinic_id) fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            if (fields.create_user_id) fields.create_user_id = new DB().ObjectID(fields.create_user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('user')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Add'}, ...err})
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
            let collection = mongoClient.collection('user')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser GetById'}, ...err})
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
            let collection = mongoClient.collection('user')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Get'}, ...err})
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
            let collection = mongoClient.collection('user')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CUser GetCount'})
        }
    }

    //Поиск по полю
    static async GetByField(fields) {
        try {
            //в нижний регистр
            if (fields._id) fields._id = new DB().ObjectID(fields._id)
            if (fields.email) fields.email = fields.email.toLowerCase()
            if (fields.login) fields.login = fields.login.toLowerCase()

            let arAggregate = []
            arAggregate.push({
                $match: fields
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(`user`)
            let result = await collection.aggregate(arAggregate).toArray()
            if (!result.length) return null
            return result[0]

        } catch (err) {
            console.log(err)
            throw ({...{code: 7001000, msg: 'CUser GetByField'}, ...err})
        }
    }

    static async Edit ( id, fields ) {
        try {
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('user')

            id = new DB().ObjectID(id)

            if (fields.login)
                fields.login = fields.login.toLowerCase()

            if (fields.select_clinic_id)
                fields.select_clinic_id = new DB().ObjectID(fields.select_clinic_id)

            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Edit'}, ...err})
        }
    }

    static async Delete ( id, user_id ) {
        try {
            id = new DB().ObjectID(id)
            user_id = new DB().ObjectID(user_id)

            let arFields = {
                delete: true,
                delete_user: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('user')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CUser Delete'})
        }
    }
}
