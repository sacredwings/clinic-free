import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CContract from "@/class/contract"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                name: Joi.string().min(3).max(255).required(),
                org_id: Joi.string().min(24).max(24).required(),

                contract_type_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),

                price: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_ultrasound: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_mammography: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_xray: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),

                date_from: Joi.date().allow(null).empty('').default(null),
                date_to: Joi.date().allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let result = await CContract.Add ( value )

            return NextResponse.json({
                err: 0,
                response: true
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RContract Add'}, ...err})
    }
}