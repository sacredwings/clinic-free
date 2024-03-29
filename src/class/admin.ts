// @ts-nocheck
import { DB } from "../../../social-framework/src"

export default class Admin {

    //Индексация базы
    static async DdIndex() {
        try {
            try {
                console.log('user')
                let collection = DB.Client.collection('user')
                let arIndexes = await collection.indexes()
                arIndexes.forEach((item)=>{
                    if (item.name !== '_id_')
                        collection.dropIndex(item.name)
                })
                let indexUser = await collection.createIndex({
                    first_name: "text",
                    last_name: "text",
                    second_name: "text",
                })
                console.log(arIndexes)

            } catch (e) {
                console.log(e)
            }


        } catch (err) {
            console.log(err)
            throw ({code: 7001000, msg: 'CAdmin DdIndex'})
        }
    }
}