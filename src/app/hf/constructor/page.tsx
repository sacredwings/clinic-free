
import {ServerOrgGet, ServerSpecialistGet, ServerWorkerGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import Hf from '@/component/hf/list'
import SpecialistGet from '@/component/specialist/list'
import ResearchGet from '@/component/research/list'

export default async function Constructor ({
    params
}:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let arOrg = await ServerHfGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Вредные факторы</h1>
            <div className="row">
                <div className="col-6">
                    <Hf SelectHf={SelectHf}/>
                </div>
                <div className="col-6">
                    <SpecialistGet selectHf={selectHf} module={'hf'}/>
                    <hr/>
                    <ResearchGet selectHf={selectHf} module={'hf'}/>
                </div>
            </div>
        </>
    )
}
