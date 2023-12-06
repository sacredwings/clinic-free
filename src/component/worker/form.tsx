'use client'
//import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {interfaceUserAccess} from "@/component/function/url_api_type";
import {ServerUserEditAccess} from "@/component/function/url_api";
import FormSpecialistRadio from "@/component/worker/formSpecialistRadio";

export default function UserForm ({worker, account}) {
    //const router = useRouter() //для перехода к пользователю

    let [form, setForm] = useState(worker)

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

    const onSaveAccess = async (e) => {
        e.preventDefault() // Stop form submit

        let url = '/user/editAccess'

        console.log(form)
        let arFields = {
            id: form._id,
            specialist_ids: form.specialist_ids,
            research_ids: form.research_ids
        }

        let result = await ServerUserEditAccess(arFields)
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

    const OnChangeCheckOne = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: !prev[name]
        }))
    }

    const FormCheckSpecialist = (specialist) => {
        return <>
            <div className="mb-3 form-check">
                <div>
                    {specialist.map((item, i)=>{
                        return <div className="card">
                            <div className="card-body">
                                This is some text within a card body.
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    }
    const FormCheckSpecialistasdasd = (specialist) => {
        return specialist.map((item, i)=>{
            return <div key={i} className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <FormSpecialistRadio workerId={worker._id} specialistId={item._id}/>
                </div>
            </div>
        })
    }

    const FormCheckResearch = () => {
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

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Основное</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    <form onSubmit={onSaveAccess}>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label htmlFor="last_name" className="col-form-label">Фамилия</label>
                                <input type="text" className="form-control" id="last_name" value={form._user_id.last_name ? form._user_id.last_name : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="first_name" className="col-form-label">Имя</label>
                                <input type="text" className="form-control" id="first_name" value={form._user_id.first_name ? form._user_id.first_name : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="patronymic_name" className="col-form-label">Отчество</label>
                                <input type="text" className="form-control" id="patronymic_name" value={form._user_id.patronymic_name ? form._user_id.patronymic_name : ''} onChange={onChangeText}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="man" className="col-form-label">Пол</label>
                            <select className="form-select" id="man" aria-label="" value={form._user_id.man} onChange={onChangeText}>
                                <option value="1" defaultValue="1">Мужской</option>
                                <option value="0">Женский</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                            <input type="date" className="form-control" id="date_birth" value={form._user_id.date_birth ? new Date(form._user_id.date_birth).toISOString().substring(0, 10) : ''} onChange={onChangeText}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="col-form-label">Телефон</label>
                            <input type="text" className="form-control" id="phone" value={form._user_id.phone ? form._user_id.phone : ''} onChange={onChangeText}/>
                        </div>

                        <div className="mb-3" style={{float: 'right'}}>
                            <button type="submit" className="btn btn-success">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Дополнительно</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    <form onSubmit={onSaveAccess}>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label htmlFor="subdivision" className="col-form-label">Подразделение</label>
                                <input type="text" className="form-control" id="subdivision" value={form.subdivision ? form.subdivision : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="profession" className="col-form-label">Профессия</label>
                                <input type="text" className="form-control" id="profession" value={form.profession ? form.profession : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="employment_date" className="col-form-label">Дата приема на работу</label>
                                <input type="date" className="form-control" id="employment_date" value={form.employment_date ? form.employment_date : ''} onChange={onChangeText}/>
                            </div>
                        </div>

                        <div className="mb-3" style={{float: 'right'}}>
                            <button type="submit" className="btn btn-success">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Специалисты</b></legend>
                </div>
            </div>

            {FormCheckSpecialistasdasd(form._specialist_ids)}

        </>



    }

    return <>
        {Form()}
    </>
}