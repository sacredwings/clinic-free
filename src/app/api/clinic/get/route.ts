// @ts-nocheck
import Joi from 'joi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import CClinic from "@/class/clinic"

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                q: searchParams.get('q'),

                offset: searchParams.get('offset'),
                count: searchParams.get('count')
            }

            const schema = Joi.object({
                q: Joi.string().min(3).max(255).allow(null).empty('').default(null),

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
                offset: value.offset,
                count: value.count,
            }
            let items = await CClinic.Get (arFields)
            let count = await CClinic.GetCount (arFields)

            return NextResponse.json({
                code: 0,
                response: {
                    items: items,
                    count: count,
                }
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'CClinic Get'}, ...err})
    }
}

export const dynamic = 'force-dynamic';
