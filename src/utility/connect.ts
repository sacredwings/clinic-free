import { Store }  from "../../../social-framework"
import config from "../../config.json"

const mongo = () => {
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