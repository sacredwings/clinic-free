// @ts-nocheck
import Joi from "joi"
import CProfExamination from "@/class/prof-examination"
import { mongo, minio } from "@/utility/connect"
import {NextResponse} from "next/server";
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            //схема
            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).required(),

                id: Joi.string().min(24).max(24).empty(['', null]).default(null),
            })

            value = await schema.validateAsync(rsRequest)
        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let userId = await Authentication(request)
            if (!userId) throw ({code: 30100000, msg: 'Требуется авторизация'})

            let searchProfExamination = await CProfExamination.GetById(value.clinic_id, [value.id])
            searchProfExamination = searchProfExamination[0]



            return NextResponse.json({
                err: 0,
                response: {

                }
            })

        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RProfExamination Edit'}, ...err})
    }
}

function FieldToId (arr) {
    if (!arr || !arr.length) return null

    let newArr = []
    for (let item of arr) {
        newArr.push(item._id)
    }

    return newArr
}

function Field (arr) {
    if (!arr || !arr.length) return null

    let newArr = []
    for (let item of arr) {
        let newItem = {
            _id: item._id,
            name: item.name,
            price: null
        }

        if ((item._price) && (item._price.price))
            newItem.price = item._price.price

        newArr.push(newItem)
    }

    return newArr
}
