// @ts-nocheck
import ContractAdd from '@/component/contract/add'
import {
    ServerContractTypeGet,
    ServerOrgGet,
    ServerOrgGetById,
    ServerSpecialistGet,
    ServerWorkerGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function ContractAdd ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let org = await ServerOrgGetById({ids: [params.id]}, {cookies:cookies()})
    org = org[0]

    let contractType = await ServerContractTypeGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Новый договор</h1>
            <ContractAdd org={org} contractType={contractType.items}/>
        </>
    )
}
