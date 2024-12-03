// @ts-nocheck
import ProfExaminationId from '@/component/clinic/admin/prof-examination/id'
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
            <h1>Проф. осмотр </h1>

            <ProfExaminationId profExamination={arProfExamination[0]}/>
        </>
    )
}
