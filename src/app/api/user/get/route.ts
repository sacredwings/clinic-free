import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import { Store, DB, CUser }  from "../../../../../../social-framework"
import Joi from "joi";

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                q: searchParams.get('q'),
                offset: searchParams.get('offset'),
                count: searchParams.get('count'),
            }

            //схема
            const schema = Joi.object({
                q: Joi.string().min(3).max(255).empty(['', null]).default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).empty(null).default(0),
                count: Joi.number().integer().min(0).max(2000).empty(null).default(20)
            })
            value = await schema.validateAsync(url)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        try {
            await mongo()


            let arFields = {
                q: value.q,

                offset: value.offset,
                count: value.count
            }
            let items = await CUser.Get ( arFields )
            let count = await CUser.GetCount ( arFields )

            return NextResponse.json({
                code: 0,
                response: {
                    count: count,
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
