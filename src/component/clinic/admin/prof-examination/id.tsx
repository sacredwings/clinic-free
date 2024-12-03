// @ts-nocheck
'use client'

import React, {useState, useEffect} from 'react'
import axios from "axios"
import {ServerOrgEdit} from "@/component/function/url_api";
import Link from 'next/link'

export default function ProfExaminationId ({profExamination}) {

    const List = (arr) => {
        if (!arr) return null

        return <ul className="list-group list-group-flush">
            {arr.map((item, i)=>{
                return <li className="list-group-item" key={i}>
                    {item.name}
                    &#160;
                    {(item.price ?
                            (!profExamination.price_worker_all && !profExamination.price_worker_man && !profExamination.price_worker_woman) ?
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

    const ListPrint = (profExaminationId) => {
        return <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-print"></i>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a href={`/prof-examination/${profExaminationId}/pdf/zaklyucheniye-pred   /worker/${profExaminationId}/pdf/zaklyucheniye-pred`} className="dropdown-item" target="_blank">Закл. предварительного осмотра</a>
                        <a href={`/worker/${profExaminationId}/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. периодического осмотра</a>
                        <a href={`/worker/${profExaminationId}/pdf/card`} className="dropdown-item" target="_blank">Карта</a>
                        <a href={`/worker/${profExaminationId}/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</a>
                    </li>
                </ul>
            </div>

        </div>
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h1>{`${profExamination._user_id.first_name} ${profExamination._user_id.last_name} ${profExamination._user_id.second_name}`}</h1>
                    <Link href={`/worker/${profExamination._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
                        <i className="fa-solid fa-edit"></i>
                    </Link>

                    {ListPrint(profExamination._id)}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Вредные факторы</h3>
                    {ListCode(profExamination.hf_code)}
                </div>
            </div>


            <div className="card">
                <div className="card-body">
                    <h3>Исследования</h3>
                    {List(profExamination.research)}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Специалисты</h3>
                    {List(profExamination.specialist)}
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Дополнительно</h3>
                    <ul className="list-group list-group-flush">
                        {profExamination.price_ultrasound ? <li className="list-group-item">УЗИ
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_ultrasound} руб.</span>
                        </li> : null}
                        {profExamination.price_mammography ? <li className="list-group-item">Мамография
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_mammography} руб.</span>
                        </li> : null}
                        {profExamination.price_xray ? <li className="list-group-item">ФЛГ
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_xray} руб.</span>
                        </li> : null}

                        {profExamination.price_pcr ? <li className="list-group-item">ПЦР
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_pcr} руб.</span>
                        </li> : null}
                        {profExamination.price_hti ? <li className="list-group-item">ХТИ
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_hti} руб.</span>
                        </li> : null}
                        {profExamination.price_brucellosis ? <li className="list-group-item">Бруцеллез
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_brucellosis} руб.</span>
                        </li> : null}
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h3>Договор</h3>
                    <ul className="list-group list-group-flush">
                        {profExamination.price_worker_all ? <li className="list-group-item">За человека
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_worker_all} руб.</span>
                        </li> : null}
                        {profExamination.price_worker_man ? <li className="list-group-item">Мужчина
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_worker_man} руб.</span>
                        </li> : null}
                        {profExamination.price_worker_woman ? <li className="list-group-item">Женщина
                            &#160;
                            <span className="badge text-bg-primary">{profExamination.price_worker_woman} руб.</span>
                        </li> : null}
                    </ul>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    Итого: <b>{profExamination.price ? profExamination.price : 0} руб.</b>
                </div>
            </div>
            <hr/>

        </>
    )
}
