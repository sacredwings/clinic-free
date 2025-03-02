// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi";
import CExaminationConclusion from "@/class/examination-conclusion"

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                offset: searchParams.get('offset'),
                count: searchParams.get('count')
            }

            //схема
            const schema = Joi.object({
                offset: Joi.number().integer().min(0).max(9223372036854775807).empty([null,'']).default(0),
                count: Joi.number().integer().min(0).max(100).empty([null,'']).default(20),
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
            let items = await CExaminationConclusion.Get ( arFields )
            let count = await CExaminationConclusion.GetCount ( arFields )

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
        return NextResponse.json({...{code: 10000000, msg: 'RExaminationConclusion Get'}, ...err})
    }
}

export const dynamic = 'force-dynamic';
