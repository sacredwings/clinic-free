'use client'
//import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {
    ServerContractTypeGet,
    ServerUserEdit,
    ServerUserEditAccess,
    ServerWorkerEdit
} from "@/component/function/url_api";
import FormSpecialistRadio from "@/component/worker/formSpecialistRadio";
import FormResearchRadio from "@/component/worker/formResearchRadio";

export default function UserForm ({worker, account}) {
    //const router = useRouter() //для перехода к пользователю

    let [formUser, setFormUser] = useState(worker._user_id)
    let [form, setForm] = useState({...worker, hf_code: worker.hf_code.join(',')})
    let [contractTypeIds, setContractTypeIds] = useState([]) //для формы
    let [contractTypeList, setContractTypeList] = useState([])

    useEffect(() => {
        (async () => {
            await GetTypeContract()

        })()
    }, [])

    const OnCheckInit = (list, formList) => {
        if (!list) return []

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
    const OnCheckInitId = (arr) => {
        if (!arr || !arr.length) return []

        let newArr = arr.map((element, i) => {
            return element._id
        })

        return newArr
    }

    const GetTypeContract = async () => {
        let arFields = {
            offset: 0,
            count: 100
        }
        let result = await ServerContractTypeGet(arFields, {cookies: null})

        let check = OnCheckInit(result.items, form.contract_type_ids)
        let checkIds = OnCheckInitId(check)
        setContractTypeList(check)
        setContractTypeIds(checkIds)
    }

    const onChangeText = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onChangeTextUser = (e) => {
        let name = e.target.id
        let value = e.target.value

        setFormUser(prev => ({
            ...prev, [name]: value
        }))
    }

    const onSaveUserEdit = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            id: formUser._id,
            first_name: formUser.first_name,
            last_name: formUser.last_name,
            second_name: formUser.second_name,

            man: formUser.man,
            date_birth: formUser.date_birth,
            phone: formUser.phone,
        }

        let result = await ServerUserEdit(arFields)
    }

    const onSaveWorkerEdit = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,

            contract_type_ids: contractTypeIds,
            hf_code: form.hf_code,

            price_ultrasound: form.price_ultrasound,
            price_mammography: form.price_mammography,
            price_xray: form.price_xray,

            subdivision: form.subdivision,
            profession: form.profession,
        }

        let result = await ServerWorkerEdit(arFields)
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
            <label htmlFor="hf_code" className="col-form-label">Типы договоров</label>
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
                    <input className="form-check-input" type="checkbox" id="price_ultrasound"
                           checked={(form.price_ultrasound) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        УЗИ
                    </label>
                </div>
                {((form.man === '0') && (Age(form.date_birth) >= 40)) ?
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="price_mammography"
                               checked={(form.price_mammography) ? true : false} onChange={OnChangeCheckOne}/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            ММГ
                        </label>
                    </div> : null
                }
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="price_xray"
                           checked={(form.price_xray) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        ФЛГ
                    </label>
                </div>

                <br/>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="price_pcr"
                           checked={(form.price_pcr) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="price_pcr">
                        ПЦР
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="price_hti"
                           checked={(form.price_hti) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="price_hti">
                        ХТИ
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="price_brucellosis"
                           checked={(form.price_brucellosis) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="price_brucellosis">
                        Бруцеллез
                    </label>
                </div>
            </div>
        </div>
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
        return specialist.map((item, i) => {
            return <FormSpecialistRadio key={i} workerId={worker._id} specialist={item}
                                        visit={Visit(item._id, specialistVisit, 'specialist_id')}
                                        access={Access(item._id, account._specialist_ids)}/>
        })
    }

    const FormCheckResearch = (research, researchVisit) => {
        return research.map((item, i) => {
            return <FormResearchRadio key={i} workerId={worker._id} research={item}
                                      visit={Visit(item._id, researchVisit, 'research_id')}
                                      access={Access(item._id, account._research_ids)}/>
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
                    <form onSubmit={onSaveUserEdit}>
                        <div className="mb-3 row">
                            <div className="col-4">
                                <label htmlFor="last_name" className="col-form-label">Фамилия</label>
                                <input type="text" className="form-control" id="last_name" value={formUser.last_name ? formUser.last_name : ''} onChange={onChangeTextUser}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="first_name" className="col-form-label">Имя</label>
                                <input type="text" className="form-control" id="first_name" value={formUser.first_name ? formUser.first_name : ''} onChange={onChangeTextUser}/>
                            </div>
                            <div className="col-4">
                                <label htmlFor="second_name" className="col-form-label">Отчество</label>
                                <input type="text" className="form-control" id="second_name" value={formUser.second_name ? formUser.second_name : ''} onChange={onChangeTextUser}/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="man" className="col-form-label">Пол</label>
                            <select className="form-select" id="man" aria-label="" value={formUser.man} onChange={onChangeTextUser}>
                                <option value="1" defaultValue="1">Мужской</option>
                                <option value="0">Женский</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date_birth" className="col-form-label">Дата рождения</label>
                            <input type="date" className="form-control" id="date_birth" value={formUser.date_birth ? new Date(formUser.date_birth).toISOString().substring(0, 10) : ''} onChange={onChangeTextUser}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="col-form-label">Телефон</label>
                            <input type="text" className="form-control" id="phone" value={formUser.phone ? formUser.phone : ''} onChange={onChangeTextUser}/>
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
                    <form onSubmit={onSaveWorkerEdit}>

                        <div className="g-3 row">
                            <div className="col-12">
                                <label htmlFor="hf_code" className="col-form-label">Вредные факторы</label>
                                <input type="text" className="form-control" id="hf_code" value={form.hf_code}
                                       onChange={onChangeText}/>
                            </div>
                        </div>

                        <div className="g-3 row">
                            <div className="col-12">
                                <label htmlFor="hf_code" className="col-form-label">Дополнительные услуги</label>
                                {FormCheckContract()}

                                {FormCheckContractType()}
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-6">
                                <label htmlFor="subdivision" className="col-form-label">Подразделение</label>
                                <input type="text" className="form-control" id="subdivision"
                                       value={form.subdivision ? form.subdivision : ''} onChange={onChangeText}/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="profession" className="col-form-label">Профессия</label>
                                <input type="text" className="form-control" id="profession"
                                       value={form.profession ? form.profession : ''} onChange={onChangeText}/>
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