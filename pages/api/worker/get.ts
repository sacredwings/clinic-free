import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import CWorker from "../../../classes/worker"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                contract_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                count: Joi.number().integer().min(0).max(200).allow(null).empty('').default(20)
            });

            value = await schema.validateAsync(req.query)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let arFields = {
                contract_id: value.contract_id,
                offset: value.offset,
                count: value.count
            }
            let result = await CWorker.Get (arFields)

            res.status(200).json({
                err: 0,
                response: {
                    items: result
                }
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{err: 10000000, msg: 'RWorker Get'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}