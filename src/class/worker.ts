// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Worker {

    static async Add ( fields ) {
        try {
            fields.user_id = new DB().ObjectID(fields.user_id)

            fields.contract_id = new DB().ObjectID(fields.contract_id)
            fields.contract_type_ids = new DB().ObjectID(fields.contract_type_ids)

            fields.specialist_ids = new DB().ObjectID(fields.specialist_ids)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

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
                    pipeline: [{
                        $lookup:
                            {
                                from: 'org',
                                localField: 'org_id',
                                foreignField: '_id',
                                as: '_org_id'
                            }
                    },{
                        $unwind:
                            {
                                path: '$_org_id',
                                preserveNullAndEmptyArrays: true
                            }
                    }]
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist_visit',
                    localField: '_id',
                    foreignField: 'worker_id',
                    as: '_specialist_visit_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research_visit',
                    localField: '_id',
                    foreignField: 'worker_id',
                    as: '_research_visit_ids'
                }
            })
            /*
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })*/
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
            let collection = mongoClient.collection('worker')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.contract_id = new DB().ObjectID(fields.contract_id)

            let arAggregate = []
            arAggregate.push({
                $match: {}
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
                    pipeline: [{
                        $lookup:
                            {
                                from: 'org',
                                localField: 'org_id',
                                foreignField: '_id',
                                as: '_org_id'
                            }
                    },{
                        $unwind:
                            {
                                path: '$_org_id',
                                preserveNullAndEmptyArrays: true
                            }
                    }]
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist_visit',
                    localField: '_id',
                    foreignField: 'worker_id',
                    as: '_specialist_visit_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research_visit',
                    localField: '_id',
                    foreignField: 'worker_id',
                    as: '_research_visit_ids'
                }
            })
            /*
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })*/
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
            if (!fields.specialist_ids)
                arAggregate.push({
                    $sort: {
                        "_user_id.last_name": 1
                        //_id: -1
                    }
                })

            if (fields.contract_id) arAggregate[0].$match.contract_id = fields.contract_id
            if (fields.specialist_ids) arAggregate[0].$match.specialist_ids = { $in: fields.specialist_ids }

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

            fields.contract_id = new DB().ObjectID(fields.contract_id)
            fields.contract_type_ids = new DB().ObjectID(fields.contract_type_ids)

            fields.specialist_ids = new DB().ObjectID(fields.specialist_ids)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

            //нельзя менять
            delete fields.user_id
            delete fields.contract_id

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('worker')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({code: 8001000, msg: 'CWorker Edit'})
        }
    }
}