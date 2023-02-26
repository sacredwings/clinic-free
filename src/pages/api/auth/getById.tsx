import Joi from "joi"
import DbConnect from "../../../app/util/DbConnect"
import CAuth from "../../../app/classes/auth"
import CManager from "../../../app/classes/manager"

export default async function handler(req, res) {
    let value
    try {
        try {
            await DbConnect()

            let auth = await CAuth.Auth( req.cookies )
            if (!auth) res.status(200).json({
                code: 0,
                response: false
            })

            console.log('1111111111111')
            console.log(auth)
            let user = await CManager.GetById( [auth] )
            console.log(user)
            res.status(200).json({
                code: 0,
                response: user[0]
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        res.status(200).json({...{code: 10000000, msg: 'RAuth getById'}, ...err})
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1mb',
        },
    },
}