import { Store }  from "../../../social-framework/src"
import config from "../../config.json"
import { MongoClient, ObjectId } from "mongodb"

const mongo = async () => {

    return await Store.SetMongoClient({
        MongoClient,
        ObjectId
    },{
        url: config.mongo.connect.url,
        dbName: config.mongo.connect.dbName
    })

    //Store.SetMongoObjectId(ObjectId)
    //return Store.SetMongoClient(client.db(config.mongo.connect.dbName))

    //let mongoClient = Store.SetMongoClient(config.mongo.connect)
    //return mongoClient
}

const minio = () => {
    let minioClient = Store.SetMinioClient(config.minio.connect)
    return minioClient
}

export {
    mongo,
    minio
}