import Joi from "joi"
import DbConnect from "../../../app/util/DbConnect"
import CContract from "../../../app/classes/contract"

export default async function handler(req, res) {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                name: Joi.string().min(3).max(255).required(),
                //org_id: Joi.string().min(24).max(24).required(),

                //contract_type_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),

                price: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_ultrasound: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_mammography: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_xray: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),

                //date_from: Joi.date().allow(null).empty('').default(null),
                //date_to: Joi.date().allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await DbConnect()

            let arFields = {
                name: value.name,
                //org_id: value.org_id,

                //contract_type_ids: value.contract_type_ids,

                price: value.price,
                price_ultrasound: value.price_ultrasound,
                price_mammography: value.price_mammography,
                price_xray: value.price_xray,

                //date_from: value.date_from,
                //date_to: value.date_to,
            }
            let result = await CContract.Update ( value.id, arFields )

            res.status(200).json({
                code: 0,
                response: result
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