// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import {Authentication} from "@/app/api/function";
import CAppointment from "@/class/appointment";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).required(),

                room_id: Joi.string().min(24).max(24).empty([null, '']).default(null),
                doctor_id: Joi.string().min(24).max(24).required(),
                doctor_user_id: Joi.string().min(24).max(24).empty([null, '']).default(null),
                patient_user_id: Joi.string().min(24).max(24).required(),

                specialist_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).empty([null, '', Joi.array().length(0)]).default(null),
                service_ids: Joi.array().min(1).max(50).items(Joi.string().min(24).max(24)).empty([null, '', Joi.array().length(0)]).default(null)
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

            //поиск пользователя по ФИО и дате рождения
            //если есть добавляем user_id из него / или создаем новый
            //проверяем занят ли врач
            //проверяем занят ли кабинет
            //добавляем запись на прием

            let result = await CAppointment.Add ( value.clinic_id, userId, value )

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RAppointment Add'}, ...err})
    }
}
