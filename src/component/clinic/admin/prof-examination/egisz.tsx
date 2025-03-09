// @ts-nocheck
'use client'
//import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {
    ServerProfExaminationEgisz,
    ServerUserEdit
} from "@/component/function/url_api";
import FormSpecialistRadio from "@/component/worker/formSpecialistRadio";
import FormResearchRadio from "@/component/worker/formResearchRadio";

export default function UserForm ({clinicId, profExamination, account, accessEdit}) {
    let [form, setForm] = useState(profExamination)


    const onChangeText = (e) => {
        let name = e.target.id
        let value = e.target.value

        setForm(prev => ({
            ...prev, [name]: value
        }))
    }

    const onSave = async (e) => {
        e.preventDefault() // Stop form submit

        let arFields = {
            clinic_id: clinicId,

            id: profExamination._id,

        }

        let result = await ServerProfExaminationEgisz(arFields)
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

                </div>
            </div>

            <div className="mb-3" style={{float: 'right', marginTop: '20px'}}>
                <button type="submit" className="btn btn-success" onClick={onSave}>Отправить</button>
            </div>
        </>


    }

    return <>
        {Form()}
    </>
}