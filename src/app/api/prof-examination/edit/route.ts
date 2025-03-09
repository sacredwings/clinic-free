// @ts-nocheck
import Joi from "joi"
import CUser from "@/class/user"
import CProfExamination from "@/class/prof-examination"
import CContract from "@/class/contract"
import CContractType from "@/class/contract-type"
import CHf from "@/class/hf"
import CResearch from "@/class/research"
import CSpeciality from "@/class/speciality"
import { mongo, minio } from "@/utility/connect"
import {NextResponse} from "next/server";
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

                id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                hf_code: Joi.array().min(1).max(100).items(Joi.string().min(1).max(20)).allow(null).empty([null, '', Joi.array().length(0)]).default(null),

                check_ultrasound: Joi.boolean().empty([null, '']).default(null),
                check_mammography: Joi.boolean().empty([null, '']).default(null),
                check_xray: Joi.boolean().empty([null, '']).default(null),

                check_pcr: Joi.boolean().empty([null, '']).default(null),
                check_hti: Joi.boolean().empty([null, '']).default(null),
                check_brucellosis: Joi.boolean().empty([null, '']).default(null),

                subdivision: Joi.string().min(1).max(255).empty([null, '']).default(null),
                profession: Joi.string().min(1).max(255).empty([null, '']).default(null),
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

            //let searchUser = await CUser.GetById([searchWorker.user_id])
            //searchUser = searchUser[0]

            let arFieldsProfExamination = {
                hf_code: value.hf_code,

                check_ultrasound: value.check_ultrasound,
                check_mammography: value.check_mammography,
                check_xray: value.check_xray,

                check_pcr: value.check_pcr,
                check_hti: value.check_hti,
                check_brucellosis: value.check_brucellosis,

                subdivision: value.subdivision,
                profession: value.profession,
            }
            let result = await CProfExamination.Edit (value.clinic_id, userId, value.id, arFieldsProfExamination)

            return NextResponse.json({
                err: 0,
                response: {
                    _id: value.id
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
