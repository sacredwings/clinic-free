// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CClinic from "@/class/clinic"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                title: Joi.string().min(3).max(255).required(),
                description: Joi.string().max(320).empty([null, '']).default(null),

                inn: Joi.number().integer().min(0).max(9223372036854775807).required(),
                kpp: Joi.number().integer().min(0).max(9223372036854775807).required(),
                ogrn: Joi.number().integer().min(0).max(9223372036854775807).required(),
            });

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await mongo()
            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            //меняется имя в любом случае
            let arFields = {
                title: value.title,
                description: value.description,

                inn: value.inn,
                kpp: value.kpp,
                ogrn: value.ogrn
            }
            let result = await CClinic.Edit (userId, value.id, arFields)

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RClinic Edit'}, ...err})
    }
}