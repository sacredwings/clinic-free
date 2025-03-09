// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import CUser  from "@/class/user"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";

export async function POST(request: Request) {

    const res = await request.json()

    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                first_name: Joi.string().min(1).max(255).required(),
                last_name: Joi.string().min(1).max(255).required(),
                second_name: Joi.string().min(1).max(255).empty(null, '').default(null),

                man: Joi.number().integer().min(0).max(1).required(),
                date_birth: Joi.date().min('1-1-1900').max('1-1-2030').required(),

                snils: Joi.number().min(9999999999).max(99999999999).empty(null, '').default(null),

                phone: Joi.number().min(999999999).max(9999999999).empty(null, '').default(null),
            })
            value = await schema.validateAsync(res)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        try {
            await mongo()

            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            //проверка прав на редактирование

            let arFields = {
                first_name: value.first_name,
                last_name: value.last_name,
                second_name: value.second_name,

                man: value.man,
                date_birth: value.date_birth,

                snils: value.snils,

                phone: value.phone,
            }

            let res = await CUser.Edit(value.id, arFields)

            return NextResponse.json({ res })
        } catch (err) {
            console.log(err)
            throw ({...{code: 100000, msg: 'Ошибка в коде'}, ...err})
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}
