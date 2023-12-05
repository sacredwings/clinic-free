import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import { Store, DB, CUser }  from "../../../../../../social-framework"
import Joi  from "joi"
import COrg from "@/class/org"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                name: Joi.string().min(3).max(255).required(),
                full_name: Joi.string().min(3).max(255).allow(null).empty('').default(null),

                inn: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                kpp: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),
                ogrn: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(null),

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
            })

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let result = await COrg.Add ( value )

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