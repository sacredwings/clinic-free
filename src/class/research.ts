// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Research {

    static async Add ( fields ) {
        try {
            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('research')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Add'}, ...err})
        }
    }

    static async GetById ( ids, {price=false} ) {
        try {
            ids = new DB().ObjectID(ids)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    _id: {$in: ids}
                }
            })
            if (price === true)
                arAggregate.push({
                    $lookup: {
                        from: 'price',
                        localField: '_id',
                        foreignField: 'object_id',
                        as: '_price',
                        pipeline: [{
                            $sort: {  _id: -1 }
                        },{
                            $limit: 1
                        }]
                    }
                })
            if (price === true)
                arAggregate.push({
                    $unwind: {
                            path: '$_price',
                            preserveNullAndEmptyArrays: true
                        }
                })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('research')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch GetById'}, ...err})
        }
    }

    static async Get ( fields, {price=false} ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {}
            })
            if (price === true)
                arAggregate.push({
                    $lookup: {
                        from: 'price',
                        localField: '_id',
                        foreignField: 'object_id',
                        as: '_price',
                        pipeline: [{
                            $sort: {  _id: -1 }
                        },{
                            $limit: 1
                        }]
                    }
                })
            if (price === true)
                arAggregate.push({
                    $unwind: {
                        path: '$_price',
                        preserveNullAndEmptyArrays: true
                    }
                })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('research')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Get'}, ...err})
        }
    }

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('research')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Edit'}, ...err})
        }
    }

    static async EditHf ( fields ) {
        try {
            fields.id = new DB().ObjectID(fields.id)
            fields.hf_id = new DB().ObjectID(fields.hf_id)

            if (fields.module === 'ct')
                fields.module = 'contract-type'

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection(fields.module)

            //поиск
            let arFields = {
                _id: fields.hf_id,
                research_ids: fields.id
            }
            let result = await collection.findOne(arFields)

            if (result)
                //удаление
                await collection.updateMany(
                    { _id: fields.hf_id },
                    { $pull: { research_ids: fields.id} }
                )
            else {
                result = await collection.findOne({_id: fields.hf_id})

                let push = { $push: { research_ids: fields.id } }
                if (result.research_ids === null)
                    push = {
                        $set: { research_ids: [fields.id]}
                    }

                //добавление
                await collection.updateOne(
                    { _id: fields.hf_id },
                    push
                )
            }

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch EditHf'}, ...err})
        }
    }

    /*
    static async Delete ( id ) {
        try {
            let collection = DB.Client.collection('research');
            id = new DB().ObjectID(id)

            let result = collection.deleteOne({_id : id})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Delete'}, ...err})
        }
    }
    */

}