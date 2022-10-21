import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import CWorker from "../../../classes/worker"

export default async function handler(req, res) {
    let value
    try {
        try {
            req.query.ids = req.query.ids.split(',')

            //схема
            const schema = Joi.object({
                ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).required()
            })

            value = await schema.validateAsync(req.query)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let result = await CWorker.GetById ( value.ids )

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