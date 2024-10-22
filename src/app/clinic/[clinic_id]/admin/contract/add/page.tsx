// @ts-nocheck
import ContractAdd from '@/component/clinic/admin/contract/add'
import {
    ServerContractGet,
    ServerOrgGetById
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
    let org = await ServerOrgGetById({ids: [params.id]}, {cookies:cookies()})
    if (org) org = org[0]

    let contract = await ServerContractGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Новый договор</h1>
            <ContractAdd org={org} contract={contract.items}/>
        </>
    )
}
