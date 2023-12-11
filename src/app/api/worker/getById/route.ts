import Joi from "joi"
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import CWorker from "@/class/worker"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let url = {
        ids: searchParams.get('ids[]')
    }
    if (url.ids) url.ids = url.ids.split(',')


    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).required()
            })
            value = await schema.validateAsync(url)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            console.log('111111111111111111')
            console.log(value.ids)
            let result = await CWorker.GetById ( value.ids )

            return NextResponse.json({
                code: 0,
                response: result
            })

        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)

    }
}