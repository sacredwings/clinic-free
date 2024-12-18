// @ts-nocheck
import Joi from 'joi'
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import CAppointment from "@/class/appointment"
import {Authentication} from "@/app/api/function";

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                clinic_id: searchParams.get('clinic_id'),

                offset: searchParams.get('offset'),
                count: searchParams.get('count')
            }

            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).required(),

                offset: Joi.number().integer().min(0).max(9223372036854775807).empty([null, '']).default(0),
                count: Joi.number().integer().min(0).max(100).empty([null, '']).default(20)
            });

            value = await schema.validateAsync(url)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()
            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            //НУЖНО /проверка /доступ к клинике

            let arFields = {
                count: value.count,
                offset: value.offset
            }
            let items = await CAppointment.Get ( value.clinic_id, arFields )
            let count = await CAppointment.GetCount ( value.clinic_id, arFields )

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
        return NextResponse.json({...{code: 10000000, msg: 'RAppointment Get'}, ...err})
    }
}

export const dynamic = 'force-dynamic';
