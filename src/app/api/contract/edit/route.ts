// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {headers} from "next/headers";
import CContract from "@/class/contract"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),

                name: Joi.string().min(3).max(255).required(),

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

            let arFields = {
                name: value.name,
                //org_id: value.org_id,

                //contract_type_ids: value.contract_type_ids,

                price_ultrasound: value.price_ultrasound,
                price_mammography: value.price_mammography,
                price_xray: value.price_xray,

                price_pcr: value.price_pcr,
                price_hti: value.price_hti,
                price_brucellosis: value.price_brucellosis,

                price_worker_all: value.price_worker_all,
                price_worker_man: value.price_worker_man,
                price_worker_woman: value.price_worker_woman,

                date_from: value.date_from,
                date_to: value.date_to,
            }
            let result = await CContract.Edit ( value.id, arFields )

            return NextResponse.json({
                err: 0,
                response: result
            })

        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'ROrg Add'}, ...err})
    }
}
