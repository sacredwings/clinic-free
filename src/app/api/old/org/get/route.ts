// @ts-nocheck
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import Joi from "joi";
import COrg from "@/class/org"

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                q: searchParams.get('q'),

                offset: searchParams.get('offset'),
                count: searchParams.get('count'),

                order: searchParams.get('order'),
                order_by: searchParams.get('order_by'),
            }

            //схема
            const schema = Joi.object({
                q: Joi.string().min(3).max(255).empty([null,'']).default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).empty([null,'']).default(0),
                count: Joi.number().integer().min(0).max(10000).empty([null,'']).default(20),

                order: Joi.number().valid(1, -1).empty([null,'']).default(-1),
                order_by: Joi.valid('_id', 'title').empty([null,'']).default('_id'),
            });

            value = await schema.validateAsync(url)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let arFields = {
                //clinic_id: value.clinic_id,

                q: value.q,

                offset: value.offset,
                count: value.count,

                order: value.order,
                order_by: value.order_by,
            }
            let items = await COrg.Get (arFields)
            let count = await COrg.GetCount ( arFields )

            return NextResponse.json({
                code: 0,
                response: {
                    items: items,
                    count: count,
                }
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'ROrg Add'}, ...err})
    }
}

export const dynamic = 'force-dynamic';
