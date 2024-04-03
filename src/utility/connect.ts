// @ts-nocheck
import { Store }  from "../../../social-framework/src"
import config from "../../config.json"
//import { MongoClient, ObjectId } from "mongodb"

const mongo = async () => {
    let mongoClient = Store.SetMongoClient(config.mongo.connect)
    return mongoClient
}

const minio = () => {
    let minioClient = Store.SetMinioClient(config.minio.connect)
    return minioClient
}

export {
    mongo,
    minio
}
