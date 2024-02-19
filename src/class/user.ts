// @ts-nocheck
import { DB, Store } from "../../../social-framework/src"

export default class User {

    static async GetById ( ids ) {
        try {
            ids = new DB().ObjectID(ids)

            let arAggregate = []
            arAggregate.push({
                $match: {
                    _id: {$in: ids}
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'research',
                    localField: 'research_ids',
                    foreignField: '_id',
                    as: '_research_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'specialist',
                    localField: 'specialist_ids',
                    foreignField: '_id',
                    as: '_specialist_ids'
                }
            })
            arAggregate.push({
                $lookup: {
                    from: 'role',
                    localField: 'role_ids',
                    foreignField: '_id',
                    as: '_role_ids'
                }
            })
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('user')
            let result = await collection.aggregate(arAggregate).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser GetById'}, ...err})
        }
    }

    static async EditAuth ( id, fields ) {
        try {
            const mongoClient = Store.GetMongoClient()
            let collection = mongoClient.collection('user')

            if (fields.login)
                fields.login = fields.login.toLowerCase()

            let arFields = {
                login: fields.login,
                password: fields.password,
            }
            let result = collection.updateOne({_id: id}, {$set: arFields})

            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CUser EditAuth'}, ...err})
        }
    }
}