// @ts-nocheck
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
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

                specialist_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                research_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                //status: Joi.number().integer().min(0).max(1).empty(null).default(null),
                status: Joi.boolean().allow(null).empty('').default(null),

                note: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                result: Joi.string().min(1).max(255).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(rsRequest)

            if (value.specialist_id && value.research_id) throw ({})
            if (!value.specialist_id && !value.research_id) throw ({})

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

                specialist_id: value.specialist_id,
                research_id: value.research_id,

                status: value.status,

                note: value.note,
                result: value.result,

                user_id: userId,
            }

            let result = await CVisit.Edit ( arFields )

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