// @ts-nocheck
import Link from 'next/link'
import React from "react";

export default function Element ({element, clinic_id}){
    let href=`/clinic/${clinic_id}/admin/prof-examination?contract_id=${element._id}`

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
                        <a href={`/prof-examination/${workerId}/pdf/zaklyucheniye-pred`} className="dropdown-item" target="_blank">Закл. предварительного осмотра</a>
                        <a href={`/prof-examination/${workerId}/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. периодического осмотра</a>
                        <a href={`/prof-examination/${workerId}/pdf/card`} className="dropdown-item" target="_blank">Карта</a>
                        <a href={`/prof-examination/${workerId}/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</a>
                    </li>
                </ul>
            </div>

        </div>
    }

    return <li className="list-group-item d-flex justify-content-between align-items-start">
        <div className="ms-2 me-auto" style={{width: '100%'}}>
            <div
                className="fw-bold">{element._user_id.last_name} {element._user_id.first_name} {element._user_id.second_name}</div>
            {ListCode(element.hf_code)}
            <br/>
            <Link href={`/clinic/${clinic_id}/admin/prof-examination/${element._id}`}>
                Подробно...
            </Link>
            <br/>
            {/*Progress(element)*/}
        </div>
        <Link href={`/clinic/${clinic_id}/admin/prof-examination/${element._id}/edit`} type="button" className="btn btn-outline-warning btn-sm">
            <i className="fa-solid fa-edit"></i>
        </Link>

        {ListPrint(element._id)}
    </li>

}
