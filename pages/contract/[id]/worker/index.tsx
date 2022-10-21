import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../../../components/template/main"

export default function ({id}) {
    let [list, setList] = useState([])
    let [request, setRequest] = useState({
        items: [],
        step: 200,
    })
    let [org, setOrg] = useState(null)

    useEffect(() => {
        (async () => {
            await Get(true)
            //await OrgGetById()
        })()
    }, [])

    //список договоров
    const Get = async (start) => {
        const url = '/api/worker/get'
        let fields = {
            params: {
                contract_id: id,
                offset: request.items.length,
                count: request.step
            }
        }
        let result = await axios.get(url, fields)
        setList(prev => (start ? result.data.response.items : [...prev, ...result.data.response.items]))
    }

    //название организации
    const OrgGetById = async () => {
        const url = '/api/org/getById'

        let fields = {
            params: {
                ids: id
            }
        }
        let result = await axios.get(url, fields)
        setOrg(result.data.response)
    }

    const ListCode = (arList) => {
        return arList.map((list, i) => {
            return <span className="badge text-bg-primary" key={i}>{list}</span>
        })
    }
    const ListPrint = (worker_id) => {
        return <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-print"></i>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a href={`/contract/${worker_id}/worker/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. мед. осмотра</a>
                        <a href={`/contract/${worker_id}/worker/pdf/card`} className="dropdown-item" target="_blank">Карта</a>
                        <a href={`/contract/${worker_id}/worker/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</a>
                    </li>
                </ul>
            </div>

        </div>

    }

    const List = (arList) => {
        return <ol className="list-group list-group-numbered">
            {arList.map((list, i) => {
                //let href = `/contract/${id}/worker`
                return <li className="list-group-item d-flex justify-content-between align-items-start" key={i}>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{list._user_id.first_name} {list._user_id.last_name} {list._user_id.patronymic_name}</div>
                        {ListCode(list.hf_code)}
                        <br/>
                        <Link href={`/worker/${list._id}`}>
                            <a>Подробно...</a>
                        </Link>
                    </div>
                    {ListPrint(list._id)}
                </li>
            })}
        </ol>
    }

    return <TemplatesMain title={'Главная страница'}>
        <h1>{(org) ? org.name : null}</h1>
        <p><Link href={`/contract/${id}/worker/add`}><a className="btn btn-success btn-sm" role="button">Добавить работника</a></Link></p>
        <p>Рабочие: </p>
        {(list.length) ? List(list) : null}
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}