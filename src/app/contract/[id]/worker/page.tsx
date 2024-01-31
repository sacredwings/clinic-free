// @ts-nocheck
import ContractId from '@/component/contract/form'
import {
    ServerWorkerGet,
    ServerOrgGet,
    ServerSpecialistGet,
    ServerWorkerGetById,
    ServerOrgGetById, ServerContractGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let contract = await ServerContractGetById({ids: [params.id]}, {cookies:cookies()})
    let arWorker = await ServerWorkerGet({
        contract_id: params.id,
        offset: 0,
        count: 10000
    }, {cookies:cookies()})

    const ListPrint = (worker_id) => {
        return <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-print"></i>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a href={`/worker/${worker_id}/pdf/zaklyucheniye-pred`} className="dropdown-item" target="_blank">Закл. предварительного осмотра</a>
                        <a href={`/worker/${worker_id}/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. периодического осмотра</a>
                        <a href={`/worker/${worker_id}/pdf/card`} className="dropdown-item" target="_blank">Карта</a>
                        <a href={`/worker/${worker_id}/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</a>
                    </li>
                </ul>
            </div>

        </div>
    }
    const ListCode = (arList) => {
        if (arList)
            return arList.map((list, i) => {
                return <span className="badge text-bg-primary" style={{margin:'2px'}} key={i}>{list}</span>
            })
        else
            return ''
    }

    const Progress = (item) => {
        let countSpecialist = 0
        let countResearch = 0

        let countSpecialistVisit = 0
        let countResearchVisit = 0

        let countSpecialistResult = 100
        let countResearchResult = 100

        let result = 0

        if (item._specialist_ids) countSpecialist = item._specialist_ids.length
        if (item._research_ids) countResearch = item._research_ids.length
        if (item._specialist_visit_ids) countSpecialistVisit = item._specialist_visit_ids.length
        if (item._research_visit_ids) countResearchVisit = item._research_visit_ids.length

        if (countSpecialist) countSpecialistResult = Math.floor(countSpecialistVisit/countSpecialist *100)
        if (countResearch) countResearchResult = Math.floor(countResearchVisit/countResearch *100)

        result = Math.floor((countSpecialistResult + countResearchResult) / 2)

        return (<div className="progress" role="progressbar" aria-label="Example 1px high" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '1px'}}>
            <div className="progress-bar" style={{width: `${result}%`}}></div>
        </div>)
    }

    const List = (arList) => {
        return <ol className="list-group list-group-numbered">
            {arList.map((item, i) => {
                //let href = `/contract/${id}/worker`
                return <li className="list-group-item d-flex justify-content-between align-items-start" key={i}>
                    <div className="ms-2 me-auto" style={{width: '100%'}}>
                        <div className="fw-bold">{item._user_id.last_name} {item._user_id.first_name} {item._user_id.second_name}</div>
                        {ListCode(item.hf_code)}
                        <br/>
                        <Link href={`/worker/${item._id}`}>
                            Подробно...
                        </Link>
                        <br/>
                        {Progress(item)}
                    </div>
                    <Link href={`/worker/${item._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
                        <i className="fa-solid fa-edit"></i>
                    </Link>

                    {ListPrint(item._id)}
                </li>
            })}
        </ol>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Работников нет
        </div>
    }

    return (
        <>
            <h1>Работники <Link type="button" className="btn btn-outline-success"
                                href={`/contract/${params.id}/worker/add`}> + </Link></h1>
            <ContractId contract={contract[0]}/>
            <Link href={`/org/${contract[0].org_id}/contract`} type="button" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                организация
            </Link>
            <br/>
            <br/>
            {(arWorker.items.length) ? List(arWorker.items) : NoList()}
        </>
    )
}
