// @ts-nocheck
'use client'
import Link from 'next/link'
import OrgElement from './element'
import {useState, useEffect} from 'react'
import {useRouter} from "next/navigation";

export default function OrgList ({list, clinic_id}) {
    const router = useRouter()

    let [clientSearchParams, setClientSearchParams] = useState('')

    const [selectedOrder, setSelectedOrder] = useState('-1');
    const [selectedOrderBy, setSelectedOrderBy] = useState('_id');

    const onChangeText = (e) => {
        setClientSearchParams(e.target.value)
    }

    const List = () => {
        return <div className="list-group">
            {list.map((item, i) => {
                return <OrgElement key={i} element={item} clinic_id={clinic_id}/>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Организаций нет
        </div>
    }

    useEffect(() => {
        setClientSearchParams('')
        router.push(`?order=${selectedOrder}&order_by=${selectedOrderBy}`)
    },[selectedOrder, selectedOrderBy])

    return (
        <>
            <h1>Организации <Link type="button" className="btn btn-outline-success"
                                  href={`/clinic/${clinic_id}/admin/org/add`}> + </Link></h1>

            <div className="card">
                <div className="card-body">
                    <form className="row">
                        <div className="">
                            <label htmlFor="search" className="form-label">Поиск</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder=""
                                       aria-label="Recipient's username" aria-describedby="button-search" onChange={onChangeText} value={clientSearchParams}/>
                                <Link className="btn btn-outline-secondary" type="button" id="button-search" href={`?q=${clientSearchParams}`}>Найти</Link>
                            </div>
                        </div>
                        <div className=" row">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Фильтр</label>

                            <div className="col-auto">
                                <select className="form-select" value={selectedOrder}
                                        onChange={e => setSelectedOrder(e.target.value)}
                                        multiple={false}>
                                    <option value="-1">С конца</option>
                                    <option value="1">С начала</option>
                                </select>
                            </div>
                            <div className="col-auto">
                                <select className="form-select" value={selectedOrderBy}
                                        onChange={e => setSelectedOrderBy(e.target.value)} multiple={false}>
                                    <option value="_id">ID</option>
                                    <option value="title">Название</option>
                                </select>
                            </div>

                        </div>
                    </form>
                </div>
            </div>



            {(list.length) ? List() : NoList()}
        </>
    )
}
