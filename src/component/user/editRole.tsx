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

    /*
    const formDefault = {
        first_name: '',
        last_name: '',
        second_name: '',

        man: '1',
        date_birth: null,
        phone: '',

        specialist_ids: null,
        research_ids: null
    }*/

    let [form, setForm] = useState({...user, password: ''})
    let [checkRole, setCheckRole] = useState(()=>OnCheckInit(role, user.role_ids))

    useEffect(() => {
        (async () => {
            //console.log(form)
        })()
    }, [form])

    const onSaveRole = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            id: form._id,
            role_ids: form.role_ids,
        }

        let result = await ServerUserEditRole(arFields)
    }

    const OnChangeCheckRole = (id) => {
        let newIds = []
        let newCheckList = checkRole.map((element, i) => {
            if (element._id === id)
                element.checked = !element.checked

            //заполнение чеками
            if (element.checked) newIds.push(element._id)

            return element
        })

        setForm(prev => ({
            ...prev, role_ids: (newIds.length) ? newIds : null
        }))
        setCheckRole(newCheckList)
    }

    const FormCheckRole = () => {
        return <>
            <div className="mb-3 form-check">
                <div>
                    {checkRole.map((item, i)=>{
                        return <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" checked={(item.checked) ? true : false} onChange={()=>{OnChangeCheckRole(item._id)}}/>
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
                    <legend><b>Права доступа к системе</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">

                    <div className="mb-3">
                        {FormCheckRole()}
                    </div>

                </div>
            </div>

            <div className="mb-3" style={{float: 'right', marginTop: '20px'}}>
                <button type="submit" className="btn btn-success" onClick={onSaveRole}>Сохранить</button>
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