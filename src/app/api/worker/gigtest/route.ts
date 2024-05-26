// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CWorker from "@/class/worker"
import CContract from "@/class/contract"
import CContractType from "@/class/contract-type"
import CHf from "@/class/hf"
import CResearch from "@/class/research"
import CSpecialist from "@/class/specialist"
import {CUser} from "../../../../../../social-framework/src"
import worker from "@/class/worker";

export async function POST (request: Request) {
    let value
    try {
        try {
            let rsRequest = await request.json()

            //схема
            const schema = Joi.object({
                worker_id: Joi.string().min(24).max(24).required()
            })

            value = await schema.validateAsync(rsRequest)

        } catch (err) {
            console.log(err)
            throw ({code: 412, msg: 'Неверные параметры'})
        }
        try {
            await mongo()

            let searchWorker = await CWorker.GetById([value.worker_id])
            searchWorker = searchWorker[0]

            console.log(searchWorker)

            return NextResponse.json({
                err: 0,
                response: true
            })

        } catch (err) {
            throw ({...{code: 10000000, msg: 'Ошибка формирования результата'}, ...err})
        }
    } catch (err) {
        return NextResponse.json({...{code: 10000000, msg: 'RWorker Add'}, ...err})
    }
}
