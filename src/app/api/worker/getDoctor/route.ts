// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import { mongo, minio } from "@/utility/connect"
import CUser from "../../../../class/user"
import CWorker from "../../../../class/worker"
import {Authentication} from "@/app/api/function";

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                q: searchParams.get('q'),

                //specialist_ids: searchParams.get('specialist_ids'),

                offset: searchParams.get('offset'),
                count: searchParams.get('count'),
            }

            //схема
            const schema = Joi.object({
                q: Joi.string().min(3).max(255).allow(null).empty('').default(null),

                //specialist_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty(Joi.array().length(0)).default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                count: Joi.number().integer().min(0).max(10000).allow(null).empty('').default(20),
            });

            value = await schema.validateAsync(url)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            let user = await CUser.GetById([userId])
            let arFields = {
                q: value.q,

                specialist_ids: user[0].specialist_ids,

                offset: value.offset,
                count: value.count
            }
            let items = await CWorker.Get (arFields)

            if (!user[0].specialist_ids) items = []

            return NextResponse.json({
                code: 0,
                response: {
                    //count: count,
                    items: items
                }
            })

        } catch (err) {
            console.log(err)
            throw ({...{code: 100000, msg: 'Ошибка в коде'}, ...err})

        }
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)

    }
}

export const dynamic = 'force-dynamic';