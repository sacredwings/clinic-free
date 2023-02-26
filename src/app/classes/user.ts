import {DB} from "social-framework"
import {capitalizeFirstLetter} from "../util/function"

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
            fields.first_name = capitalizeFirstLetter(fields.first_name)
            fields.last_name = capitalizeFirstLetter(fields.last_name)
            fields.patronymic_name = capitalizeFirstLetter(fields.patronymic_name)

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

    static async Edit(id, fields) {
        try {
            id = new DB().ObjectID(id)

            let collection = DB.Client.collection('user')

            let arFields = {
                _id: id
            }

            let result = await collection.updateOne(arFields, {$set: fields})
            console.log(arFields)
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 8001000, msg: 'CUser Edit'})
        }
    }
}