//// @ts-nocheck
import WorkerEdit from '@/component/worker/edit'
import WorkerEditUser from '@/component/worker/editUser'
import WorkerEditVisit from '@/component/worker/editVisit'
import WorkerEditFinale from '@/component/worker/editFinale'

import {
    ServerAccountGet,
    ServerResearchGet,
    ServerSpecialistGet,
    ServerWorkerGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";
import {accessCheck} from "@/component/role/function";
import React from "react";

export default async function User ({
                                        params,
                                        searchParams
                                    }:{
    params: { id: string },
    searchParams: { form: string }
}) {
    let account = await ServerAccountGet({cookies:cookies()})
    let worker = await ServerWorkerGetById({ids: [params.id]}, {cookies:cookies()})
    let specialist = await ServerSpecialistGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})
    let research = await ServerResearchGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    //права доступа
    let accessUserEdit = accessCheck('userEdit', account._role_ids)
    let accessWorkerEdit = accessCheck('workerEdit', account._role_ids)
    let accessWorkerEditVisit = accessCheck('workerEditVisit', account._role_ids)
    let accessWorkerEditFinale = accessCheck('workerEditFinale', account._role_ids)

    const ListPrint = (workerId) => {
        return <div className="btn-group-vertical" role="group" aria-label="Vertical button group" style={{paddingLeft: '5px'}}>
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa-solid fa-print"></i>
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link href={`/worker/${workerId}/pdf/zaklyucheniye-pred`} className="dropdown-item" target="_blank">Закл. предварительного осмотра</Link>
                        <Link href={`/worker/${workerId}/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. периодического осмотра</Link>
                        <Link href={`/worker/${workerId}/pdf/card`} className="dropdown-item" target="_blank">Карта</Link>
                        <Link href={`/worker/${workerId}/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</Link>
                    </li>
                </ul>
            </div>

        </div>
    }

    return (
        <>
            <h1>Работник</h1>
            <Link href={`/contract/${worker[0].contract_id}/worker`} type="button" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                договор
            </Link>

            {ListPrint(worker[0]._id)}

            <br/>
            <br/>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link
                        className={(!searchParams.form || searchParams.form === 'user') ? `nav-link active` : `nav-link`}
                        aria-current="page" href="?form=user">Пациент</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'worker') ? `nav-link active` : `nav-link`}
                          aria-current="page" href="?form=worker">Работник</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'visit') ? `nav-link active` : `nav-link`}
                          aria-current="page" href="?form=visit">Приемы</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'finale') ? `nav-link active` : `nav-link`}
                          aria-current="page" href="?form=finale">Заключение</Link>
                </li>
            </ul>

            {(!searchParams.form || searchParams.form === 'user') ?
                <WorkerEditUser worker={worker[0]} account={account} accessEdit={accessUserEdit}/> : null}
            {(searchParams.form === 'worker') ?
                <WorkerEdit worker={worker[0]} account={account} accessEdit={accessWorkerEdit}/> : null}
            {(searchParams.form === 'visit') ? <WorkerEditVisit worker={worker[0]} account={account} accessEdit={accessWorkerEditVisit}/> : null}
            {(searchParams.form === 'finale') ? <WorkerEditFinale worker={worker[0]} account={account} accessEdit={accessWorkerEditFinale}/> : null}
        </>
    )
}
