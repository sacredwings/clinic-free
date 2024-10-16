// @ts-nocheck
import {ServerOrgGet} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import OrgList from '@/component/clinic/admin/org/list'

export default async function Org ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {
    let arOrg = await ServerOrgGet({
        clinic_id: params.clinic_id,

        q: params.q,

        offset: 0,
        count: 10000
    }, {cookies:cookies()})

    return (
        <article>
            <OrgList
                list={arOrg.items}
                clinic_id={params.clinic_id}
            />
        </article>
    )
}
