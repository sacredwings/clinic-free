import { NextResponse } from 'next/server'
import Joi from "joi"
import Config from "../../../../../config.json"
import { Store, DB, CUser }  from "../../../../../../social-framework"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";

export async function POST(request: Request) {

    const res = await request.json()

    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(1).max(255).required(),

                photo_id: Joi.string().min(1).max(255).empty(null).default(null),

                first_name: Joi.string().min(1).max(50).required(),
                last_name: Joi.string().min(1).max(50).required(),
                second_name: Joi.string().min(1).max(50).required(),

                man: Joi.number().min(0).max(1).empty(null).default(null),

                phone: Joi.number().min(1000000000).max(9999999999).empty(['', null]).default(null),
                email: Joi.string().email().min(6).max(100).empty(['', null]).default(null)
                //gtoken: Joi.string().required()
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
                photo_id: value.photo_id,

                first_name: value.first_name,
                last_name: value.last_name,
                second_name: value.second_name,

                man: value.man,

                phone: value.phone,
                email: value.email,
            }

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