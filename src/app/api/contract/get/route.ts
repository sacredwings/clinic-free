// @ts-nocheck
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import Joi  from "joi"
import CContract from "@/class/contract"

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                clinic_id: searchParams.get('clinic_id'),
                q: searchParams.get('q'),
                org_id: searchParams.get('org_id'),
                offset: searchParams.get('offset'),
                count: searchParams.get('count')
            }

            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),
                q: Joi.string().min(3).max(255).allow(null).empty('').default(null),
                org_id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                offset: Joi.number().integer().min(0).max(9223372036854775807).allow(null).empty('').default(0),
                count: Joi.number().integer().min(0).max(10000).allow(null).empty('').default(20)
            });

            value = await schema.validateAsync(url)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let arFields = {
                clinic_id: value.clinic_id,
                q: value.q,
                org_id: value.org_id,

                offset: value.offset,
                count: value.count
            }
            let items = await CContract.Get (value.clinic_id, arFields)
            let count = await CContract.GetCount (value.clinic_id, arFields)

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
        return NextResponse.json({...{code: 10000000, msg: 'RContract Add'}, ...err})
    }
}

export const dynamic = 'force-dynamic';
