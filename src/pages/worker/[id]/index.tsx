import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../../app/components/template/main"
import Config from "../../../app/config.json"


export default function ({worker}) {
    useEffect(() => {
        (async () => {
            //await Get(true)
        })()
    }, [])

    const List = (ar) => {
        return ar.map((item, i)=>{
            return <p key={i}>
                {item.name}
            </p>
        })
    }

    const ListCode = (arList) => {
        if (arList)
            return arList.map((list, i) => {
                return <span className="badge text-bg-primary" style={{margin:'2px'}} key={i}>{list}</span>
            })
        else
            return ''
    }

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

    return <TemplatesMain title={`${worker._user_id.first_name} ${worker._user_id.last_name} ${worker._user_id.patronymic_name}`}>
        <h1>{`${worker._user_id.first_name} ${worker._user_id.last_name} ${worker._user_id.patronymic_name}`}</h1>

        {ListCode(worker.hf_code)}

        <hr/>

        <Link href={`/worker/${worker._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
                <i className="fa-solid fa-edit"></i>
        </Link>

        {ListPrint(worker._id)}

        {
            worker.contract_id ?
                <Link href={`/contract/${worker.contract_id}/worker`} type="button" className="btn btn-outline-primary btn-sm">
                        К договору
                </Link> :
                <Link href={`/proffiz`} type="button" className="btn btn-outline-primary btn-sm">
                        К списку физ. лиц
                </Link>
        }

        <hr/>
        <h3>Иследования</h3>
        {List(worker.research_ids)}

        <hr/>
        <h3>Специалисты</h3>
        {List(worker.specialist_ids)}

        <h3>Итоговая сумма <b>{worker.price}</b></h3>

    </TemplatesMain>
}

const GetById = async (id) => {
    const url = `${Config.server.url}/api/worker/getById`
    let fields = {
        params: {
            ids: id,
        }
    }
    let result = await axios.get(url, fields)
    return result.data.response
}

export async function getServerSideProps ({query, req}) {
    let worker = await GetById(query.id)

    return {
        props: {
            worker: worker.items[0]
        }
    }
}