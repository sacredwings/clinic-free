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
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { contract_id: string }
}) {
    let contract = await ServerContractGetById({clinic_id: params.clinic_id, ids: [searchParams.contract_id]}, {cookies:cookies()})
    if (contract) contract = contract[0]

    return (
        <>
            <h1>Новый проф. осмотр</h1>
            <ProfExaminationAdd clinic_id={params.clinic_id} contract={contract}/>
        </>
    )
}
