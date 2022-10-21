import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import CContract from "../../../classes/contract"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                org_id: Joi.string().min(24).max(24).required(),

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
                org_id: value.org_id,
                offset: value.offset,
                count: value.count
            }
            let result = await CContract.Get (arFields)

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
        res.status(200).json({...{code: 10000000, msg: 'RContract Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}