// @ts-nocheck

/*
    Договора привязанны к конкретной клинике
*/

import { DB, Store } from "../../../social-framework/src"

export default class Contract {

    static async Add ( fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.org_id = new DB().ObjectID(fields.org_id)

            //ПОЛЕ ПОД ВОПРОСОМ
            fields.contract_type_ids = new DB().ObjectID(fields.contract_type_ids)

            fields.create_user_id = new DB().ObjectID(fields.create_user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('contract')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Add'}, ...err})
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
            //ПОЛЕ ПОД ВОПРОСОМ
            arAggregate.push({
                $lookup: {
                    from: 'contract-type',
                    localField: 'contract_type_ids',
                    foreignField: '_id',
                    as: '_contract_type_ids'
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('contract')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.org_id = new DB().ObjectID(fields.org_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })
            //ПОЛЕ ПОД ВОПРОСОМ
            arAggregate.push({
                $lookup: {
                    from: 'contract-type',
                    localField: 'contract_type_ids',
                    foreignField: '_id',
                    as: '_contract_type_ids'
                }
            })

            if (fields.clinic_id) arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.org_id) arAggregate[0].$match.org_id = fields.org_id

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('contract')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Get'}, ...err})
        }
    }

    static async GetCount ( fields ) {
        try {
            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.org_id = new DB().ObjectID(fields.org_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            arAggregate.push({
                $count: 'count'
            })

            if (fields.clinic_id) arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.org_id) arAggregate[0].$match.org_id = fields.org_id

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

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('contract')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Edit'}, ...err})
        }
    }

    static async Delete ( id, user_id ) {
        try {
            //ПРОВЕРКА / нет осмотров в договоре

            /*
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
            let collection = mongoClient.collection('contract')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
            */

        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CContract Delete'})
        }
    }
}
