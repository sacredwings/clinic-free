// @ts-nocheck
'use client'
//import { useRouter } from 'next/router' //переход по url
import  iReact, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerUserEditAuth, ServerUserEditVisit, ServerUserEditRole} from "@/component/function/url_api";
import React from "react";

export default function UserForm ({user, specialist, research, role}) {
    //const router = useRouter() //для перехода к пользователю

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


    let [form, setForm] = useState({...user, password: ''})
    let [checkSpecialist, setCheckSpecialist] = useState(()=>OnCheckInit(specialist, user.specialist_ids))
    let [checkResearch, setCheckResearch] = useState(()=>OnCheckInit(research, user.research_ids))

    useEffect(() => {
        (async () => {
            //console.log(form)
        })()
    }, [form])

    const onSaveVisit = async (e) => {
        e.preventDefault() // Stop form submit

        let url = '/user/editAccess'

        let arFields = {
            id: form._id,
            specialist_ids: form.specialist_ids,
            research_ids: form.research_ids
        }

        let result = await ServerUserEditVisit(arFields)
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

    const FormCheckSpecialist = () => {
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
                    <legend><b>Права доступа к приемам</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
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

            <div className="mb-3" style={{float: 'right', marginTop: '20px'}}>
                <button type="submit" className="btn btn-success" onClick={onSaveVisit}>Сохранить</button>
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