import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import { CAuth, Store }  from "../../../../../../social-framework"
import {headers} from "next/headers";
import CHf from "@/class/hf"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),
                name: Joi.string().min(1).max(255).required(),
            });

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {

            await mongo()

            let arFields = {
                name: value.name
            }
            let result = await CHf.Edit ( value.id, arFields )

            return NextResponse.json({
                err: 0,
                response: result
            })

        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RHf Edit'}, ...err})
    }
}