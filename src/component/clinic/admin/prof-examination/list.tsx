// @ts-nocheck
'use client'
import React, {useEffect, useState} from "react";
import Access from "@/component/function/access";
import Style from "./style.module.sass";
import Element from "./element";
import Add from "./add";
import Link from "next/link";
import ProfExaminationElement from "@/component/clinic/admin/prof-examination/element";
import {useRouter} from "next/navigation";

export default function ProfExaminationList ({list, clinic_id, org_id, contract_id, searchParams}) {
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
                return <ProfExaminationElement key={i} element={item} clinic_id={clinic_id}/>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Проф. осмотров нет
        </div>
    }

    useEffect(() => {
        setClientSearchParams('')
        //router.push(`?order=${selectedOrder}&order_by=${selectedOrderBy}`)
        router.push(`?${new URLSearchParams({...searchParams, order: selectedOrder, order_by: selectedOrderBy})}`)
    },[selectedOrder, selectedOrderBy])

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <form className="row">
                        <div className="">
                            <label htmlFor="search" className="form-label">Поиск</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder=""
                                       aria-label="Recipient's username" aria-describedby="button-search"
                                       onChange={onChangeText} value={clientSearchParams}/>
                                <Link className="btn btn-outline-secondary" type="button" id="button-search"
                                      href={`?q=${clientSearchParams}`}>Найти</Link>
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
                                    <option value="last_name">Фамилия</option>
                                    <option value="first_name">Имя</option>
                                    <option value="second_name">Отчество</option>
                                </select>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            <br/>

            {(list.length) ? List() : NoList()}
        </>
    )

}
