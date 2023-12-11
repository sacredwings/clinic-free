'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerOrgEdit} from "@/component/function/url_api";

export default function OrgId ({org}) {

    let [edit, setEdit] = useState(false)
    let [form, setForm] = useState(org)

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
            name: form.name
        }

        await ServerOrgEdit(arFields)

        setEdit(!edit)
    }

    const View = () => {
        return <h1>Организация: {(form) ? form.name : null} <button type="button" className="btn btn-outline-secondary" onClick={()=>setEdit(!edit)}><i className="far fa-edit"></i></button></h1>
    }

    const Form = () => {
        return <>
            <h1>Редактор организации</h1>
            <div className="shadow-sm p-3 mb-3 bg-white rounded">
                <form onSubmit={onFormSubmit}>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Наименование</label>
                        <input type="text" className="form-control" id="name"
                               onChange={onChangeText} value={form.name}/>
                    </div>

                    {/*
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Полное наименование</label>
                        <input type="text" className="form-control" id="full_name"
                               onChange={onChangeText} value={form.full_name}/>
                    </div>*/}

                    <div className="">
                        <button type="button" className="btn btn-secondary btn-sm" onClick={()=>setEdit(!edit)}>Отмена</button>&nbsp;
                        <button type="submit" className="btn btn-primary btn-sm">
                            Сохранить
                        </button>
                    </div>

                </form>
            </div>
        </>
    }

    return <>
        {edit ? Form() : View()}
    </>
}