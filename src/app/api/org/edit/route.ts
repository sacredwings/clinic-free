// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {headers} from "next/headers";
import COrg from "@//class/org"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                title: Joi.string().min(3).max(255).required(),

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

            let arFields = {
                title: value.title,

                inn: value.inn,
                kpp: value.kpp,
                ogrn: value.ogrn,
            }
            let result = await COrg.Edit (userId, arFields)

            return NextResponse.json({
                err: 0,
                response: true
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'ROrg Add'}, ...err})
    }
}
