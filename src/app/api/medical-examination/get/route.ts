// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import { mongo, minio } from "@/utility/connect"
import CProfExamination from "../../../../class/prof-examination"
import CContract from "@/class/contract";

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                clinic_id: searchParams.get('clinic_id'),

                q: searchParams.get('q'),
                contract_id: searchParams.get('contract_id'),

                offset: searchParams.get('offset'),
                count: searchParams.get('count'),

                order: searchParams.get('order'),
                order_by: searchParams.get('order_by'),
            }

            //схема
            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).empty([null,'']).default(null),

                q: Joi.string().min(3).max(255).empty([null,'']).default(null),
                contract_id: Joi.string().min(24).max(24).empty([null,'']).default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).empty([null,'']).default(0),
                count: Joi.number().integer().min(0).max(10000).empty([null,'']).default(20),

                order: Joi.number().valid(1, -1).empty([null,'']).default(-1),
                order_by: Joi.valid('_id', 'first_name', 'last_name', 'second_name').empty([null,'']).default('_id'),
            });

            value = await schema.validateAsync(url)

        } catch (err) {
            console.log(err)
            throw ({err: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let arFields = {
                clinic_id: value.clinic_id,

                q: value.q,
                contract_id: value.contract_id,

                offset: value.offset,
                count: value.count,

                order: value.order,
                order_by: value.order_by,
            }
            let items = await CProfExamination.Get (arFields)
            let count = await CProfExamination.GetCount (arFields)
            return NextResponse.json({
                code: 0,
                response: {
                    count: count,
                    items: items
                }
            })

        } catch (err) {
            console.log(err)
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        console.log(err)
        return NextResponse.json({...{code: 10000000, msg: 'RProfExamination Add'}, ...err})

    }
}

export const dynamic = 'force-dynamic';
