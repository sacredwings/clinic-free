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
}

const minio = () => {
    let minioClient = Store.SetMinioClient(config.minio.connect)
    return minioClient
}

export {
    mongo,
    minio
}