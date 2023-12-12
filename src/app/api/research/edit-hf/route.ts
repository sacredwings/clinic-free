import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import { CAuth, Store }  from "../../../../../../social-framework"
import {headers} from "next/headers";
import CResearch from "@/class/research"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                hf_id: Joi.string().max(24).max(24).required(),
                id: Joi.string().max(24).max(24).required(),
                module: Joi.string().valid('hf', 'ct').required(),
            });

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await mongo()

            let result = await CResearch.EditHf ( value )

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'CResearch UpdateHf'}, ...err})
    }
}