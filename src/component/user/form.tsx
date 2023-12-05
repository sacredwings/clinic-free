'use client'
import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {interfaceUserAccess} from "@/component/function/url_api_type";
import {ServerUserEditAccess} from "@/component/function/url_api";

export default function ({user, specialist, research}) {
    const router = useRouter() //для перехода к пользователю

    const OnCheck = (list, formList) => {
        let checkSpecialist = list.map((element, i) => {
            element.checked = false
            for (let formElement of formList) {
                if (element._id === formElement._id) element.checked = true
            }

            return element
        })
    }

    const formDefault = {
        first_name: '',
        last_name: '',
        second_name: '',

        man: '1',
        date_birth: null,
        phone: '',

        specialist_ids: null,
        research_ids: null
    }

    let [form, setForm] = useState(formDefault)
    let [checkSpecialist, setCheckSpecialist] = useState(OnCheck(specialist, user.specialist_ids))
    let [checkResearch, setCheckResearch] = useState(OnCheck(research, user.research_ids))

    useEffect(() => {
        (async () => {

        })()
    }, [])

    const onChangeText = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const Default = () => {
        setForm(prev => (formDefault))
    }

    const onSaveAccess = async (e) => {
        e.preventDefault() // Stop form submit

        let url = '/user/editAccess'

        let arFields = {
            id: form._id,
            specialist_ids: form.specialist_ids,
            research_ids: form.research_ids
        }

        let result = await ServerUserEditAccess(arFields)
    }

    const OnChangeCheck = (id, list, Set) => {
        let newCheckList = contractTypeList.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            if (element.checked) list.push(element._id)
            return element
        })

        //Set(newListCheck)
    }

    const OnChangeCheckOne = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: !prev[name]
        }))
    }

    const FormCheckSpecialist = () => {
        return <>
            <div className="mb-3 form-check">
                <div>
                    {user.specialist_ids.map((item, i)=>{
                        return <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" checked={(item.checked) ? true : false} onChange={()=>{OnChangeCheck(item._id)}}/>
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
        return <form onSubmit={onSaveAccess} className="p-3">
            {FormCheckSpecialist()}
        </form>

    }

    const Form1 = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-body">

                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <label htmlFor="last_name" className="col-form-label">Фамилия</label>
                            <input type="text" className="form-control" id="last_name" value={form.last_name ? form.last_name : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="first_name" className="col-form-label">Имя</label>
                            <input type="text" className="form-control" id="first_name" value={form.first_name ? form.first_name : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="patronymic_name" className="col-form-label">Отчество</label>
                            <input type="text" className="form-control" id="patronymic_name" value={form.patronymic_name ? form.patronymic_name : ''} onChange={onChangeText}/>
                        </div>
                    </div>

                    <div className="row g-4 align-items-center">
                        <div className="col-3">
                            <label htmlFor="man" className="col-form-label">Пол</label>
                            <select className="form-select" id="man" aria-label="" value={form.man} onChange={onChangeText}>
                                <option value="1" defaultValue="1">Мужской</option>
                                <option value="0">Женский</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                            <input type="date" className="form-control" id="date_birth" value={form.date_birth ? form.date_birth : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="oms_policy_number" className="col-form-label">Номер полиса ОМС</label>
                            <input type="text" className="form-control" id="oms_policy_number" value={form.oms_policy_number ? form.oms_policy_number : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="snils" className="col-form-label">СНИЛС</label>
                            <input type="text" className="form-control" id="snils" value={form.snils ? form.snils : ''} onChange={onChangeText}/>
                        </div>
                    </div>


                    <div className="row g-3 align-items-center">
                        <div className="col-12">
                            <label htmlFor="hf_code" className="col-form-label">Вредные факторы</label>
                            <input type="text" className="form-control" id="hf_code" value={form.hf_code} onChange={onChangeText}/>
                        </div>
                    </div>

                    <br/>
                    <h6 className="card-title text-center">Дополнительные услуги</h6>
                    <br/>
                    {FormCheckContract()}

                    {!contract_id && !form.contract_id ? FormCheckContractType() : null}

                    <br/>
                    <h6 className="card-title text-center">Адрес</h6>
                    <br/>

                    <div className="row g-3 align-items-center">
                        <div className="col-6">
                            <label htmlFor="region" className="col-form-label">Область</label>
                            <input type="text" className="form-control" id="region" value={form.region ? form.region : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="city" className="col-form-label">Нас. пункт</label>
                            <input type="text" className="form-control" id="city" value={form.city ? form.city : ''} onChange={onChangeText}/>
                        </div>
                    </div>

                    <div className="row g-3 align-items-center">
                        <div className="col-8">
                            <label htmlFor="street" className="col-form-label">Улица</label>
                            <input type="text" className="form-control" id="street" value={form.street ? form.street : ''}  onChange={onChangeText}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="house" className="col-form-label">Дом</label>
                            <input type="text" className="form-control" id="house" value={form.house ? form.house : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="housing" className="col-form-label">Корпус</label>
                            <input type="text" className="form-control" id="housing" value={form.housing ? form.housing : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="apt" className="col-form-label">Квартира</label>
                            <input type="text" className="form-control" id="apt" value={form.apt ? form.apt : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-1">
                            <label htmlFor="building" className="col-form-label">Строение</label>
                            <input type="text" className="form-control" id="building" value={form.building ? form.building : ''} onChange={onChangeText}/>
                        </div>
                    </div>

                    <br/>
                    <h6 className="card-title text-center">Паспорт сотрудника</h6>
                    <br/>

                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <label htmlFor="passport_serial" className="col-form-label">Серия</label>
                            <input type="text" className="form-control" id="passport_serial" value={form.passport_serial ? form.passport_serial : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="passport_number" className="col-form-label">Номер</label>
                            <input type="text" className="form-control" id="passport_number" value={form.passport_number ? form.passport_number : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="passport_date" className="col-form-label">Дата выдачи</label>
                            <input type="date" className="form-control" id="passport_date" value={form.passport_date ? form.passport_date : ''} onChange={onChangeText}/>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-12">
                            <label htmlFor="passport_issued_by" className="col-form-label">Кем выдан</label>
                            <input type="text" className="form-control" id="passport_issued_by" value={form.passport_issued_by ? form.passport_issued_by : ''} onChange={onChangeText}/>
                        </div>
                    </div>

                    <br/>
                    <h6 className="card-title text-center">Контакты</h6>
                    <br/>

                    <div className="row g-3 align-items-center">
                        <div className="col-6">
                            <label htmlFor="phone" className="col-form-label">Телефон</label>
                            <input type="text" className="form-control" id="phone" value={form.phone ? form.phone : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="phone_additional" className="col-form-label">Дополнительный телефон</label>
                            <input type="text" className="form-control" id="phone_additional" value={form.phone_additional ? form.phone_additional : ''} onChange={onChangeText}/>
                        </div>
                    </div>

                    <br/>
                    <h6 className="card-title text-center">Работа (служба)</h6>
                    <br/>

                    <div className="row g-3 align-items-center">
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
                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <label htmlFor="work_place" className="col-form-label">Место службы (работы)</label>
                            <input type="text" className="form-control" id="work_place" value={form.work_place ? form.work_place : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="work_experience" className="col-form-label">Стаж (лет)</label>
                            <input type="text" className="form-control" id="work_experience" value={form.work_experience ? form.work_experience : ''} onChange={onChangeText}/>
                        </div>
                    </div>
                    <br/>

                    {worker_id ?
                        <button type="submit" className="btn btn-warning">Изменить</button>
                        :
                        <button type="submit" className="btn btn-primary">Добавить</button>
                    }

                </div>
            </div>
        </form>

    }

    return <>
        {Form()}
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