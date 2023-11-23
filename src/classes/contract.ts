import { DB, Store } from "../../../social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.org_id = new DB().ObjectID(fields.org_id)
            fields.contract_type_ids = new DB().ObjectID(fields.contract_type_ids)

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
                    _id: {$in: ids}
                }
            })
            arAggregate.push({
                $lookup:
                    {
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
            fields.org_id = new DB().ObjectID(fields.org_id)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    org_id: fields.org_id
                }
            })
            arAggregate.push({
                $lookup:
                    {
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
            throw ({...{err: 7001000, msg: 'CContract Get'}, ...err})
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
            throw ({...{err: 7001000, msg: 'CContract Update'}, ...err})
        }
    }
}