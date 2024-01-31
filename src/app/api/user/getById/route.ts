// @ts-nocheck
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import { Store, DB, CUser }  from "../../../../../../social-framework/src"
import Joi  from "joi"
import {Authentication} from "@/app/api/function";

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
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        try {
            await mongo()

            let result = await CUser.GetById ( value.ids )

            return NextResponse.json({
                code: 0,
                response: result
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