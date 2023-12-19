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

        let collectionUser = mongoClient.collection('user')

        let arIndexes = await collectionUser.indexes()
        arIndexes.forEach((item)=>{
            if (item.name !== '_id_')
                collectionUser.dropIndex(item.name)
        })
        let indexUser = await collectionUser.createIndex({
            "first_name":"text",
            "last_name":"text",
            "second_name":"text",
        })

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