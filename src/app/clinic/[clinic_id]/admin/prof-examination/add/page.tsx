// @ts-nocheck
import ProfExaminationAdd from '@/component/clinic/admin/prof-examination/add'
import {
    ServerContractGetById,
    ServerProfExaminationGet,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function ContractAddPage ({
    params,
    //searchParams
}:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let contract = await ServerContractGetById({ids: [params.id]}, {cookies:cookies()})
    if (contract) contract = contract[0]

    let profExamination = await ServerProfExaminationGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Новый проф. осмотр</h1>
            <ProfExaminationAdd contract={contract} profExamination={profExamination.items}/>
        </>
    )
}
