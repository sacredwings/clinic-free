'use client'

//import Styles from './profile.module.sass'
import Link from "next/link"
import {cookies} from "next/headers"
import {ServerOwnerGetById, ServerVideoGet} from "@/component/function/url_api"
//import MinioFileViewer from "@/component/file/viewer"
//import VideoAdd from "@/component/video/add";
import React from "react";

export default function ({worker}) {
    console.log(worker)
    const List = (arr) => {
        if (!arr) return null

        return <ul className="list-group list-group-flush">
            {arr.map((item, i)=>{
                return <li className="list-group-item" key={i}>
                    {item.name}
                    &#160;
                    {(item.price ?
                            (!worker.price_worker_all && !worker.price_worker_man && !worker.price_worker_woman) ?
                                <span className="badge text-bg-primary">{item.price} руб.</span> :
                                <span className="badge text-bg-secondary">{item.price} руб.</span>
                            :
                            null
                    )}
                </li>
            })}
        </ul>

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
                    <h1>{`${worker._user_id.first_name} ${worker._user_id.last_name} ${worker._user_id.second_name}`}</h1>
                    <Link href={`/worker/${worker._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
                        <i className="fa-solid fa-edit"></i>
                    </Link>

                    {ListPrint(worker._id)}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Вредные факторы</h3>
                    {ListCode(worker.hf_code)}
                </div>
            </div>


            <div className="card">
                <div className="card-body">
                    <h3>Исследования</h3>
                    {List(worker.research)}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Специалисты</h3>
                    {List(worker.specialist)}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Дополнительно</h3>
                    <ul className="list-group list-group-flush">
                        {worker.price_ultrasound ? <li className="list-group-item">УЗИ
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_ultrasound} руб.</span>
                        </li> : null}
                        {worker.price_mammography ? <li className="list-group-item">Мамография
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_mammography} руб.</span>
                        </li> : null}
                        {worker.price_xray ? <li className="list-group-item">ФЛГ
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_xray} руб.</span>
                        </li> : null}

                        {worker.price_pcr ? <li className="list-group-item">ПЦР
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_pcr} руб.</span>
                        </li> : null}
                        {worker.price_hti ? <li className="list-group-item">ХТИ
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_hti} руб.</span>
                        </li> : null}
                        {worker.price_brucellosis ? <li className="list-group-item">Бруцеллез
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_brucellosis} руб.</span>
                        </li> : null}
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Договор</h3>
                    <ul className="list-group list-group-flush">
                        {worker.price_worker_all ? <li className="list-group-item">За человека
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_worker_all} руб.</span>
                        </li> : null}
                        {worker.price_worker_man ? <li className="list-group-item">Мужчина
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_worker_man} руб.</span>
                        </li> : null}
                        {worker.price_worker_woman ? <li className="list-group-item">Женщина
                            &#160;
                            <span className="badge text-bg-primary">{worker.price_worker_woman} руб.</span>
                        </li> : null}
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    Итого: <b>{worker.price ? worker.price : 0} руб.</b>
                </div>
            </div>
            <hr/>

        </>
    )
}
