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
                contract_type_ids: Joi.array().min(1).max(10).items(Joi.string().min(24).max(24)).empty([null, '', Joi.array().length(0)]).default(null),

                title: Joi.string().min(3).max(255).required(),
                description: Joi.string().max(320).empty([null, '']).default(null),

                price_ultrasound: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
                price_mammography: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
                price_xray: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),

                price_pcr: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
                price_hti: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
                price_brucellosis: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),

                price_worker_all: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
                price_worker_man: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
                price_worker_woman: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),

                date_start: Joi.date().empty([null, '']).default(null),
                date_end: Joi.date().empty([null, '']).default(null),
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

            let arFields = {
                org_id: value.org_id,
                contract_type_ids: value.contract_type_ids,

                title: value.title,
                description: value.description,

                price_ultrasound: value.price_ultrasound,
                price_mammography: value.price_mammography,
                price_xray: value.price_xray,

                price_pcr: value.price_pcr,
                price_hti: value.price_hti,
                price_brucellosis: value.price_brucellosis,

                price_worker_all: value.price_worker_all,
                price_worker_man: value.price_worker_man,
                price_worker_woman: value.price_worker_woman,

                date_start: value.date_start,
                date_end: value.date_end,
            }
            let result = await CContract.Add (value.clinic_id, userId, arFields)

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
