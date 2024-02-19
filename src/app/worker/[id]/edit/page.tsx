//// @ts-nocheck
import WorkerEdit from '@/component/worker/edit'
import WorkerEditUser from '@/component/worker/editUser'
import WorkerEditVisit from '@/component/worker/editVisit'
import {
    ServerAccountGet,
    ServerResearchGet,
    ServerSpecialistGet,
    ServerWorkerGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";
import {accessCheck} from "@/component/role/function";

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
    let accessEdit = accessCheck('workerEdit', account._role_ids)

    //if (!searchParams.q) searchParams.q = 'user'
    return (
        <>
            <h1>Работник</h1>
            <Link href={`/contract/${worker[0].contract_id}/worker`} type="button" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                договор
            </Link>

            <br/>
            <br/>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className={(!searchParams.form || searchParams.form === 'user') ? `nav-link active` : `nav-link`} aria-current="page" href="?form=user">Пациент</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'worker') ? `nav-link active` : `nav-link`} aria-current="page" href="?form=worker">Работник</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'visit') ? `nav-link active` : `nav-link`} aria-current="page" href="?form=visit">Приемы</Link>
                </li>
            </ul>

            {(!searchParams.form || searchParams.form === 'user') ? <WorkerEditUser worker={worker[0]} account={account} accessEdit={accessEdit}/> : null}
            {(searchParams.form === 'worker') ? <WorkerEdit worker={worker[0]} account={account} accessEdit={accessEdit}/> : null}
            {(searchParams.form === 'visit') ? <WorkerEditVisit worker={worker[0]} account={account} accessEdit={accessEdit}/> : null}
        </>
    )
}
