// @ts-nocheck
import WorkerId from '@/component/worker/id'
import {
    ServerOrgGet,
    ServerProfExaminationGetById,
    ServerSpecialistGet,
    ServerWorkerGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function ProfExamination ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {

    let arProfExamination = await ServerProfExaminationGetById({
        ids: [params.id]
    }, {cookies:cookies()})


    return (
        <>
            <h1>Человек: </h1>

        </>
    )
}
