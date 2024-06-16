// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CClinic from "@/class/clinic"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                name: Joi.string().min(3).max(255).required(),
                description: Joi.string().min(1).max(10000).allow(null).empty('').default(null),

                inn: Joi.number().integer().min(999999999).max(999999999999).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(rsRequest)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let result = await CClinic.Add ( value )

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
