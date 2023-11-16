import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import { CAuth, Store }  from "../../../../../../social-framework"
import {headers} from "next/headers";
import config from "../../../../../config.json";
import {serverCheckResult} from "recaptcha-v3-react-function-async";

export async function POST (request: Request) {
    try {
        //заголовки
        const headersList = headers()
        const userAgent = headersList.get('user-agent')

        let rsRequest = await request.json()

        try {
            //схема
            const schema = Joi.object({
                login: Joi.string().min(5).max(32).required(),
                password: Joi.string().min(8).max(32).required(),
            })
            rsRequest = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({...{code: 412, msg: 'Неверные параметры'}, ...err})
        }

        try {
            await mongo()

            let arFields = {
                login: rsRequest.login,
                password: rsRequest.password,
                ip: null,
                browser: userAgent
            }
            let result = await CAuth.LoginByField ( arFields )

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка авторизации'}, ...err})
        }

    } catch (err) {
        return NextResponse.json(err)
    }
}