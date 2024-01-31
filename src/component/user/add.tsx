// @ts-nocheck
'use client'
//import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {interfaceUserAccess} from "@/component/function/url_api_type";
import {ServerUserAdd, ServerUserEditAccess} from "@/component/function/url_api";

export default function UserForm ({specialist, research}) {
    //const router = useRouter() //для перехода к пользователю

    const OnCheckInit = (list, formList) => {
        if (!list) return []
        if (!formList || !formList.length) return list

        let newList = list.map((element, i) => {
            element.checked = false

            if (!formList) return element

            for (let formElement of formList) {
                if (element._id === formElement) element.checked = true
            }

            return element
        })

        return newList
    }

    const formDefault = {
        login: '',
        password: '',

        first_name: '',
        last_name: '',
        second_name: '',

        man: '1',
        date_birth: null,
        phone: null,

        specialist_ids: null,
        research_ids: null
    }

    let [view, setView] = useState(false)
    let [form, setForm] = useState(formDefault)
    let [checkSpecialist, setCheckSpecialist] = useState(()=>OnCheckInit(specialist, []))
    let [checkResearch, setCheckResearch] = useState(()=>OnCheckInit(research, []))


    useEffect(() => {
        (async () => {
            console.log(form)
        })()
    }, [form])

    const onChangeText = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    /*
    const Default = () => {
        setForm(prev => (formDefault))
    }*/

    const onAdd = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {

            login: form.login,
            password: form.password,

            first_name: form.first_name,
            last_name: form.last_name,
            second_name: form.second_name,

            man: form.man,
            date_birth: form.date_birth,
            phone: form.phone,
            specialist_ids: form.specialist_ids,
            research_ids: form.research_ids
        }

        let result = await ServerUserAdd(arFields)
        if (result) setView(true)
    }

    const OnChangeCheckSpecialist = (id) => {
        let newIds = []
        let newCheckList = checkSpecialist.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            //заполнение чеками
            if (element.checked) newIds.push(element._id)

            return element
        })

        setForm(prev => ({
            ...prev, specialist_ids: (newIds.length) ? newIds : null
        }))
        setCheckSpecialist(newCheckList)
    }
    const OnChangeCheckResearch = (id) => {
        let newIds = []
        let newCheckList = checkResearch.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            //заполнение чеками
            if (element.checked) newIds.push(element._id)

            return element
        })

        setForm(prev => ({
            ...prev, research_ids: (newIds.length) ? newIds : null
        }))
        setCheckResearch(newCheckList)
    }

    const View = () => {
        return <>
            <div className="alert alert-success" role="alert">
                <p>Пользователь добавлен</p>
            </div>

            <button type="button" className="btn btn-outline-secondary" onClick={()=>{
                setView(false)
                setForm(formDefault)
            }}>+ Добавить нового</button>
        </>
    }

    const FormCheckSpecialist = () => {
        if (!checkSpecialist || !checkSpecialist.length) return null
        return <>
            <div className="mb-3 form-check">
                <div>
                    {checkSpecialist.map((item, i)=>{
                        return <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" checked={(item.checked) ? true : false} onChange={()=>{OnChangeCheckSpecialist(item._id)}}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {item.name}
                            </label>
                        </div>
                    })}
                </div>
            </div>
        </>
    }
    const FormCheckResearch = () => {
        if (!checkResearch || !checkResearch.length) return null
        return <>
            <div className="mb-3 form-check">
                <div>
                    {checkResearch.map((item, i)=>{
                        return <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" checked={(item.checked) ? true : false} onChange={()=>{OnChangeCheckResearch(item._id)}}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                {item.name}
                            </label>
                        </div>
                    })}
                </div>
            </div>
        </>
    }
    const Form = () => {
        return <>
            <form onSubmit={onAdd}>
                <div className="card">
                    <div className="card-body">

                        <div className="mb-0">
                            <legend>Авторизация</legend>
                            <hr/>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-6">
                                <label htmlFor="last_name" className="col-form-label">Логин</label>
                                <input type="text" className="form-control" id="login" value={form.login ? form.login : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="first_name" className="col-form-label">Пароль</label>
                                <input type="text" className="form-control" id="password" value={form.password ? form.password : ''} onChange={onChangeText}/>
                            </div>
                        </div>

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
                                <input type="text" className="form-control" id="last_name" value={form.last_name ? form.last_name : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="first_name" className="col-form-label">Имя</label>
                                <input type="text" className="form-control" id="first_name" value={form.first_name ? form.first_name : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="second_name" className="col-form-label">Отчество</label>
                                <input type="text" className="form-control" id="second_name" value={form.second_name ? form.second_name : ''} onChange={onChangeText}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="man" className="col-form-label">Пол</label>
                            <select className="form-select" id="man" aria-label="" value={form.man} onChange={onChangeText}>
                                <option value="1" defaultValue="1">Мужской</option>
                                <option value="0">Женский</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                            <input type="date" className="form-control" id="date_birth" value={form.date_birth ? new Date(form.date_birth).toISOString().substring(0, 10) : ''} onChange={onChangeText}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="col-form-label">Телефон</label>
                            <input type="text" className="form-control" id="phone" value={form.phone ? form.phone : ''} onChange={onChangeText}/>
                        </div>

                    </div>
                </div>

                <div className="card" style={{marginTop: '20px'}}>
                    <div className="card-body">

                        <div className="mb-0">
                            <legend>Доступ к проф. осмотру</legend>
                            <hr/>
                        </div>
                        <div className="mb-3">
                            <p className={'text-center'}>Специалисты</p>
                            {FormCheckSpecialist()}
                        </div>
                        <div className="mb-3">
                            <p className={'text-center'}>Исследования</p>
                            {FormCheckResearch()}
                        </div>

                    </div>
                </div>

                <div style={{marginTop: '20px'}}>


                    <div className="mb-3" style={{float: 'right'}}>
                        <button type="submit" className="btn btn-success">Добавить</button>
                    </div>


                </div>

            </form>

        </>

    }

    return <>
        {!view ? Form() : View()}
    </>
}

function formDate (oldDate) {
    if (!oldDate) return null

    let date = new Date(oldDate)
    let month=new Array("01","02","03","04","05","06","07","08","09","10","11","12")
    let day=`${date.getDate()}`
    if (date.getDate()<10)
        day=`0${date.getDate()}`
    return (date.getFullYear()+"-"+month[date.getMonth()]+"-"+day)
}