// @ts-nocheck

import WorkerEdit from '@/component/clinic/admin/prof-examination/edit'
import WorkerEditUser from '@/component/clinic/admin/prof-examination/editUser'
import WorkerEditVisit from '@/component/clinic/admin/prof-examination/editVisit'
import WorkerEditFinale from '@/component/clinic/admin/prof-examination/editFinale'

import {
    ServerAccountGet,
    ServerProfExaminationGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import {accessCheck} from "@/component/clinic/edit/role/function";

export default async function User ({
                                        params,
                                        searchParams
                                    }:{
    params: { clinic_id: string, id: string },
    searchParams: { form: string }
}) {

    let account = await ServerAccountGet({cookies:cookies()})
    let worker = await ServerProfExaminationGetById({clinic_id: params.clinic_id, ids: [params.id]}, {cookies:cookies()})

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
                        <Link href={`/prof-examination/${workerId}/pdf/zaklyucheniye-pred`} className="dropdown-item" target="_blank">Закл. предварительного осмотра</Link>
                        <Link href={`/prof-examination/${workerId}/pdf/zaklyucheniye`} className="dropdown-item" target="_blank">Закл. периодического осмотра</Link>
                        <Link href={`/prof-examination/${workerId}/pdf/card`} className="dropdown-item" target="_blank">Карта</Link>
                        <Link href={`/prof-examination/${workerId}/pdf/vypiska`} className="dropdown-item" target="_blank">Выписка</Link>
                    </li>
                </ul>
            </div>

        </div>
    }

    return (
        <>
            <h1>Проф. осмотр</h1>
            <Link href={`/clinic/${params.clinic_id}/admin/prof-examination/?contract_id=${worker[0].contract_id}`} type="button" className="btn btn-primary btn-sm">
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
                <WorkerEditUser patient={worker[0]._patient_user_id} account={account} accessEdit={accessUserEdit}/> : null}
            {(searchParams.form === 'worker') ?
                <WorkerEdit clinic_id={params.clinic_id} patient={worker[0]} account={account} accessEdit={accessWorkerEdit}/> : null}
            {(searchParams.form === 'visit') ? <WorkerEditVisit patient={worker[0]} account={account} accessEdit={accessWorkerEditVisit}/> : null}
            {(searchParams.form === 'finale') ? <WorkerEditFinale patient={worker[0]} account={account} accessEdit={accessWorkerEditFinale}/> : null}
        </>
    )
}
