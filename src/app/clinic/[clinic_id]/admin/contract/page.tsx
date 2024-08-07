// @ts-nocheck
import WorkerId from '@/component/worker/id'
import {
    ServerContractGet,
    ServerOrgGet,
    ServerOrgGetById,
    ServerSpecialistGet,
    ServerWorkerGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
//import OrgId from '@/component/org/id'

export default async function ContractGet ({
                                        params,
                                        searchParams
                                    }:{
    params: { id: string },
    searchParams: { org_id: string, page: number, q: string }
}) {
    let org = await ServerOrgGetById({ids: [params.id]}, {cookies:cookies()})
    let arContract = await ServerContractGet({
        org_id: searchParams.org_id,
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    const ContractType = (arList) => {
        if (!arList) return null
        return arList.map((list, i) => {
            return <span key={i} className="badge bg-primary" style={{margin: '2px'}}>
                {list.name}
            </span>
        })
    }

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/clinic/${params.clinic_id}/admin/prof-examination?contract_id=${list._id}`
                return <Link className="list-group-item list-group-item-action" href={href} key={i}>
                    {list.name}
                    <br/>
                    {ContractType(list._contract_type_ids)}
                </Link>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Договоров нет
        </div>
    }

    return (
        <>
            <h1>Договора <Link type="button" className="btn btn-outline-success" href={`/org/${params.id}/contract/add`}> + </Link></h1>
            {/*<OrgId org={org[0]}/>*/}
            {(arContract.items.length) ? List(arContract.items) : NoList()}
        </>
    )
}
