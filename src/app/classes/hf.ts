import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('hf')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('hf')
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf GetById'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('hf')

            //return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            return await collection.find({}).toArray()

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Get'}, ...err})
        }
    }

    static async GetByCode ( codes ) {
        try {
            let collection = DB.Client.collection('hf');
            let result = await collection.find({code: { $in: codes}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf GetByCode'}, ...err})
        }
    }

    static async Update ( id, fields ) {
        try {
            let collection = DB.Client.collection('hf');
            id = new DB().ObjectID(id)

            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CHf Update'}, ...err})
        }
    }

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
    }
}