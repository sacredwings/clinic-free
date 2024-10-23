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
import FormSpecialistRadio from "./formSpecialistRadio";
import FormResearchRadio from "./formResearchRadio";

export default function UserForm ({worker, account, accessEdit}) {
    //const router = useRouter() //для перехода к пользователю

    let [form, setForm] = useState({...worker, hf_code: (worker.hf_code ? worker.hf_code.join(',') : null)})

    useEffect(() => {
        (async () => {
            console.log(form)

        })()
    }, [form])

    const Visit = (id, arr, arName) => {
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

    const FormCheckSpecialist = (specialist, specialistVisit) => {
        if (!specialist) return null
        return specialist.map((item, i) => {
            return <FormSpecialistRadio key={i} workerId={worker._id} specialist={item}
                                        visit={Visit(item._id, specialistVisit, 'specialist_id')}
                                        access={Access(item._id, account._specialist_ids)}/>
        })
    }

    const FormCheckResearch = (research, researchVisit) => {
        if (!research) return null
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
                    <legend><b>Специалисты</b></legend>
                </div>
            </div>

            {FormCheckSpecialist (form.specialist, form._specialist_visit_ids)}

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