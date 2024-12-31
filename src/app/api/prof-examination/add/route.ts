// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CProfExamination from "@/class/prof-examination"
import CContract from "@/class/contract"
import CContractType from "@/class/contract-type"
import CHf from "@/class/hf"
import CResearch from "@/class/research"
import CSpecialist from "@/class/specialist"
import {CUser} from "../../../../../../social-framework/src"
import {Authentication} from "@/app/api/function";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            if (rsRequest.hf_code) rsRequest.hf_code = rsRequest.hf_code.replace(/ /gi, '') //удаление пробелов
            if (rsRequest.hf_code) rsRequest.hf_code = rsRequest.hf_code.split(',') //в массив

            //схема
            const schema = Joi.object({
                clinic_id: Joi.string().min(24).max(24).required(),

                contract_id: Joi.string().min(24).max(24).empty([null, '']).default(null),
                patient_user: Joi.string().min(24).max(24).empty([null, '']).default(null),

                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty([null, '', Joi.array().length(0)]).default(null),

                first_name: Joi.string().min(1).max(255).required(),
                last_name: Joi.string().min(1).max(255).required(),
                second_name: Joi.string().min(1).max(255).empty([null, '']).default(null),

                man: Joi.number().integer().min(0).max(1).required(),
                date_birth: Joi.date().min('1-1-1900').max('1-1-2030').required(),

                check_ultrasound: Joi.boolean().empty([null, '']).default(null),
                check_mammography: Joi.boolean().empty([null, '']).default(null),
                check_xray: Joi.boolean().empty([null, '']).default(null),

                check_pcr: Joi.boolean().empty([null, '']).default(null),
                check_hti: Joi.boolean().empty([null, '']).default(null),
                check_brucellosis: Joi.boolean().empty([null, '']).default(null),

                //oms_policy_number: Joi.number().integer().min(999999999999999).max(9999999999999999).allow(null).empty('').default(null),
                //snils: Joi.number().integer().min(9999999999).max(99999999999).allow(null).empty('').default(null),
                //dogovor_type: Joi.number().integer().min(0).max(1).allow(null).empty('').default(0),

                //region: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //city: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //street: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //house: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //housing: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //apt: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //building: Joi.string().min(0).max(255).allow(null).empty('').default(null),

                //passport_serial: Joi.number().integer().min(1).max(9999).allow(null).empty('').default(null),
                //passport_number: Joi.number().integer().min(1).max(999999).allow(null).empty('').default(null),
                //passport_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                //passport_issued_by: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                phone: Joi.number().min(1000000000).max(9999999999).empty([null, '']).default(null),
                //phone_additional: Joi.number().integer().min(70000000000).max(79999999999).allow(null).empty('').default(null),

                subdivision: Joi.string().min(1).max(255).empty([null, '']).default(null),
                profession: Joi.string().min(1).max(255).empty([null, '']).default(null),
                //employment_date: Joi.date().min('1-1-1900').max('1-1-2030').allow(null).empty('').default(null),

                //work_place: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                //work_experience: Joi.number().integer().min(0).max(100).allow(null).empty('').default(null),
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

            let result = await CProfExamination.Add ({...value, create_user_id: userId})

            return NextResponse.json({
                err: 0,
                response: result
            })

        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RWorker Add'}, ...err})
    }
}


