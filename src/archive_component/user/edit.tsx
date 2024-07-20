// @ts-nocheck
'use client'
//import { useRouter } from 'next/router' //переход по url
import  iReact, {useState, useEffect} from 'react'
import axios from "axios"
import {
    ServerUserEditAuth,
    ServerUserEditVisit,
    ServerUserEditRole,
    ServerUserEdit
} from "@/component/function/url_api";
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

    const onSave = async (e) => {
        e.preventDefault() // Stop form submit

        let url = '/user/editAccess'

        let arFields = {
            id: form._id,

            first_name: form.first_name,
            last_name: form.last_name,
            second_name: form.second_name,

            man: form.man,
            date_birth: form.date_birth,

            phone: form.phone,
        }

        let result = await ServerUserEdit(arFields)
    }

    const Form = () => {
        return <>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Основное</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">

                    <div className="mb-0">
                        <legend>Основное</legend>
                        <hr/>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-4">
                            <label htmlFor="last_name" className="col-form-label">Фамилия</label>
                            <input type="text" className="form-control" id="last_name"
                                   value={form.last_name ? form.last_name : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="first_name" className="col-form-label">Имя</label>
                            <input type="text" className="form-control" id="first_name"
                                   value={form.first_name ? form.first_name : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="second_name" className="col-form-label">Отчество</label>
                            <input type="text" className="form-control" id="second_name"
                                   value={form.second_name ? form.second_name : ''} onChange={onChangeText}/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="man" className="col-form-label">Пол</label>
                        <select className="form-select" id="man" aria-label="" value={form.man}
                                onChange={onChangeText}>
                            <option value="1" defaultValue="1">Мужской</option>
                            <option value="0">Женский</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                        <input type="date" className="form-control" id="date_birth"
                               value={form.date_birth ? new Date(form.date_birth).toISOString().substring(0, 10) : ''}
                               onChange={onChangeText}/>
                    </div>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Дополнительно</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    <label htmlFor="phone" className="col-form-label">Телефон</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="phone-label">+7</span>
                        <input type="text" className="form-control" id="phone" value={form.phone ? form.phone : ''}
                               onChange={onChangeText}/>
                    </div>

                </div>
            </div>

            <div className="mb-3" style={{float: 'right', marginTop: '20px'}}>
                <button type="submit" className="btn btn-success" onClick={onSave}>Сохранить</button>
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
