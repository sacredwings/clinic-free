// @ts-nocheck
import {
    ServerContractGet,
    ServerContaractGetById, ServerProfExaminationGet, ServerContractGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import ProfExaminationList from "@/component/clinic/admin/prof-examination/list";

export default async function ProfExaminationGet ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { contract_id: string, page: number, q: string }
}) {
    //let contract = await ServerContractGetById({ids: [searchParams.contract_id]}, {cookies:cookies()})
    let arProfExamination = await ServerProfExaminationGet({
        clinic_id: params.clinic_id,

        q: params.q,
        contract_id: searchParams.contract_id,

        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <article>
            <ProfExaminationList
                list={arProfExamination.items}
                clinic_id={params.clinic_id}
                //org_id={searchParams.org_id}
                contract_id={searchParams.contract_id}
            />
        </article>
    )
}
