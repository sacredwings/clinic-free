import { DB, Store } from "../../../social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.worker_id = new DB().ObjectID(fields.worker_id)

            fields.specialist_ids = new DB().ObjectID(fields.specialist_ids)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(`checkup_${fields.module}`)
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Add'}, ...err})
        }
    }
/*
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
                $match: {
                    contract_id: fields.contract_id
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
                $unwind: {
                    path: '$_user_id',
                    preserveNullAndEmptyArrays: true
                }
            })
            arAggregate.push({
                $sort: {
                    "_user_id.last_name": 1
                    //_id: -1
                }
            })

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

            //нельзя менять
            delete fields.user_id
            delete fields.contract_id
            delete fields.contract_type_ids
            delete fields.specialist_ids
            delete fields.research_ids

            let arFields = {
                _id: id
            }

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('worker')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({code: 8001000, msg: 'CWorker Edit'})
        }
    }*/
}