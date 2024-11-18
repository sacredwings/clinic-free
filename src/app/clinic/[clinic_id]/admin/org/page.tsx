// @ts-nocheck
import {ServerOrgGet} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import OrgList from '@/component/clinic/admin/org/list'
import Pagination from "@/component/menu/pagination";
import React from "react";

export default async function Org ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string, order: number, order_by: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/clinic/${params.clinic_id}/admin/org`

    let arOrg = await ServerOrgGet({
        //clinic_id: params.clinic_id,

        q: searchParams.q,

        count: step,
        offset: (page - 1) * step,

        order: searchParams.order,
        order_by: searchParams.order_by,
    }, {cookies:cookies()})

    return (
        <article>
            <OrgList
                clinic_id={params.clinic_id}
                list={arOrg.items}
            />

            <Pagination searchParams={searchParams} url={url} count={arOrg.count} step={step}/>
        </article>
    )
}
