/*
    Врачи
*/

// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class CDoctor {

    static async Add ( user_id, fields ) {
        try {
            fields.user_id = new DB().ObjectID(user_id)
            fields.specialty_ids = new DB().ObjectID(fields.specialty_ids)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('doctor')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CDoctor Add'}, ...err})
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
                    from: 'specialty',
                    localField: 'specialty_ids',
                    foreignField: '_id',
                    as: '_specialty_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('doctor')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CDoctor GetById'}, ...err})
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
                    from: 'specialty',
                    localField: 'specialty_ids',
                    foreignField: '_id',
                    as: '_specialty_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('doctor')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CDoctor Get'}, ...err})
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
            let collection = mongoClient.collection('doctor')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CDoctor GetCount'})
        }
    }

    static async Edit ( user_id, id , fields ) {
        try {
            //ПРОВЕРКА / что доктор и есть пользователь который редактирует
            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('doctor')
            let result = collection.updateOne({user_id: user_id, _id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CDoctor Edit'}, ...err})
        }
    }

    static async Delete ( user_id, id ) {
        try {
            user_id = new DB().ObjectID(user_id)
            id = new DB().ObjectID(id)

            let arFields = {
                delete: true,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('doctor')
            let result = collection.updateOne({user_id: user_id, _id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CDoctor Delete'})
        }
    }
}
