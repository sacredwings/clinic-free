// @ts-nocheck
import { NextResponse } from 'next/server'
import { mongo, minio } from "@/utility/connect"
import { Store, DB } from "../../../../../../social-framework/src"
import { Authentication } from "@/app/api/function"
import CUser from "@/class/user"

export async function GET (request: Request) {
    try {
        //let rsRequest = await request.json()

        try {
            await mongo()

            let userId = await Authentication(request)
            userId = new DB().ObjectID(userId)

            if (!userId) return NextResponse.json({
                err: 0,
                response: false
            })

            let result = await CUser.GetById ( [userId] )
            result = result[0]

            return NextResponse.json({
                err: 0,
                response: result
            })
        } catch (err) {
            console.log(err)
            throw ({...{code: 100000, msg: 'Ошибка в коде'}, ...err})
        }

    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
}

export const dynamic = 'force-dynamic';