import { DB, Store } from "../../../social-framework"

export default class {

    static async Edit ( {module, ...fields} ) {
        try {
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(`${module}_visit`)

            //ищем уже такой же
            let resultDouble = await this.GetDouble({
                module: module,
                worker_id: fields.worker_id,
                specialist_id: fields.specialist_id,
                research_ids: fields.research_ids,
            })
            //существует
            if (resultDouble) {
                //обновляем

                let arFields = {
                    status: fields.status
                }
                let result = collection.updateOne({_id: resultDouble._id}, {$set: arFields})

                return true
            }

            fields.worker_id = new DB().ObjectID(fields.worker_id)

            fields.specialist_id = new DB().ObjectID(fields.specialist_id)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

            fields.user_id = new DB().ObjectID(fields.user_id)
            fields.create_date = new Date()

            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CVisit Edit'}, ...err})
        }
    }

    static async GetDouble ( {module, ...fields} ) {
        try {
            let arFields = {
                worker_id: new DB().ObjectID(fields.worker_id)
            }

            if (fields.specialist_id)
                arFields.specialist_id = new DB().ObjectID(fields.specialist_id)
            if (fields.research_ids)
                arFields.research_ids = new DB().ObjectID(fields.research_ids)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(`${module}_visit`)
            await collection.findOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CVisit GetDouble'}, ...err})
        }
    }
    /*
    static async Add ( {module, ...fields} ) {
        try {
            //ищем уже такой же
            let resultDouble = await this.GetDouble({
                module: module,
                worker_id: fields.worker_id,
                specialist_id: fields.specialist_id,
                research_ids: fields.research_ids,
            })
            //найден, тогда больше не создаем
            if (resultDouble) return resultDouble

            fields.worker_id = new DB().ObjectID(fields.worker_id)

            fields.specialist_id = new DB().ObjectID(fields.specialist_id)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

            fields.user_id = new DB().ObjectID(fields.user_id)
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(`${module}_visit`)
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CVisit Add'}, ...err})
        }
    }
*/

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