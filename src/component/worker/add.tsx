'use client'
import { useRouter } from 'next/navigation' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerWorkerAdd, ServerContractTypeGet} from "@/component/function/url_api";

export default function WorkerAdd ({contract}) {
    const router = useRouter() //для перехода к пользователю

    const formDefault = {
        hf_code: '1.1,2.1',

        first_name: '',
        last_name: '',
        second_name: '',

        man: '1',

        date_birth: '',

        check_ultrasound: false,
        check_mammography: false,
        check_xray: false,

        check_pcr: false,
        check_hti: false,
        check_brucellosis: false,

        //oms_policy_number: null,
        //snils: null,

        //region: null,
        //city: null,
        //street: null,
        //house: null,
        //housing: null,
        //apt: null,
        //building: null,

        //passport_serial: null,
        //passport_number: null,
        //passport_date: null,

        //passport_issued_by: null,
        phone: null,
        //phone_additional: null,

        subdivision: null,
        profession: null,
        //employment_date: null,

        //work_place: null,
        //work_experience: null,
    }

    let [view, setView] = useState(false)
    let [form, setForm] = useState(formDefault)
    let [contractTypeIds, setContractTypeIds] = useState([]) //для формы
    let [contractTypeList, setContractTypeList] = useState([])
    let [formResult, setFormResult] = useState(null)
    //const { paramsId } = useParams()

    useEffect(() => {
        (async () => {
            await GetTypeContract()

        })()
    }, [])

    useEffect(() => {
        //console.log(form)
    }, [form])

    const onChangeText = (e) => {
        let name = e.target.id
        let value = e.target.value
        if (value === '') value = null
        if ((name === 'hf_code') && (value)) value = value.replace(/\s/g, "");

        //if (typeof value === 'string') value=capitalizeFirstLetter(value)

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    /*
    const Default = (err) => {
        setForm(prev => (formDefault))
    }*/

    const onFormSubmit = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            contract_id: contract._id,
            contract_type_ids: null,
            hf_code: form.hf_code,

            first_name: form.first_name,
            last_name: form.last_name,
            second_name: form.second_name,
            man: form.man,
            date_birth: form.date_birth,

            check_ultrasound: form.check_ultrasound,
            check_mammography: form.check_mammography,
            check_xray: form.check_xray,

            check_pcr: form.check_pcr,
            check_hti: form.check_hti,
            check_brucellosis: form.check_brucellosis,

            phone: form.phone,

            subdivision: form.subdivision,
            profession: form.profession,
        }

        if (contractTypeIds && contractTypeIds.length) arFields.contract_type_ids = contractTypeIds

        let result = await ServerWorkerAdd(arFields)

        await router.push(`/worker/${result._id}`)

        //setFormResult(true)

    }

    //список типов договоров
    const GetTypeContract = async () => {
        let arFields = {
            offset: 0,
            count: 100
        }
        let result = await ServerContractTypeGet(arFields, {cookies: null})

        setContractTypeList(result.items)
    }

    const OnChangeCheck = (id) => {
        let list = []
        let newListCheck = contractTypeList.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            if (element.checked) list.push(element._id)
            return element
        })
        setContractTypeList(newListCheck)
        setContractTypeIds(list)
    }

    const OnChangeCheckOne = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: !prev[name]
        }))
    }

    const Age = (date) => {
        let today = new Date()
        let birthDate = new Date(date)
        let age = today.getFullYear() - birthDate.getFullYear()
        let m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    const FormCheckContractType = () => {
        return <>
            <br/>
            <h6 className="card-title text-center">Типы договоров</h6>
            <br/>

            <div className="mb-3 form-check">
                <div>
                    {contractTypeList.map((item, i)=>{
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

    const FormCheckContract = () => {
        return <div className="mb-3 form-check">
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check_ultrasound"
                           checked={(form.check_ultrasound) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        УЗИ
                    </label>
                </div>
                {((form.man === '0') && (Age(form.date_birth) >= 40)) ?
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="check_mammography"
                               checked={(form.check_mammography) ? true : false} onChange={OnChangeCheckOne}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            ММГ
                        </label>
                    </div> : null
                }
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check_xray"
                           checked={(form.check_xray) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        ФЛГ
                    </label>
                </div>

                <br/>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check_pcr"
                           checked={(form.check_pcr) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="check_pcr">
                        ПЦР
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check_hti"
                           checked={(form.check_hti) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="check_hti">
                        ХТИ
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="check_brucellosis"
                           checked={(form.check_brucellosis) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="check_brucellosis">
                        Бруцеллез
                    </label>
                </div>
            </div>
        </div>
    }

    const Form = () => {
        return <form onSubmit={onFormSubmit} className="p-3">
            <div className="card m-3">

                <div className="card-header">{'Новый работник'}</div>
                <div className="card-body">

                    <div className="row g-3 align-items-center">
                        <div className="col-4">
                            <label htmlFor="last_name" className="col-form-label">Фамилия</label>
                            <input type="text" className="form-control" id="last_name" value={form.last_name} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="first_name" className="col-form-label">Имя</label>
                            <input type="text" className="form-control" id="first_name" value={form.first_name} onChange={onChangeText}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="second_name" className="col-form-label">Отчество</label>
                            <input type="text" className="form-control" id="second_name" value={form.second_name} onChange={onChangeText}/>
                        </div>
                    </div>

                    <div className="row g-4 align-items-center">
                        <div className="col-6">
                            <label htmlFor="man" className="col-form-label">Пол</label>
                            <select className="form-select" id="man" aria-label="" value={form.man} onChange={onChangeText}>
                                <option value="1" defaultValue="1">Мужской</option>
                                <option value="0">Женский</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                            <input type="date" className="form-control" id="date_birth" value={form.date_birth ? new Date(form.date_birth).toISOString().substring(0, 10) : ''} onChange={onChangeText}/>
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

                    {FormCheckContractType()}

                    <br/>
                    <h6 className="card-title text-center">Контакты</h6>
                    <br/>

                    <div className="row g-3 align-items-center">
                        <div className="col-12">
                            <label htmlFor="phone" className="col-form-label">Телефон</label>
                            <input type="text" className="form-control" id="phone" value={form.phone ? form.phone : ''} onChange={onChangeText}/>
                        </div>
                    </div>

                    <br/>
                    <h6 className="card-title text-center">Работа (служба)</h6>
                    <br/>

                    <div className="row g-3 align-items-center">
                        <div className="col-6">
                            <label htmlFor="subdivision" className="col-form-label">Подразделение</label>
                            <input type="text" className="form-control" id="subdivision" value={form.subdivision ? form.subdivision : ''} onChange={onChangeText}/>
                        </div>
                        <div className="col-6">
                            <label htmlFor="profession" className="col-form-label">Профессия</label>
                            <input type="text" className="form-control" id="profession" value={form.profession ? form.profession : ''} onChange={onChangeText}/>
                        </div>

                    </div>

                    <br/>

                    <button type="submit" className="btn btn-primary">Добавить</button>

                </div>
            </div>
        </form>

    }

    const Result = () => {
        return <div className="alert alert-danger">
            Не удалось добавить
        </div>
    }

    return <>
        {formResult ? Result() : Form()}
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