// @ts-nocheck
import {ServerHfGet, ServerResearchGet, ServerSpecialistGet} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import CtConstructor from "@/component/contract-type/constructor";

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
            <h1>Типы договоров</h1>
            <CtConstructor hf={arHf} specialist={arSpecialist} research={arResearch}/>
        </>
    )
}
