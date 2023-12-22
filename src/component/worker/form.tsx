'use client'
//import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {interfaceUserAccess} from "@/component/function/url_api_type";
import {ServerUserEditAccess} from "@/component/function/url_api";
import FormSpecialistRadio from "@/component/worker/formSpecialistRadio";
import FormResearchRadio from "@/component/worker/formResearchRadio";

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

    const Visit = (id, arr, arName) => {
        for (let item of arr) {
            if (id === item[arName]) return item
        }
        return null
    }

    const Access = (id, arr) => {
        if (!arr || !arr.length) return false
        for (let item of arr) {
            if (id === item._id) return true
        }
        return false
    }

    const FormCheckSpecialist = (specialist, specialistVisit) => {
        return specialist.map((item, i)=>{
            return <FormSpecialistRadio key={i} workerId={worker._id} specialist={item} visit={Visit(item._id, specialistVisit, 'specialist_id')} access={Access(item._id, account._specialist_ids)}/>
        })
    }

    const FormCheckResearch = (research, researchVisit) => {
        return research.map((item, i)=>{
            return <FormResearchRadio key={i} workerId={worker._id} research={item} visit={Visit(item._id, researchVisit, 'research_id')} access={Access(item._id, account._research_ids)}/>
        })
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
                                <label htmlFor="second_name" className="col-form-label">Отчество</label>
                                <input type="text" className="form-control" id="second_name" value={form._user_id.second_name ? form._user_id.second_name : ''} onChange={onChangeText}/>
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
                            <div className="col-6">
                                <label htmlFor="subdivision" className="col-form-label">Подразделение</label>
                                <input type="text" className="form-control" id="subdivision" value={form.subdivision ? form.subdivision : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="profession" className="col-form-label">Профессия</label>
                                <input type="text" className="form-control" id="profession" value={form.profession ? form.profession : ''} onChange={onChangeText}/>
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

            {FormCheckSpecialist (form._specialist_ids, form._specialist_visit_ids)}

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Исследования</b></legend>
                </div>
            </div>

            {FormCheckResearch (form._research_ids, form._research_visit_ids)}

        </>



    }

    return <>
        {Form()}
    </>
}