// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import { Store, DB, CGroup }  from "../../../../../../social-framework/src"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";
import config from "../../../../../config.json";


export async function POST(request: Request) {
    try {
        let mongoClient = await mongo()

        let collectionUser = mongoClient.collection('user')
        let collectionOrg = mongoClient.collection('org')


        console.log('user')
        let collection = mongoClient.collection('user')
        let arIndexes = await collection.indexes()
        arIndexes.forEach((item)=>{
            if (item.name !== '_id_')
                collection.dropIndex(item.name)
        })
        let indexUser = await collection.createIndex({
            "first_name":"text",
            "last_name":"text",
            "second_name":"text",
        })
        console.log(arIndexes)

        console.log('org')
        collection = mongoClient.collection('org')
        arIndexes = await collection.indexes()
        arIndexes.forEach((item)=>{
            if (item.name !== '_id_')
                collection.dropIndex(item.name)
        })
        indexUser = await collection.createIndex({
            "title":"text",
            //"text":"text",
        })
        console.log(arIndexes)

        console.log('prof_examination')
        collection = mongoClient.collection('prof_examination')
        arIndexes = await collection.indexes()
        arIndexes.forEach((item)=>{
            if (item.name !== '_id_')
                collection.dropIndex(item.name)
        })
        indexUser = await collection.createIndex({
            "first_name":"text",
            "last_name":"text",
            "second_name":"text",
        })
        console.log(arIndexes)

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