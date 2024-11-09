// @ts-nocheck
import ContractAdd from '@/component/clinic/admin/contract/add'
import {
    ServerContractGet, ServerContractTypeGet,
    ServerOrgGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function ContractAddPage ({
                                        params,
                                        searchParams
                                    }:{
    params: { clinic_id: string },
    searchParams: { org_id: string }
}) {
    let org = await ServerOrgGetById({ids: [searchParams.org_id]}, {cookies:cookies()})
    if (org) org = org[0]

    let contractType = await ServerContractTypeGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Новый договор</h1>
            <ContractAdd clinic_id={params.clinic_id} org={org} contractType={contractType.items}/>
        </>
    )
}
