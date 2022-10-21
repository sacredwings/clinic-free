import Joi from 'joi'
import CResearch from "../../../classes/research"
import DbConnect from "../../../util/DbConnect";

export  default async (req, res) => {
    let value
    try {
        try {
            await DbConnect()

            let arFields = {
                count: 1000,
                offset: 0
            }
            let result = await CResearch.Get (arFields, {})

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
        res.status(200).json({...{err: 10000000, msg: 'RResearch Get'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}