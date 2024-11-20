// @ts-nocheck
import {
    ServerContractGet,
    ServerContaractGetById, ServerProfExaminationGet, ServerContractGetById, ServerOrgGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import ProfExaminationList from "@/component/clinic/admin/prof-examination/list";
import Pagination from "@/component/menu/pagination";
import React from "react";
import Link from "next/link";

export default async function ProfExaminationGet ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { contract_id: string, page: number, q: string, order: number, order_by: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/clinic/${params.clinic_id}/admin/prof-examination`

    let org
    let contract
    if (searchParams.contract_id) {
        contract = await ServerContractGetById({ids: [searchParams.contract_id]}, {cookies: cookies()})
        contract = contract[0]

        org = await ServerOrgGetById({ids: [contract.org_id]}, {cookies: cookies()})
        org = org[0]
    }

    let arProfExamination = await ServerProfExaminationGet({
        clinic_id: params.clinic_id,

        q: searchParams.q,
        contract_id: searchParams.contract_id,

        count: step,
        offset: (page - 1) * step,

        order: searchParams.order,
        order_by: searchParams.order_by,
    }, {cookies:cookies()})

    return (
        <article>
            <Link className="btn btn-primary btn-sm" href={`/clinic/${params.clinic_id}/admin`}>
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                администратор
            </Link>

            <br/>

            <h1>Проф. осмотр </h1>

            <br/>

            <p><b>Организация:</b> {
                searchParams.contract_id ?
                    <>{org.title} / <Link href={`/clinic/${params.clinic_id}/admin/org`}>Изменить</Link></> :
                    <Link href={`/clinic/${params.clinic_id}/admin/org`}>Выбрать</Link>}
            </p>

            <p><b>Договор:</b> {
                searchParams.contract_id ?
                    <>{contract.title} / <Link href={`/clinic/${params.clinic_id}/admin/contract`}>Изменить</Link></> :
                    <Link href={`/clinic/${params.clinic_id}/admin/contract`}>Выбрать</Link>}
            </p>

            {searchParams.contract_id ?
                <Link type="button" className="btn btn-outline-success"
                      href={`/clinic/${params.clinic_id}/admin/prof-examination/add?contract_id=${searchParams.contract_id}`}>Добавить
                    проф.
                    осмотр + </Link> :
                <div className="alert alert-warning" role="alert">
                    Выберите договор, чтобы <b>добавить</b> проф. осмотр
                </div>}

            <br/>
            <br/>

            <ProfExaminationList
                list={arProfExamination.items}
                clinic_id={params.clinic_id}
                //org_id={searchParams.org_id}
                contract_id={searchParams.contract_id}
                searchParams={searchParams}
            />

            <br/>

            <Pagination searchParams={searchParams} url={url} count={arProfExamination.count} step={step}/>
        </article>
    )
}
