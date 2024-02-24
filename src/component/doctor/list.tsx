// @ts-nocheck
'use client'

//import Styles from './profile.module.sass'
import Link from "next/link"
import {cookies} from "next/headers"
import {ServerOwnerGetById, ServerVideoGet} from "@/component/function/url_api"
//import MinioFileViewer from "@/component/file/viewer"
//import VideoAdd from "@/component/video/add";
import React, {useEffect} from "react";

export default function DoctorList ({worker, account}) {


    useEffect(() => {
        (async () => {
            console.log(worker)
        })()
    }, [])

    const SpecialistList = (list) => {
        if (!list) return
        return list.map((item, i)=> {
            return <span key={i} className="badge text-bg-secondary">
                        {item.name}
                    </span>
        })


    }
    const OrgElement = (contract) => {
        return contract ? <span className="badge text-bg-secondary">
                        {contract._org_id.name}
                    </span> : null
    }

    const List = () => {
        return <ul className="list-group">
            {worker.items.map((item, i) => {

                let user = item._user_id
                return <li key={i} className="list-group-item">
                    <p>{user.first_name}</p>
                    {OrgElement(item._contract_id)}

                </li>
            })}

        </ul>
    }


    return (
        <>
            <h1>Врач: {account.last_name} {account.first_name} {account.second_name}</h1>
            <h2>Специальность</h2>
            {SpecialistList(account._specialist_ids)}
            <h2>Пациенты</h2>
            {List()}
        </>
    )
}