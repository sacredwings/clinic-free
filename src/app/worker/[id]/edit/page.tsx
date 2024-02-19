// @ts-nocheck
import WorkerEdit from '@/component/worker/form'
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
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
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

    return (
        <>
            <h1>Работник</h1>
            <Link href={`/contract/${worker[0].contract_id}/worker`} type="button" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                договор
            </Link>
            <WorkerEdit worker={worker[0]} account={account} accessEdit={accessEdit}/>
        </>
    )
}
