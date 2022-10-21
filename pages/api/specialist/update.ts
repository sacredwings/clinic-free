import Joi from 'joi'
import CSpecialist from "../../../classes/specialist"
import DbConnect from "../../../util/DbConnect"
import CPrice from "../../../classes/price"

export default async (req, res) => {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),
                name: Joi.string().min(1).max(255).required(),
                price: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
            });

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await DbConnect()

            //меняется имя в любом случае
            let arFields = {
                name: value.name
            }
            let result = await CSpecialist.Update ( value.id, arFields )

            //меняется цена если есть
            if (value.price) {
                let specialistPrice = await CSpecialist.GetByIdPrice ( [value.id] )
                if ((!specialistPrice) || (!specialistPrice[0]) || (!specialistPrice[0]._price) || (specialistPrice[0]._price.price !== value.price)) {
                    let arFields = {
                        object_id: value.id,
                        price: value.price
                    }
                    result = await CPrice.Add ( arFields )
                }
            }

            res.status(200).json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{err: 10000000, msg: 'RSpecialist Update'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}