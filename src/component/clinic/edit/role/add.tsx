// @ts-nocheck
'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerRoleAdd} from "@/component/function/url_api";
import RadioButtonGroup from "@/component/element/RadioButtonGroup";

export default function Add ({clinic_id, listPermission}) {

    const formDefault = {
        title: '',
        description: '',

        permission_ids: []
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

        let arFields = {...formDefault, clinic_id: clinic_id}

        let result = await ServerRoleAdd(arFields)
    }

    const Form = () => {
        return <>
            <form onSubmit={onFormSubmit} className="p-3">
                <div className="card m-3">

                    <div className="card-body">

                        <h2>Основное</h2>
                        <div className="mb-3 row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Название</label>
                            <div className="col-sm-10"><input type="text" className="form-control" id="title"
                                                              value={form.title} onChange={onChangeText}/></div>
                        </div>

                        <div className="mb-3 row">
                            <label htmlFor="description" className="form-label">Описание</label>
                            <textarea className="form-control" id="description" rows="3" value={form.description}
                                      onChange={onChangeText}></textarea>
                        </div>

                        <RadioButtonGroup list={listPermission.items}/>

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
