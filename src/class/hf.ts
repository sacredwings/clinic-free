import { DB, Store } from "../../../social-framework/src"

export default class {

    static async Add ( fields ) {
        try {
            fields.specialist_ids = new DB().ObjectID(fields.specialist_ids)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

            fields.create_date = new Date()

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('hf')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Add'}, ...err})
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
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('hf')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let arAggregate = []
            arAggregate.push({
                $match: {}
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
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('hf')
            let result = await collection.aggregate(arAggregate).skip(fields.offset).limit(fields.count).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Get'}, ...err})
        }
    }

    static async GetByCode ( codes ) {
        try {
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('hf')

            let result = await collection.find({code: { $in: codes}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf GetByCode'}, ...err})
        }
    }

    static async Edit ( id, fields ) {
        try {
            id = new DB().ObjectID(id)
            fields.specialist_ids = new DB().ObjectID(fields.specialist_ids)
            fields.research_ids = new DB().ObjectID(fields.research_ids)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('hf')
            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Update'}, ...err})
        }
    }

    /*
    static async Delete ( id ) {
        try {
            let collection = DB.Client.collection('hf');
            id = new DB().ObjectID(id)

            let result = collection.deleteOne({_id : id})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Delete'}, ...err})
        }
    }*/
}