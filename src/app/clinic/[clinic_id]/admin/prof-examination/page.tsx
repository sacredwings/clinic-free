// @ts-nocheck
import {
    ServerContractGet,
    ServerContaractGetById, ServerProfExaminationGet, ServerContractGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import ProfExaminationList from "@/component/clinic/admin/prof-examination/list";
import Pagination from "@/component/menu/pagination";
import React from "react";

export default async function ProfExaminationGet ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { contract_id: string, page: number, q: string, order: number, order_by: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/clinic/${params.clinic_id}/admin/prof-examination`

    let arProfExamination = await ServerProfExaminationGet({
        clinic_id: params.clinic_id,

        q: searchParams.q,
        contract_id: searchParams.contract_id,

        count: step,
        offset: (page - 1) * step,

        order: searchParams.order,
        order_by: searchParams.order_by,
    }, {cookies:cookies()})

    return (
        <article>
            <ProfExaminationList
                list={arProfExamination.items}
                clinic_id={params.clinic_id}
                //org_id={searchParams.org_id}
                contract_id={searchParams.contract_id}
                searchParams={searchParams}
            />

            <Pagination searchParams={searchParams} url={url} count={arProfExamination.count} step={step}/>
        </article>
    )
}
