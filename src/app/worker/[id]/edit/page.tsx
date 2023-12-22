import WorkerEdit from '@/component/worker/form'
import {
    ServerAccountGet,
    ServerResearchGet,
    ServerSpecialistGet,
    ServerWorkerGetById
} from "@/component/function/url_api";
import { cookies } from 'next/headers'

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

    return (
        <>
            <h1>Работник</h1>
            <WorkerEdit worker={worker[0]} account={account}/>
        </>
    )
}
