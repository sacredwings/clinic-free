// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi";
import CExaminationConclusion from "@/class/examination-conclusion"

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                ids: searchParams.get('ids[]')
            }
            if (url.ids) url.ids = url.ids.split(',')

            //схема
            const schema = Joi.object({
                ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).required()
            })

            value = await schema.validateAsync(url)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let result = await CExaminationConclusion.GetById ( value.ids )

            return NextResponse.json({
                code: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RExaminationConclusion GetById'}, ...err})
    }
}

export const dynamic = 'force-dynamic';