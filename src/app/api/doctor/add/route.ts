// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CDoctor from "@/class/doctor"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                user_id: Joi.string().min(24).max(24).required(),
                clinic_id: Joi.string().min(24).max(24).required(),

                specialist_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),
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

            let result = await CDoctor.Add ( value )

            return NextResponse.json({
                code: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'СDoctor Add'}, ...err})
    }
}
