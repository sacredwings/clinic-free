// @ts-nocheck
import Joi from "joi"
import CUser from "@/class/user"
import CProfExamination from "@/class/prof-examination"
import CContract from "@/class/contract"
import CContractType from "@/class/contract-type"
import CHf from "@/class/hf"
import CResearch from "@/class/research"
import CSpecialist from "@/class/specialist"
import { mongo, minio } from "@/utility/connect"
import {NextResponse} from "next/server";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            //схема
            const schema = Joi.object({
                id: Joi.string().min(24).max(24).allow(null).empty('').default(null),

                health_group: Joi.string().min(0).max(255).allow(null).empty('').default(null),
                contraindications: Joi.array().min(1).max(10).items(Joi.string().min(1).max(24)).allow(null).empty(Joi.array().length(0)).default(null),
                re_hf: Joi.number().integer().min(0).max(255).allow(null).empty('').default(null),

            })

            value = await schema.validateAsync(rsRequest)

            //if (value.contract_type_ids && !value.contract_type_ids.length) value.contract_type_ids = null

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let searchWorker = await CProfExamination.GetById([value.id])
            searchWorker = searchWorker[0]

            let arFields = {
                health_group: value.health_group,
                contraindications: value.contraindications,
                re_hf: value.re_hf,
            }

            let result = await CProfExamination.Edit ( value.id, arFields )

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
        return NextResponse.json({...{code: 10000000, msg: 'RWorker Edit'}, ...err})
    }
}
