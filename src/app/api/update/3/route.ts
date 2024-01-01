import { NextResponse } from 'next/server'
import Joi from "joi"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";
import config from "../../../../../config.json";

export async function POST(request: Request) {
    try {
        let mongoClient = await mongo()

        let collectionUser = mongoClient.collection('user')

        await collectionUser.insertOne({
            login: 'admin',
            password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq',
            root: true
        })

        await collectionUser.insertOne({
            login: 'test',
            password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq'
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