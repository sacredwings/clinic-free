import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import COrg from "../../../classes/org"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                count: Joi.number().integer().min(0).max(200).allow(null).empty('').default(20)
            });

            value = await schema.validateAsync(req.query)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let arFields = {
                offset: value.offset,
                count: value.count
            }
            let result = await COrg.Get (arFields)

            res.status(200).json({
                code: 0,
                response: {
                    items: result
                }
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'ROrg Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}