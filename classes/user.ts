import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('user')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('user')
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser GetById'}, ...err})
        }
    }

    static async GetByFields ( fields ) {
        try {
            let collection = DB.Client.collection('user')
            let result = await collection.findOne(fields)
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser GetByFields'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            let collection = DB.Client.collection('user')
            let arFields = {}
            return await collection.find(arFields).limit(fields.count).skip(fields.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser Get'}, ...err})
        }
    }
}