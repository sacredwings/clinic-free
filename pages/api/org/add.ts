import Joi from "joi"
import DbConnect from "../../../util/DbConnect"
import COrg from "../../../classes/org"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                name: Joi.string().min(3).max(255).required(),
                full_name: Joi.string().min(3).max(255).allow(null).empty('').default(null),

                inn: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                kpp: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                ogrn: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

                payment_account: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

                post_code: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                country: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                region: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                district: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                locality: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                street: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                house: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                corps: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                structure: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                flat: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let result = await COrg.Add ( value )
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