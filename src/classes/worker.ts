import {DB} from "social-framework"

export default class {

    static async Add ( fields ) {
        try {
            fields.contract_id = new DB().ObjectID(fields.contract_id)
            fields.contract_type_ids = new DB().arObjectID(fields.contract_type_ids)

            let collection = DB.Client.collection('worker')
            await collection.insertOne(fields)
            return fields

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Add'}, ...err})
        }
    }

    static async GetById ( ids ) {
        try {
            ids = new DB().arObjectID(ids)

            let collection = DB.Client.collection('worker')
            let result = await collection.aggregate([
                { $match:
                        {
                            _id: { $in: ids }
                        }
                },{ $lookup:
                        {
                            from: 'user',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: '_user_id'
                        }
                },{ $lookup:
                        {
                            from: 'contract',
                            localField: 'contract_id',
                            foreignField: '_id',
                            as: '_contract_id',
                            pipeline: [{
                                $lookup:
                                    {
                                        from: 'org',
                                        localField: 'org_id',
                                        foreignField: '_id',
                                        as: '_org_id'
                                    }
                            },{
                                $unwind:
                                    {
                                        path: '$_org_id',
                                        preserveNullAndEmptyArrays: true
                                    }
                            }]
                        }
                },{
                    $unwind:
                        {
                            path: '$_user_id',
                            preserveNullAndEmptyArrays: true
                        }
                },{
                    $unwind:
                        {
                            path: '$_contract_id',
                            preserveNullAndEmptyArrays: true
                        }
                }
            ]).toArray()
            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker GetById'}, ...err})
        }
    }

    static async Get ( fields ) {
        try {
            fields.contract_id = new DB().ObjectID(fields.contract_id)

            let collection = DB.Client.collection('worker')

            let result = await collection.aggregate([
                { $match:
                        {
                            contract_id: fields.contract_id
                        }
                },{ $lookup:
                        {
                            from: 'user',
                            localField: 'user_id',
                            foreignField: '_id',
                            as: '_user_id'
                        }
                },{
                    $unwind:
                        {
                            path: '$_user_id',
                            preserveNullAndEmptyArrays: true
                        }
                },{
                    $sort:
                        {
                            "_user_id.last_name": 1
                            //_id: -1
                        }
                }
            ]).limit(fields.count).skip(fields.offset).toArray();

            return result

        } catch (err) {
            console.log(err)
            throw ({...{err: 7001000, msg: 'CWorker Get'}, ...err})
        }
    }

    static async Edit(id, fields) {
        try {
            id = new DB().ObjectID(id)

            fields.contract_id = new DB().ObjectID(fields.contract_id)
            fields.contract_type_ids = new DB().arObjectID(fields.contract_type_ids)

            let collection = DB.Client.collection('worker')

            delete fields.user_id
            delete fields.contract_id

            /*
            delete fields.user_id
            delete fields.contract_id
            delete fields.contract_type_ids
            delete fields.hf_code
            delete fields.price
            delete fields.price_ultrasound
            delete fields.price_mammography
            delete fields.price_xray
            delete fields.research_ids
            delete fields.specialist_ids
            delete fields.profession
            delete fields.employment_date
            delete fields.work_place
            delete fields.work_experience
            delete fields.subdivision*/

            let arFields = {
                _id: id
            }

            let result = await collection.updateOne(arFields, {$set: fields})
            return result
        } catch (err) {
            console.log(err)
            throw ({code: 8001000, msg: 'CWorker Edit'})
        }
    }
}