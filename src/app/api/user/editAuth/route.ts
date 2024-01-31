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
                id: Joi.string().min(1).max(255).required(),

                login: Joi.string().min(1).max(50).required(),
                password: Joi.string().min(1).max(50).required(),
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
                login: value.login,
                password: value.password,
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