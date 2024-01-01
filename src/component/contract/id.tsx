'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerContractEdit} from "@/component/function/url_api";

export default function ContractId ({contract}) {

    let [edit, setEdit] = useState(false)
    let [form, setForm] = useState(contract)

    useEffect(() => {
        console.log(form)
    }, [form])

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onFormSubmit = async (e) => {
        if (e)
            e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,
            name: form.name,
            date_from: form.date_from,
            date_to: form.date_to,
            price_ultrasound: form.price_ultrasound,
            price_mammography: form.price_mammography,
            price_xray: form.price_xray,
            price: form.price
        }

        await ServerContractEdit(arFields)

        setEdit(!edit)
    }

    const View = () => {
        return <h1>Договор: {(form) ? form.name : null} <button type="button" className="btn btn-outline-secondary" onClick={()=>setEdit(!edit)}><i className="far fa-edit"></i></button></h1>
    }

    const Form = () => {
        return <>
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <h2>Общее</h2>
                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="name" value={form.name} onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="date_from" className="col-sm-2 col-form-label">C</label>
                            <div className="col-sm-10"><input type="date" className="form-control" id="date_from" value={form.date_from ? new Date(form.date_from).toISOString().substring(0, 10) : ''} onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="date_to" className="col-sm-2 col-form-label">До</label>
                            <div className="col-sm-10"><input type="date" className="form-control" id="date_to" value={form.date_to ? new Date(form.date_to).toISOString().substring(0, 10) : ''} onChange={onChangeText}/></div>
                        </div>

                        <hr/>
                        <h2>Цены</h2>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">УЗИ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_ultrasound" value={form.price_ultrasound} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">ММГ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_mammography" value={form.price_mammography} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">ФЛГ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_xray" value={form.price_xray} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price" className="col-sm-2 col-form-label">За человека</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price" value={form.price} onChange={onChangeText}/></div>
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

    return <>
        {edit ? Form() : View()}
    </>
}