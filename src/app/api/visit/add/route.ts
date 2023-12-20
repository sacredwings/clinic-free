import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import { Store, DB, CUser }  from "../../../../../../social-framework"
import Joi  from "joi"
import CVisit from "@/class/visit"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                worker_id: Joi.string().min(24).max(24).required(),

                specialist_id: Joi.string().min(24).max(24).required(),
                research_id: Joi.string().min(24).max(24).required(),

                status: Joi.number().integer().min(0).max(1).empty(['', null]).default(null),

                note: Joi.string().min(1).max(255).empty(['', null]).default(null),
                result: Joi.string().min(1).max(255).empty(['', null]).default(null),
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

            let arFields = {
                worker_id: value.worker_id,

                specialist_id: value.worker_id,
                research_id: value.worker_id,

                status: value.worker_id,

                note: value.worker_id,
                result: value.worker_id,

                user_id: userId
            }
            let result = await CVisit.Edit ( value )

            return NextResponse.json({
                err: 0,
                response: true
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RVisit Add'}, ...err})
    }
}