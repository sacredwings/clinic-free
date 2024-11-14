// @ts-nocheck
import {ServerOrgGet} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import OrgList from '@/component/clinic/admin/org/list'

export default async function Org ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string, order: number, order_by: string }
}) {
    let arOrg = await ServerOrgGet({
        clinic_id: params.clinic_id,

        q: searchParams.q,

        offset: 0,
        count: 10000,

        order: searchParams.order,
        order_by: searchParams.order_by,
    }, {cookies:cookies()})

    return (
        <article>
            <OrgList
                clinic_id={params.clinic_id}
                list={arOrg.items}
            />
        </article>
    )
}
