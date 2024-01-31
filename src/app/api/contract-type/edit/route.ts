// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {headers} from "next/headers";
import CContractType from "@/class/contract-type"

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
            let result = await CContractType.Edit ( value.id, arFields )

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RContractType Edit'}, ...err})
    }
}