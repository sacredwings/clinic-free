// @ts-nocheck
'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerClinicAdd, ServerContractAdd, ServerContractEdit, ServerOrgAdd} from "@/component/function/url_api";

export default function Add ({}) {

    const formDefault = {
        title: '',
        description: '',
        inn: ''
    }
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
            title: form.title,
            description: form.description,
            inn: form.inn,
        }

        let result = await ServerClinicAdd(arFields)
    }

    const Form = () => {
        return <>
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <h2>Основное</h2>
                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Наименование</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="title"
                                                              value={form.title} onChange={onChangeText}/></div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="description" className="col-sm-2 col-form-label">Описание</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="description"
                                                              value={form.description} onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="inn" className="col-sm-2 col-form-label">ИНН</label>
                            <div className="col-sm-10"><input type="number" className="form-control" id="inn"
                                                              value={form.inn} onChange={onChangeText}/></div>
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

    return Form()
}
