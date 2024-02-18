// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {headers} from "next/headers";
import CRole from "@/class/role"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),
                name: Joi.string().min(1).max(255).required(),
                access: Joi.array().min(1).max(50).items(Joi.string().min(1).max(30)).allow(null).empty(Joi.array().length(0)).default(null),
            });

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await mongo()

            //меняется имя в любом случае
            let arFields = {
                name: value.name,
                access: value.access,
            }
            let result = await CRole.Edit ( value.id, arFields )

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RRole Edit'}, ...err})
    }
}