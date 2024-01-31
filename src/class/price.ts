// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class Price {

    static async Add ( fields ) {
        try {
            fields.object_id = new DB().ObjectID(fields.object_id)

            fields.create_date = new Date()

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