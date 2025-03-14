// @ts-nocheck

import {ServerDoctorGet} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Form from "@/component/menu/form";
//import List from '@/component/doctor/list'
import Pagination from "@/component/menu/pagination";

export default async function Doctor ({
                                       searchParams
                                   }:{
    searchParams: { page: number, q: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/doctor`

    const list = await ServerDoctorGet({
        q: searchParams.q ? searchParams.q : null,

        count: step,
        offset: (page - 1) * step
    }, {cookies: cookies()})

    return (
        <div>

            <div>
                <h1>Врачи</h1>
            </div>

            <div>
                <Form searchParams={searchParams} url={url}/>
            </div>

            <article>
                {/*<List list={list} accessAdd={true}/>*/}
            </article>

            <div>
                <Pagination searchParams={searchParams} url={url} count={list.count} step={step}/>
            </div>

        </div>
    )

}

