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
            let collection = mongoClient.collection('prof-examination')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination Add'}, ...err})
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
                    from: 'contract',
                    localField: 'contract_id',
                    foreignField: '_id',
                    as: '_contract_id',
                    pipeline: [
                        { $lookup:
                                {
                                    from: 'org',
                                    localField: 'org_id',
                                    foreignField: '_id',
                                    as: '_org_id'
                                }
                        },
                        {
                            $unwind:
                                {
                                    path: '$_org_id',
                                    preserveNullAndEmptyArrays: true
                                }
                        }
                    ]
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'contract-type',
                    localField: 'contract_type_ids',
                    foreignField: '_id',
                    as: '_contract_type_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_contract_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof-examination')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.contract_id = new DB().ObjectID(fields.contract_id)

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
                    from: 'contract',
                    localField: 'contract_id',
                    foreignField: '_id',
                    as: '_contract_id'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'contract-type',
                    localField: 'contract_type_ids',
                    foreignField: '_id',
                    as: '_contract_type_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $unwind: {
                    path: '$_contract_id',
                    preserveNullAndEmptyArrays: true
                }
            })

            if (fields.clinic_id)
                arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.q)
                arAggregate[0].$match.q = fields.q
            if (fields.contract_id)
                arAggregate[0].$match.contract_id = fields.contract_id

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof-examination')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination Get'}, ...err})
        }
    }

    static async GetCount ( fields ) {
        try {
            if (fields.q) {
                fields.q = fields.q.replace(/ +/g, ' ').trim();
                fields.q = fields.q.replace("[^\\da-zA-Zа-яёА-ЯЁ ]", ' ').trim();
            }

            fields.clinic_id = new DB().ObjectID(fields.clinic_id)
            fields.contract_id = new DB().ObjectID(fields.contract_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    delete: {$ne: true}
                }
            })

            arAggregate.push({
                $count: 'count'
            })

            if (fields.clinic_id)
                arAggregate[0].$match.clinic_id = fields.clinic_id
            if (fields.q)
                arAggregate[0].$match.q = fields.q
            if (fields.contract_id)
                arAggregate[0].$match.contract_id = fields.contract_id

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof-examination')
            let result = await collection.aggregate(arAggregate).toArray()

            if (!result.length) return 0
            return result[0].count

        } catch (err) {
            console.log(err)
            throw ({code: 6004000, msg: 'CProfExamination GetCount'})
        }
    }

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('prof-examination')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CProfExamination Update'}, ...err})
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
            let collection = mongoClient.collection('prof-examination')
            let result = collection.updateOne({_id: id}, {$set: arFields}, {upsert: true})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CProfExamination Delete'})
        }
    }
}
