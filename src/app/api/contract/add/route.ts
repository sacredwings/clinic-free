// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CContract from "@/class/contract"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).required(),
                org_id: Joi.string().min(24).max(24).required(),

                //ПРОВЕРИТЬ ПОЛЕ
                contract_type_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).allow(null).empty('').default(null),

                title: Joi.string().min(3).max(255).required(),

                date_from: Joi.date().allow(null).empty('').default(null),
                date_to: Joi.date().allow(null).empty('').default(null),

                price_ultrasound: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_mammography: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_xray: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),

                price_pcr: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_hti: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_brucellosis: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),

                price_worker_all: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_worker_man: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
                price_worker_woman: Joi.number().integer().min(0).max(999999).allow(null).empty('').default(null),
            })

            value = await schema.validateAsync(rsRequest)

            if ((value.price_worker_man && !value.price_worker_woman) || (!value.price_worker_man && value.price_worker_woman)) throw ({code: 412, msg: ''})
            if ((value.price_worker_all && value.price_worker_man && value.price_worker_woman)) throw ({code: 412, msg: ''})

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()
            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            let result = await CContract.Add ({...value, create_user_id: userId})

            return NextResponse.json({
                code: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RContract Add'}, ...err})
    }
}
