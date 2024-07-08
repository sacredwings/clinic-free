// @ts-nocheck
import WorkerId from '@/component/worker/id'
import {ServerResearchGet, ServerSpecialistGet, ServerWorkerGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";


export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let worker = await ServerWorkerGetById({ids: [params.id]}, {cookies:cookies()})
    let specialist = await ServerSpecialistGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})
    let research = await ServerResearchGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

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
            <WorkerId worker={worker[0]}/>
        </>
    )
}
