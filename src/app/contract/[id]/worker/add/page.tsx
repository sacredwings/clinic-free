import {ServerHfGet, ServerResearchGet, ServerSpecialistGet} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import WorkerAdd from "@/component/worker/add";

export default async function Constructor ({
    params
}:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {

    return (
        <>
            <h1>Вредные факторы</h1>
            <WorkerAdd contract_id={params.id} />
        </>
    )
}
