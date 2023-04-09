import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from "axios"
import TemplatesMain from "../../../../app/components/template/main"

export default function ({id}) {
    let [edit, setEdit] = useState(false)
    let [list, setList] = useState([])
    let [request, setRequest] = useState({
        items: [],
        step: 10000,
    })
    let [contract, setContract] = useState(null)

    useEffect(() => {
        (async () => {
            await Get(true)
            await ContractGetById()
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
    const ContractGetById = async () => {
        const url = '/api/contract/getById'

        let fields = {
            params: {
                ids: id
            }
        }
        let result = await axios.get(url, fields)
        setContract(result.data.response[0])
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
        return <>
            Рабочих нет
        </>
    }

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setContract(prev => ({
            ...prev, [name]: value
        }))
    }
    const onFormSubmit = async (e) => {
        if (e)
            e.preventDefault() // Stop form submit

        const url = `/api/contract/edit`
        let arFields = {
            id: contract._id,
            name: contract.name,
            //date_from: contract.date_from,
            //date_to: contract.date_to,
            price_ultrasound: contract.price_ultrasound,
            price_mammography: contract.price_mammography,
            price_xray: contract.price_xray,
            price: contract.price
        }

        let result = await axios.post(url, arFields)

        setEdit(!edit)
    }
    const ContractView = () => {
        return <h1>Договор: {(contract) ? contract.name : null} <button type="button" className="btn btn-outline-secondary" onClick={()=>setEdit(!edit)}><i className="far fa-edit"></i></button></h1>
    }
    const ContractEdit = () => {
        return <>
            <h1>Редактор договора</h1>
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <h2>Общее</h2>
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="name" value={contract.name} onChange={onChangeText}/></div>
                        </div>

                        <hr/>
                        <h2>Цены</h2>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">УЗИ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_ultrasound" value={contract.price_ultrasound} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">ММГ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_mammography" value={contract.price_mammography} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">ФЛГ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_xray" value={contract.price_xray} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">За человека</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price" value={contract.price} onChange={onChangeText}/></div>
                        </div>

                        <div className="">
                            <button type="button" className="btn btn-secondary btn-sm" onClick={()=>setEdit(!edit)}>Отмена</button>&nbsp;
                            <button type="submit" className="btn btn-primary btn-sm">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    }

    return <TemplatesMain title={'Главная страница'}>
        {(edit) ? ContractEdit() : ContractView()}
        <p><Link href={`/contract/${id}/worker/add`} className="btn btn-success btn-sm" role="button">Добавить работника</Link></p>
        <p>Рабочие: </p>
        {(list.length) ? List(list) : NoList()}
    </TemplatesMain>
}

export async function getServerSideProps ({query, req}) {
    return {
        props: {
            id: query.id
        }
    }
}