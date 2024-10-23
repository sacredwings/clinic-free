// @ts-nocheck
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

export default function UserForm ({worker, account, accessEdit}) {
    //const router = useRouter() //для перехода к пользователю

    let [formUser, setFormUser] = useState(worker._user_id)
    let [form, setForm] = useState({...worker, hf_code: (worker.hf_code ? worker.hf_code.join(',') : null)})
    let [contractTypeIds, setContractTypeIds] = useState([]) //для формы
    let [contractTypeList, setContractTypeList] = useState([])

    useEffect(() => {
        (async () => {
            //console.log(form)
        })()
    }, [form])

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

    const onSaveWorkerEdit = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,

            contract_type_ids: contractTypeIds,
            hf_code: form.hf_code,

            check_ultrasound: form.check_ultrasound,
            check_mammography: form.check_mammography,
            check_xray: form.check_xray,

            check_pcr: form.check_pcr,
            check_hti: form.check_hti,
            check_brucellosis: form.check_brucellosis,

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
                    <input className="form-check-input" type="checkbox" id="check_ultrasound"
                           checked={(form.check_ultrasound) ? true : false} onChange={OnChangeCheckOne}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        УЗИ
                    </label>
                </div>
                {((Number(formUser.man) === 0) && (Number(Age(formUser.date_birth)) >= 40)) ?
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
        return <>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Основное</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">

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

                </div>
            </div>

            <div className="mb-3" style={{float: 'right', marginTop: '20px'}}>
                <button type="submit" className="btn btn-success" onClick={onSaveWorkerEdit}>Сохранить</button>
            </div>
        </>


    }

    return <>
        {Form()}
    </>
}