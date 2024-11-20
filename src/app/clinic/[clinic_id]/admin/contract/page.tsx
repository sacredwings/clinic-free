// @ts-nocheck
import {
    ServerContractGet,
    ServerOrgGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import ContractList from "@/component/clinic/admin/contract/list";
import Link from "next/link";
import React from "react";
import Pagination from "@/component/menu/pagination";

export default async function ContractGet ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { org_id: string, page: number, q: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/clinic/${params.clinic_id}/admin/contract`

    let org
    if (searchParams.org_id) {
        org = await ServerOrgGetById({ids: [searchParams.org_id]}, {cookies: cookies()})
        org = org[0]
    }

    let arContract = await ServerContractGet({
        clinic_id: params.clinic_id,

        q: params.q,
        org_id: searchParams.org_id,

        count: step,
        offset: (page - 1) * step
    }, {cookies:cookies()})

    return (
        <article>
            <Link className="btn btn-primary btn-sm" href={`/clinic/${params.clinic_id}/admin`}>
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                администратор
            </Link>

            <br/>

            <h1>Договора</h1>

            <br/>

            <p><b>Договора организации:</b> {
                searchParams.org_id ?
                    <>{org.title} / <Link href={`/clinic/${params.clinic_id}/admin/org`}>Изменить</Link></> :
                    <Link href={`/clinic/${params.clinic_id}/admin/org`}>Выбрать</Link>}
            </p>

            <br/>

            {searchParams.org_id ?
                <Link type="button" className="btn btn-outline-success"
                      href={`/clinic/${params.clinic_id}/admin/contract/add?org_id=${searchParams.org_id}`}> Новый
                    договор + </Link> :
                <div className="alert alert-warning" role="alert">
                    Выберите организацию, чтобы <b>добавить</b> договор
                </div>}

            <br/>
            <br/>

            <ContractList
                list={arContract.items}
                clinic_id={params.clinic_id}
                org_id={searchParams.org_id}
            />

            <br/>

            <Pagination searchParams={searchParams} url={url} count={arContract.count} step={step}/>
        </article>
    )
}
