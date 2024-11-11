// @ts-nocheck
import {
    ServerContractGet,
    ServerOrgGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import ContractList from "@/component/clinic/admin/contract/list";

export default async function ContractGet ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { org_id: string, page: number, q: string }
}) {
    let org = await ServerOrgGetById({ids: [searchParams.org_id]}, {cookies:cookies()})
    let arContract = await ServerContractGet({
        clinic_id: params.clinic_id,

        q: params.q,
        org_id: searchParams.org_id,

        offset: 0,
        count: 1000
    }, {cookies:cookies()})

    return (
        <article>
            <ContractList
                list={arContract.items}
                clinic_id={params.clinic_id}
                org_id={searchParams.org_id}
            />
        </article>
    )
}
