// @ts-nocheck
'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerContractAdd, ServerContractEdit, ServerOrgAdd} from "@/component/function/url_api";

export default function ContractAdd ({clinic_id, org, contractType}) {

    const formDefault = {
        title: '',
        date_from: '',
        date_to: '',

        price_ultrasound: '',
        price_mammography: '',
        price_xray: '',

        price_pcr: '',
        price_hti: '',
        price_brucellosis: '',

        price_worker_all: '',
        price_worker_man: '',
        price_worker_woman: '',
    }

    let [view, setView] = useState(false)
    let [form, setForm] = useState(formDefault)
    let [contractTypeIds, setContractTypeIds] = useState([]) //для формы
    let [contractTypeList, setContractTypeList] = useState(contractType)
    let [priceType, setPriceType] = useState('0')

    useEffect(() => {
        //console.log(form)
    }, [form])

    const onChangeText = (e) => {
        let name = e.target.id;
        let value = e.target.value;

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onChangeType = (e) => {
        setPriceType(e.target.value)
    }

    const onFormSubmit = async (e) => {
        if (e)
            e.preventDefault() // Stop form submit

        let arFields = {
            clinic_id: clinic_id,
            org_id: org._id,
            contract_type_ids: null,

            title: form.title,
            date_from: form.date_from,
            date_to: form.date_to,

            price_ultrasound: form.price_ultrasound,
            price_mammography: form.price_mammography,
            price_xray: form.price_xray,

            price_pcr: form.price_pcr,
            price_hti: form.price_hti,
            price_brucellosis: form.price_brucellosis,

            price_worker_all: form.price_worker_all,
            price_worker_man: form.price_worker_man,
            price_worker_woman: form.price_worker_woman,
        }

        if (contractTypeIds && contractTypeIds.length) arFields.contract_type_ids = contractTypeIds

        setForm(formDefault)
        setContractTypeIds([])
        setContractTypeList([])
        setView(true)

        let result = await ServerContractAdd(arFields)
        if (result) setView(true)
    }

    const View = () => {
        return <>
            <div className="alert alert-success" role="alert">
                <p>Договор <b>{form.title}</b> добавлена</p>
            </div>

            <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                setView(false)
                setForm(formDefault)
            }}>+ Добавить новый</button>
        </>
    }

    const OnChangeCheck = (id) => {
        let list = []
        let newListCheck = contractTypeList.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            if (element.checked) list.push(element._id)
            return element
        })
        setContractTypeList(newListCheck)
        setContractTypeIds(list)
    }

    const FormCheckContractType = () => {
        return <>
            <br/>
            <h6 className="card-title text-center">Типы договоров</h6>
            <br/>

            {contractTypeList.map((item, i)=>{
                return <div className="form-check" key={i}>
                    <input className="form-check-input" type="checkbox" checked={(item.checked) ? true : false} onChange={()=>{OnChangeCheck(item._id)}}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item.title}
                    </label>
                </div>
            })}
        </>
    }

    const Form = () => {
        return <>
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <h2>Общее</h2>
                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Наименование</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="title"
                                                              value={form.title} onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="date_from" className="col-sm-2 col-form-label">C</label>
                            <div className="col-sm-10"><input type="date" className="form-control" id="date_from"
                                                              value={form.date_from ? new Date(form.date_from).toISOString().substring(0, 10) : ''}
                                                              onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="date_to" className="col-sm-2 col-form-label">До</label>
                            <div className="col-sm-10"><input type="date" className="form-control" id="date_to"
                                                              value={form.date_to ? new Date(form.date_to).toISOString().substring(0, 10) : ''}
                                                              onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-12">
                                {FormCheckContractType()}
                            </div>
                        </div>

                        <hr/>
                        <h2>Цены</h2>

                        <div className="mb-3 row">
                            <label htmlFor="price_ultrasound" className="col-sm-2 col-form-label">УЗИ</label>
                            <div className="col-sm-10"><input type="number" className="form-control"
                                                              id="price_ultrasound" value={form.price_ultrasound}
                                                              onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price_mammography" className="col-sm-2 col-form-label">ММГ</label>
                            <div className="col-sm-10"><input type="number" className="form-control"
                                                              id="price_mammography" value={form.price_mammography}
                                                              onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price_xray" className="col-sm-2 col-form-label">ФЛГ</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="price_xray"
                                                              value={form.price_xray} onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="price_pcr" className="col-sm-2 col-form-label">ПЦР</label>
                            <div className="col-sm-10"><input type="number" className="form-control"
                                                              id="price_pcr" value={form.price_pcr}
                                                              onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price_hti" className="col-sm-2 col-form-label">ХТИ</label>
                            <div className="col-sm-10"><input type="number" className="form-control"
                                                              id="price_hti" value={form.price_hti}
                                                              onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="price_brucellosis" className="col-sm-2 col-form-label">Бруцеллез</label>
                            <div className="col-sm-10"><input type="number" className="form-control"
                                                              id="price_brucellosis"
                                                              value={form.price_brucellosis} onChange={onChangeText}/>
                            </div>
                        </div>

                        <hr/>
                        <h2>Расчет</h2>
                        <div className="mb-3 row">
                            <select className="form-select" id="man" aria-label="" value={priceType}
                                    onChange={onChangeType}>
                                <option value="0" defaultValue="1">По вредным факторам</option>
                                <option value="1">За человека</option>
                                <option value="2">С разделением по полу</option>
                            </select>
                        </div>

                        {priceType === '1' ? <div className="mb-3 row">
                            <label htmlFor="price_worker_all" className="col-sm-2 col-form-label">Работник</label>
                            <div className="col-sm-10"><input type="number" className="form-control"
                                                              id="price_worker_all"
                                                              value={form.price_worker_all} onChange={onChangeText}/>
                            </div>
                        </div> : null}

                        {priceType === '2' ? <>
                            <div className="mb-3 row">
                                <label htmlFor="price_worker_man" className="col-sm-2 col-form-label">Мужчина</label>
                                <div className="col-sm-10"><input type="number" className="form-control"
                                                                  id="price_worker_man"
                                                                  value={form.price_worker_man} onChange={onChangeText}/>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="price_worker_woman" className="col-sm-2 col-form-label">Женщина</label>
                                <div className="col-sm-10"><input type="number" className="form-control"
                                                                  id="price_worker_woman"
                                                                  value={form.price_worker_woman} onChange={onChangeText}/>
                                </div>
                            </div>
                        </> : null}

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-sm">
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    }

    return <>
        {!view ? Form() : View()}
    </>
}