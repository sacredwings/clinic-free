// @ts-nocheck

/*
    Организации общедоступны
*/

import { DB, Store } from "../../../social-framework/src"

export default class Org {

    static async Add ( fields ) {
        try {
            fields.create_clinic_id = new DB().ObjectID(fields.create_clinic_id)
            fields.create_user_id = new DB().ObjectID(fields.create_user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Add'}, ...err})
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
            let collection = mongoClient.collection('org')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            fields.clinic_id = new DB().ObjectID(fields.clinic_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            if (fields.clinic_id)
                arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.q)
                arAggregate[0].$match.q = fields.q

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Get'}, ...err})
        }
    }

    static async GetCount ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            fields.clinic_id = new DB().ObjectID(fields.clinic_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            if (fields.clinic_id)
                arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.q)
                arAggregate[0].$match.q = fields.q

            arAggregate.push({
                $count: 'count'
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'COrg GetCount'})
        }
    }

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Edit'}, ...err})
        }
    }

    static async Delete ( id, fields ) {
        try {
            //ПРОВЕРКА / права позволяют
            //ПРОВЕРКА / нет договоров в организации

            id = new DB().ObjectID(id)
            fields.delete_clinic_id = new DB().ObjectID(fields.delete_clinic_id)
            fields.delete_user_id = new DB().ObjectID(fields.delete_user_id)

            let arFields = {
                delete: true,
                delete_clinic_id: fields.delete_clinic_id,
                delete_user_id: fields.delete_user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'COrg Delete'})
        }
    }
}
