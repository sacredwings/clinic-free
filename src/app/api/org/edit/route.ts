// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {headers} from "next/headers";
import COrg from "@//class/org"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                name: Joi.string().min(3).max(255).required(),
                //full_name: Joi.string().min(1).max(255).allow(null).empty('').default(null),

                inn: Joi.number().integer().min(0).max(9223372036854775807).required(),
                kpp: Joi.number().integer().min(0).max(9223372036854775807).required(),
                ogrn: Joi.number().integer().min(0).max(9223372036854775807).required(),

                /*
                                payment_account: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

                                post_code: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                                country: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                region: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                district: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                locality: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                street: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                house: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                corps: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                structure: Joi.string().min(1).max(255).allow(null).empty('').default(null),
                                flat: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

                */

            })

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let arFields = {
                name: value.name,
                //full_name: value.full_name

                inn: value.inn,
                kpp: value.kpp,
                ogrn: value.ogrn,
            }
            let result = await COrg.Edit ( value.id, arFields )

            return NextResponse.json({
                err: 0,
                response: true
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'ROrg Add'}, ...err})
    }
}
