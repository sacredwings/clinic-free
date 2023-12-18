import ContractId from '@/component/contract/id'
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
        count: 100
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
    const List = (arList) => {
        return <ol className="list-group list-group-numbered">
            {arList.map((list, i) => {
                //let href = `/contract/${id}/worker`
                return <li className="list-group-item d-flex justify-content-between align-items-start" key={i}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{list._user_id.last_name} {list._user_id.first_name} {list._user_id.patronymic_name}</div>
                        {ListCode(list.hf_code)}
                        <br/>
                        <Link href={`/worker/${list._id}`}>
                            Подробно...
                        </Link>
                    </div>
                    <Link href={`/worker/${list._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
                        <i className="fa-solid fa-edit"></i>
                    </Link>

                    {ListPrint(list._id)}
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
            <h1>Работники</h1>
            <ContractId contract={contract[0]}/>
            {(arWorker.items.length) ? List(arWorker.items) : NoList()}
        </>
    )
}
