// @ts-nocheck

/*
    Организации общедоступны
*/

import { DB, Store } from "../../../social-framework/src"

export default class Org {

    static async Add ( clinic_id, user_id, fields ) {
        try {
            fields.create_clinic_id = new DB().ObjectID(clinic_id) //клиника которая добавила
            fields.create_user_id = new DB().ObjectID(user_id)
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

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            if (fields.q) arAggregate[0].$match.$text = {}
            if (fields.q) arAggregate[0].$match.$text.$search = fields.q

            //сортировка, если поиска нет
            if (fields.q)
                arAggregate.push({
                    $sort: {
                        $score: {$meta:"textScore"}
                    }
                })
            else
                arAggregate.push({
                    $sort: {
                        [fields.order_by]: fields.order,
                    }
                })

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

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            if (fields.q) arAggregate[0].$match.$text = {}
            if (fields.q) arAggregate[0].$match.$text.$search = fields.q

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

    static async Edit ( clinic_id, user_id, id , fields ) {
        try {
            id = new DB().ObjectID(id)
            clinic_id = new DB().ObjectID(clinic_id)
            user_id = new DB().ObjectID(user_id)

            let arFields = {
                edit_user_id: user_id,
                edit_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: {...fields, ...arFields}})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'COrg Edit'}, ...err})
        }
    }

    static async Delete ( clinic_id, user_id, id ) {
        try {
            //ПРОВЕРКА / нет договоров в организации

            id = new DB().ObjectID(id)
            clinic_id = new DB().ObjectID(clinic_id)
            user_id = new DB().ObjectID(user_id)

            let arFields = {
                delete: true,
                delete_clinic_id: clinic_id,
                delete_user_id: user_id,
                delete_date: new Date(),
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('org')
            let result = collection.updateOne({clinic_id: clinic_id, _id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'COrg Delete'})
        }
    }
}
