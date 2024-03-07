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

    const [healthGroup, setHealthGroup] = useState(worker.health_group);
    const [healthGroupList, setHealthGroupList] = useState([
        {name: 'Ⅰ', value: '1'},
        {name: 'Ⅱ', value: '2'},
        {name: 'Ⅲ а', value: '3а'},
        {name: 'Ⅲ б', value: '3б'},
        {name: 'Ⅳ', value: '4'}
    ]);
    const [contraindications, setContraindications] = useState(worker.contraindications ? worker.contraindications : []);

    useEffect(() => {
        (async () => {
            console.log(contraindications)
        })()
    }, [contraindications])

    function ChangeHealthGroupList (event) {
        setHealthGroup(event.target.value);
    }
    function ChangeContraindications (event) {
        let deleteElement = false

        let newArr = []
        contraindications.forEach((item)=>{
            if (event.target.value === item)
                deleteElement = true
            else
                newArr.push(item)
        })

        if (!deleteElement) newArr.push(event.target.value)
        setContraindications(newArr)
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

    const HealthGroupList = () => {
        return healthGroupList.map((item, i)=> {
            return <div className="form-check" key={i}>
                <input className="form-check-input" type="radio" name="health_group"
                       id={item.value} onChange={ChangeHealthGroupList}/>
                <label className="form-check-label" htmlFor={item.value}>
                    {item.name}
                </label>
            </div>
        })
    }

    const Contraindications = () => {
        if (!worker.hf_code) return
        return worker.hf_code.map((item, i)=> {
            let check = false

            if (contraindications)
                for (let contraindicationsElement of contraindications) {
                    if (item === contraindicationsElement) check = true
                }

            return <div className="form-check" key={i}>
                <input className="form-check-input" type="checkbox" value={item} id={item} checked={check} onChange={ChangeContraindications}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        {item}
                    </label>
            </div>
        })
    }

    const Form = () => {
        return <>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Группа здоровья</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    {HealthGroupList()}
                </div>
            </div>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Переосвидетельствование</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="re_hf" className="form-label">Через (количество месяцев)</label>
                        <input type="number" className="form-control" id="re_hf"
                               value={worker.re_hf ? worker.re_hf : null}/>
                    </div>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px', textAlign: 'center'}}>
                <div className="card-body">
                    <legend><b>Противопоказания</b></legend>
                </div>
            </div>

            <div className="card" style={{marginTop: '20px'}}>
                <div className="card-body">
                    {Contraindications()}
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