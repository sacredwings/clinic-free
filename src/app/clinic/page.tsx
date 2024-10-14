// @ts-nocheck
import {ServerClinicGet} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Form from "@/component/menu/form";
import List from '@/component/clinic/list'
import Pagination from "@/component/menu/pagination";
import Style from './style.module.sass'

export default async function Clinic ({
                                       searchParams
                                   }:{
    searchParams: { page: number, q: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/clinic`

    const list = await ServerClinicGet({
        q: searchParams.q ? searchParams.q : null,

        count: step,
        offset: (page - 1) * step
    }, {cookies: cookies()})

    return (
        <div className={Style.page}>

            <div>
                <h1>Клиники</h1>
            </div>

            <div>
                <Form searchParams={searchParams} url={url}/>
            </div>

            <article>
                <List list={list} accessAdd={true}/>
            </article>

            <div>
                <Pagination searchParams={searchParams} url={url} count={list.count} step={step}/>
            </div>

        </div>
    )

}

