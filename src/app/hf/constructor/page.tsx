import {ServerHfGet, ServerResearchGet, ServerSpecialistGet} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import HfConstructor from "@/component/hf/constructor";

export default async function Constructor ({
    params
}:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let arHf = await ServerHfGet({
        offset: 0,
        count: 1000
    }, {cookies:cookies()})
    let arSpecialist = await ServerSpecialistGet({
        offset: 0,
        count: 1000
    }, {cookies:cookies()})
    let arResearch = await ServerResearchGet({
        offset: 0,
        count: 1000
    }, {cookies:cookies()})

    return (
        <>
            <h1>Вредные факторы</h1>
            <HfConstructor hf={arHf} specialist={arSpecialist} research={arResearch}/>
        </>
    )
}
