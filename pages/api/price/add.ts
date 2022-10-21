import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import CPrice from "../../../classes/price"

/*
export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                price: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let arFields = {
                object_id: value.id,
                price: value.price
            }
            let result = await CPrice.Add ( arFields )

            res.status(200).json({
                code: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RPrice Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}

 */