// @ts-nocheck
'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerContractEdit, ServerOrgAdd} from "@/component/function/url_api";

export default function ContractAdd ({}) {

    const formDefault = {
        name: ''
    }

    let [view, setView] = useState(false)
    let [form, setForm] = useState(formDefault)

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
            name: form.name
        }

        setView(true)
        await ServerOrgAdd(arFields)
    }

    const View = () => {
        return <>
            <div className="alert alert-success" role="alert">
                <p>Организация <b>{form.name}</b> добавлена</p>
            </div>

            <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                setView(false)
                setForm(formDefault)
            }}>+ Добавить новую</button>
        </>
    }

    const Form = () => {
        return <>
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <div className="mb-3 row">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Наименование</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="name" value={form.name} onChange={onChangeText}/></div>
                        </div>

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