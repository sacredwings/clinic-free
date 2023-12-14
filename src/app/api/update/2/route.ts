import { NextResponse } from 'next/server'
import Joi from "joi"
import { Store, DB, CGroup }  from "../../../../../../social-framework"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";
import config from "../../../../../config.json";
import {serverCheckResult} from "recaptcha-v3-react-function-async";

export async function POST(request: Request) {
    try {
        let mongoClient = await mongo()
        let collectionWorker = mongoClient.collection('worker')
        let collectionUser = mongoClient.collection('user')

        await collectionUser.updateMany({}, { $rename :{"patronymic_name":"second_name"}}, false, true)

        return NextResponse.json({
            code: 0,
            response: true
        })
    } catch (e) {
        return NextResponse.json({
            code: 999,
            msg: "Ошибка"
        })
    }

}

function arr (ids) {
    let result = []

    if ((!ids) || (!ids.length)) return null

    for (let item of ids) {
        result.push(item._id)
    }

    return result
}