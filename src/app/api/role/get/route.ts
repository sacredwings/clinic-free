// @ts-nocheck
import Joi from 'joi'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { mongo, minio } from "@/utility/connect"
import Config from "../../../../../config.json";
import CRole from "@/class/role"
import {Authentication} from "@/app/api/function";
import CPermission from "@/class/permission";

export async function GET(request: Request) {
    let value
    try {
        try {
            const { searchParams } = new URL(request.url)
            let url = {
                offset: searchParams.get('clinic_id'),

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
                clinic_id: value.clinic_id,

                count: value.count,
                offset: value.offset
            }
            let arFields = {
                offset: value.offset,
                count: value.count,
            }
            let items = await CPermission.Get ( value.clinic_id, arFields )
            let count = await CPermission.GetCount ( value.clinic_id, arFields )

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
        return NextResponse.json({...{code: 10000000, msg: 'RRole Get'}, ...err})
    }
}

export const dynamic = 'force-dynamic';
