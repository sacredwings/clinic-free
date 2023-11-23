import { DB, Store } from "../../../social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.object_id = new DB().ObjectID(fields.object_id)

            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('price')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CPrice Add'}, ...err})
        }
    }

}