// @ts-nocheck
'use client'
//import { useRouter } from 'next/router' //переход по url
import React, {useState, useEffect} from 'react'
import axios from "axios"
import {
    serverProfExaminationEditVisit
} from "@/component/function/url_api";
import FormSpecialtyRadio from "./formSpecialtyRadio";
import FormResearchRadio from "./formResearchRadio";

export default function UserForm ({patient, account, accessEdit}) {
    //const router = useRouter() //для перехода к пользователю

    let [form, setForm] = useState({...patient, hf_code: (patient.hf_code ? patient.hf_code.join(',') : null)})

    useEffect(() => {
        (async () => {
            //console.log(form)

        })()
    }, [form])

    const Visit = (id, arr, arName) => {
        if (!arr) return null
        for (let item of arr) {
            if (id === item[arName]) return item
        }
        return null
    }

    const Access = (id, arr) => {
        if (accessEdit) return true
        if (!arr || !arr.length) return false
        for (let item of arr) {
            if (id === item._id) return true
        }
        return false
    }

    const FormCheckSpeciality = (speciality, specialityVisit) => {
        if (!speciality) return null
        return speciality.map((item, i) => {
            return <FormSpecialtyRadio key={i} workerId={patient._id} speciality={item}
                                       visit={Visit(item._id, specialityVisit, 'speciality_id')}
                                       access={Access(item._id, account._speciality_ids)}/>
        })
    }

    const FormCheckResearch = (research, researchVisit) => {
        if (!research) return null
        return research.map((item, i) => {
            return <FormResearchRadio key={i} workerId={patient._id} research={item}
                                      visit={Visit(item._id, researchVisit, 'research_id')}
                                      access={Access(item._id, account._research_ids)}/>
        })
    }

    const Form = () => {

        return <>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Специалисты</b></legend>
                </div>
            </div>

            {FormCheckSpeciality (form.speciality, form._speciality_visit_ids)}

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Исследования</b></legend>
                </div>
            </div>

            {FormCheckResearch (form.research, form._research_visit_ids)}

        </>
    }

    return <>
        {Form()}
    </>
}