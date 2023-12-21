import { NextResponse } from 'next/server'
import Joi from "joi"
import Config from "../../../../../config.json"
import { Store, DB, CUser }  from "../../../../../../social-framework"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";

export async function POST(request: Request) {

    const rsRequest = await request.json()

    let value
    try {
        try {
            //схема
            const schema = Joi.object({
                id: Joi.string().min(1).max(255).required(),

                specialist_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).empty(null).default(null),
                research_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).empty(null).default(null),
            })
            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }

        try {
            await mongo()

            let userId = await Authentication(request)
            //if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            let arFields = {
                specialist_ids: new DB().ObjectID(value.specialist_ids),
                research_ids: new DB().ObjectID(value.research_ids),
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