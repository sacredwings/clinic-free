// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {headers} from "next/headers";
import CSpecialist from "@/class/specialist"
import CPrice from "@/class/price"

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                id: Joi.string().min(24).max(24).required(),
                name: Joi.string().min(1).max(255).required(),
                price: Joi.number().integer().min(0).max(999999).empty([null, '']).default(null),
            });

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({...{err: 412, msg: 'Неверные параметры'}, ...err})
        }
        try {
            await mongo()

            //меняется имя в любом случае
            let arFields = {
                name: value.name
            }
            let result = await CSpecialist.Edit ( value.id, arFields )

            //меняется цена если есть
            if (value.price) {
                let specialistPrice = await CSpecialist.GetById ( [value.id], {price: true} )
                if ((!specialistPrice) || (!specialistPrice[0]) || (!specialistPrice[0]._price) || (specialistPrice[0]._price.price !== value.price)) {
                    let arFields = {
                        object_id: value.id,
                        price: value.price,
                        create_date: new Date()
                    }
                    result = await CPrice.Add ( arFields )
                }
            }

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{err: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RResearch Edit'}, ...err})
    }
}