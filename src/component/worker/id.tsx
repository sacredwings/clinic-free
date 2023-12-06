'use client'

//import Styles from './profile.module.sass'
import Link from "next/link"
import {cookies} from "next/headers"
import {ServerOwnerGetById, ServerVideoGet} from "@/component/function/url_api"
//import MinioFileViewer from "@/component/file/viewer"
//import VideoAdd from "@/component/video/add";
import React from "react";

export default async function ({worker}) {
    const List = (ar) => {
        return ar.map((item, i)=>{
            return <p key={i}>
                {item.name}
            </p>
        })
    }
    const ListCode = (arList) => {
        if (arList)
            return arList.map((list, i) => {
                return <span className="badge text-bg-primary" style={{margin:'2px'}} key={i}>{list}</span>
            })
        else
            return ''
    }

    const ListPrint = (workerId) => {
        return <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-print"></i>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a href={`/worker/${workerId}/pdf/zaklyucheniye-pred`} className="dropdown-item" target="_blank">Закл. предварительного осмотра</a>
                        <a href={`/worker/${workerId}/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. периодического осмотра</a>
                        <a href={`/worker/${workerId}/pdf/card`} className="dropdown-item" target="_blank">Карта</a>
                        <a href={`/worker/${workerId}/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</a>
                    </li>
                </ul>
            </div>

        </div>
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h1>{`${worker._user_id.first_name} ${worker._user_id.last_name} ${worker._user_id.patronymic_name}`}</h1>
                </div>
            </div>

            {ListCode(worker.hf_code)}

            <Link href={`/worker/${worker._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
                <i className="fa-solid fa-edit"></i>
            </Link>

            {ListPrint(worker._id)}

            <h3>Иследования</h3>
            {List(worker._research_ids)}

            <hr/>
            <h3>Специалисты</h3>
            {List(worker._specialist_ids)}
        </>
    )
}
