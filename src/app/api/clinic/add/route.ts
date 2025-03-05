// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CClinic from "@/class/clinic"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                title: Joi.string().min(3).max(255).required(),
                description: Joi.string().max(320).empty([null, '']).default(null),

                inn: Joi.number().integer().min(0).max(9223372036854775807).required(),
                kpp: Joi.number().integer().min(0).max(9223372036854775807).empty([null, '']).default(null),
                ogrn: Joi.number().integer().min(0).max(9223372036854775807).empty([null, '']).default(null),
            })

            value = await schema.validateAsync(rsRequest)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()
            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            let result = await CClinic.Add (userId, value)

            return NextResponse.json({
                code: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RClinic Add'}, ...err})
    }
}
