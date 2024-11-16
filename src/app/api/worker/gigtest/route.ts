// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import Joi from "joi"
import CProfExamination from "@/class/prof-examination"
import CGigtestUser from "@/class/gigtest/users"
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

            let searchWorker = await CProfExamination.GetById([value.worker_id])
            searchWorker = searchWorker[0]

            let user = searchWorker._user_id

            let arFields = {
                fio: `${user.last_name} ${user.first_name} ${user.second_name}`,
                birthday: new Date(user.date_birth).toJSON().split("T")[0],
                home_address: 'Домашний адрес',
                company_name: searchWorker._contract_id._org_id.name,
                position: searchWorker.profession,
                snils: user.snils, //'51929363411'
                address_state_code: '54',
                gender: (user.man ? '1' : '2'),
                first_name: user.first_name,
                last_name: user.last_name,
                patronymic: user.second_name,
            }
            await CGigtestUser.UserAdd(arFields)

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
