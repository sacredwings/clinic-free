import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.org_id = new DB().ObjectID(fields.org_id)
            fields.contract_type_ids = new DB().arObjectID(fields.contract_type_ids)

            let collection = DB.Client.collection('contract')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('contract')
            let arAggregate = [{
                $match: {_id: { $in: ids}},

            },{
                $lookup:
                    {
                        from: 'contract-type',
                        localField: 'contract_type_ids',
                        foreignField: '_id',
                        as: '_contract_type_ids'
                    }
            }]

            let result = await collection.aggregate(arAggregate).toArray()
            //let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.org_id = new DB().ObjectID(fields.org_id)

            let collection = DB.Client.collection('contract')

            let arFields = {
                org_id: fields.org_id
            }
            return await collection.find(arFields).limit(fields.count).skip(fields.offset).toArray()
        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CContract Get'}, ...err})
        }
    }
}