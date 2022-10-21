import Joi from 'joi'
import CHf from "../../../classes/hf"
import DbConnect from "../../../util/DbConnect"

export default async (req, res) => {
    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),
            });

            value = await schema.validateAsync(req.body)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await DbConnect()

            let result = await CHf.Delete ( value.id )

            res.status(200).json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{err: 10000000, msg: 'RHf Delete'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}