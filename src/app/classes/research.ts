import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            let collection = DB.Client.collection('research')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('research')
            let result = await collection.find({_id: { $in: ids}}).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch GetById'}, ...err})
        }
    }

    static async GetByIdPrice ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('research')
            let result = await collection.aggregate([
                { $match:
                        {
                            _id: { $in: ids}
                        }
                },
                { $lookup:
                        {
                            from: 'price',
                            localField: '_id',
                            foreignField: 'object_id',
                            as: '_price',
                            pipeline: [{
                                $sort: {  _id: -1 }
                            },{
                                $limit: 1
                            }]
                        }
                },{
                    $unwind:
                        {
                            path: '$_price',
                            preserveNullAndEmptyArrays: true
                        }
                }
            ]).toArray()
            return result
        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch GetByIdPrice'}, ...err})
        }
    }

    static async Get ( fields, params ) {
        try {
            let collection = DB.Client.collection('research')

            let result = await collection.aggregate([
                { $lookup:
                        {
                            from: 'price',
                            localField: '_id',
                            foreignField: 'object_id',
                            as: '_price',
                            pipeline: [{
                                $sort: {  _id: -1 }
                            },{
                                $limit: 1
                            }]
                        }
                },{
                    $unwind:
                        {
                            path: '$_price',
                            preserveNullAndEmptyArrays: true
                        }
                }
            ]).toArray()

            return result
            //return await collection.find({}).limit(params.count).skip(params.offset).toArray()

            //return await collection.find({}).toArray()

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Get'}, ...err})
        }
    }

    static async Update ( id, fields ) {
        try {
            let collection = DB.Client.collection('research');
            id = new DB().ObjectID(id)

            let result = collection.updateOne({_id: id}, {$set: fields})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Update'}, ...err})
        }
    }

    static async Delete ( id ) {
        try {
            let collection = DB.Client.collection('research');
            id = new DB().ObjectID(id)

            let result = collection.deleteOne({_id : id})
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch Delete'}, ...err})
        }
    }

    static async UpdateHf ( fields ) {
        try {
            fields.hf_id = new DB().ObjectID(fields.hf_id)
            fields.id = new DB().ObjectID(fields.id)

            if (fields.module === 'ct')
                fields.module = 'contract-type'
            let collection = DB.Client.collection(fields.module)

            //поиск
            let arFields = {
                _id: fields.hf_id,
                research_ids: fields.id
            }
            let result = await collection.findOne(arFields)

            if (result)
                //удаление
                await collection.update(
                    { _id: fields.hf_id },
                    { $pull: { research_ids: fields.id} }
                )
            else {
                result = await collection.findOne({_id: fields.hf_id})

                let push = { $push: { research_ids: fields.id } }
                if (result.research_ids === null)
                    push = {
                        $set: { research_ids: [fields.id]}
                    }

                //добавление
                await collection.updateOne(
                    { _id: fields.hf_id },
                    push
                )
            }

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CResearch UpdateHf'}, ...err})
        }
    }
}