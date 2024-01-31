// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import Config from "../../../../../config.json"
import { Store, DB, CUser }  from "../../../../../../social-framework/src"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";

export async function POST(request: Request) {

    const res = await request.json()

    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                photo_id: Joi.string().min(1).max(255).empty(null).default(null),
                info: Joi.string().min(1).max(10000).empty('').default(''),
                login: Joi.string().min(5).max(50).required(),
                password: Joi.string().min(8).max(100).empty('').default(null),

                first_name: Joi.string().min(1).max(50).empty('').default(''),
                last_name: Joi.string().min(1).max(50).empty('').default(''),
                second_name: Joi.string().min(1).max(50).empty('').default(''),

                phone: Joi.number().min(1000000000).max(9999999999).empty('').default(''),
                email: Joi.string().email().min(6).max(100).empty('').default(''),
                yoomoney: Joi.string().min(10).max(50).empty('').default(''),
                yoomoney_secret: Joi.string().min(10).max(50).empty('').default(''),

                gtoken: Joi.string().required()
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

            let arFields = {
                photo_id: value.photo_id,
                info: value.info,
                login: value.login,

                first_name: value.first_name,
                last_name: value.last_name,
                second_name: value.second_name,

                phone: value.phone,
                email: value.email,
                yoomoney: value.yoomoney,
                yoomoney_secret: value.yoomoney_secret,
            }
            if (value.password) arFields.password = value.password

            let res = await CUser.Edit(userId, arFields)

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