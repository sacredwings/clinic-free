import Joi from "joi"
import CContractType from "../../../classes/contract-type"
import DbConnect from "../../../util/DbConnect";

export  default async (req, res) => {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                name: Joi.string().min(3).max(255).required(),
                specialist_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),
                research_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let result = await CContractType.Add ( value )

            res.status(200).json({
                code: 0,
                response: true//result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RContractType Add'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}