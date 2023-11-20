import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.object_id = new DB().ObjectID(fields.object_id)

            let collection = DB.Client.collection('price')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CPrice Add'}, ...err})
        }
    }

    /*
    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('org')
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('org')

            if (!fields.contract)
                return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.aggregate().toArray();

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHfOrg Get'}, ...err})
        }
    }*/
}