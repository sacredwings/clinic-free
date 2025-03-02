// @ts-nocheck
import { NextResponse } from 'next/server'
import Joi from "joi"
import {Authentication} from "@/app/api/function";
import {mongo} from "@/utility/connect";
import config from "../../../../../config.json";
import { DB, Store } from "../../../../../../social-framework/src"

export async function POST(request: Request) {
    try {
        let mongoClient = await mongo()

        let collectionWorker = mongoClient.collection('worker')

        let ar1 = new DB().ObjectID('636922075048dd00c492013e')
        let ar2 = new DB().ObjectID('6387faa76c2c2493e1f91a64')
        let ar3 = new DB().ObjectID('63bb7296d3b639e9843fe23a')
        let ar4 = new DB().ObjectID('63e44c8c0673a62108917735')
        let ar5 = new DB().ObjectID('640a818f20dc535e07c10056')
        let arOut = new DB().ObjectID('65979bffe707ed29b5124885')

        collectionWorker.updateMany({contract_id: ar1}, {$set: {
                contract_id: arOut
            }})
        collectionWorker.updateMany({contract_id: ar2}, {$set: {
                contract_id: arOut
            }})
        collectionWorker.updateMany({contract_id: ar3}, {$set: {
                contract_id: arOut
            }})
        collectionWorker.updateMany({contract_id: ar4}, {$set: {
                contract_id: arOut
            }})
        collectionWorker.updateMany({contract_id: ar5}, {$set: {
                contract_id: arOut
            }})

        /*
        await collectionUser.insertOne({
            login: 'admin',
            password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq',
            root: true
        })

        await collectionUser.insertOne({
            login: 'test',
            password: '$2b$10$zdWLdO9rHZgTiTkPKQYsY.6TBAMH.pTt6MZcZcb7i85.2vCA7uUkq'
        })*/

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