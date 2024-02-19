// @ts-nocheck
'use client'
//import { useRouter } from 'next/router' //переход по url
import  iReact, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerUserEditAuth, ServerUserEditVisit, ServerUserEditRole} from "@/component/function/url_api";
import React from "react";

export default function UserForm ({user, specialist, research, role}) {
    //const router = useRouter() //для перехода к пользователю

    let [form, setForm] = useState({...user, password: ''})

    useEffect(() => {
        (async () => {
            //console.log(form)
        })()
    }, [form])

    const onChangeText = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onAdd = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,
            login: form.login,
            password: form.password,

        }

        let result = await ServerUserEditAuth(arFields)
        if (result) setView(true)
    }

    const Form = () => {
        return <>
            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Вход в систему</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">

                    <div className="mb-3 row">
                        <div className="col-6">
                            <label htmlFor="last_name" className="col-form-label">Логин</label>
                            <input type="text" className="form-control" id="login"
                                   value={form.login ? form.login : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="first_name" className="col-form-label">Пароль</label>
                            <input type="text" className="form-control" id="password"
                                   value={form.password ? form.password : ''} onChange={onChangeText}/>
                        </div>
                    </div>


                </div>
            </div>

            <div className="mb-3" style={{float: 'right', marginTop: '20px'}}>
                <button type="submit" className="btn btn-success" onClick={onAdd}>Сохранить</button>
            </div>

        </>
    }

    return <>
        {Form()}
    </>
}

function formDate(oldDate) {
    if (!oldDate) return null

    let date = new Date(oldDate)
    let month = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")
    let day = `${date.getDate()}`
    if (date.getDate() < 10)
        day = `0${date.getDate()}`
    return (date.getFullYear() + "-" + month[date.getMonth()] + "-" + day)
}