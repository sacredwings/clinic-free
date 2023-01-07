import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import CAuth from "../../../classes/auth"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                login: Joi.string().min(5).max(32).required(),
                password: Joi.string().min(8).max(32).required(),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let arFields = {
                login: value.login,
                password: value.password,
                //ip: ctx.request.ip,
                //browser: ctx.headers['user-agent']
            }
            let result = await CAuth.Login ( arFields )

            res.status(200).json({
                code: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RAuth Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}