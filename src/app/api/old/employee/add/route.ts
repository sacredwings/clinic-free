// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CEmployee from "@/class/employee"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).required(),

                title: Joi.string().min(3).max(224).required(),
                description: Joi.string().max(320).empty([null, '']).default(null),

                user_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).required(),

                role_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).empty([null, Joi.array().length(0)]).default(null),
                specialty_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).empty([null, Joi.array().length(0)]).default(null),

                date_start: Joi.date().empty([null, '']).default(null),
                date_end: Joi.date().empty([null, '']).default(null),
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

            //ПРОВЕРКА / право доступа на создание

            let result = await CEmployee.Add ( value.clinic_id, userId, value )

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'REmployee Add'}, ...err})
    }
}