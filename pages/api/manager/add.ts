import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import CManager from "../../../classes/manager"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                login: Joi.string().min(5).max(32).required(),
                password: Joi.string().min(8).max(32).required(),

                first_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                last_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                second_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let result = await CManager.Add ( value )
            console.log(result)

            res.status(200).json({
                code: 0,
                response: true//result
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