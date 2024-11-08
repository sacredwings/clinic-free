// @ts-nocheck

import {ServerClinicGet, ServerClinicGetById} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Form from "@/component/menu/form";
import List from '@/component/clinic/list'
import Pagination from "@/component/menu/pagination";
import Link from "next/link";
import Style from "./style.module.sass";
import React from "react";

export default async function ClinicId ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/clinic`

    let clinic = await ServerClinicGetById({
        ids: [params.clinic_id]
    }, {cookies: cookies()})
    clinic = clinic[0]

    return (
        <div className={"publicPage"}>

            <div className={"publicBlock"}>
                <h1>{clinic.title}</h1>
            </div>

            <div className={"publicBlock"}>
                <div className={"publicContainer"}>
                    <Link href={`/clinic/${params.clinic_id}/patient`}>
                        <div className={"publicCard"}>
                            Пациент
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/doctor`}>
                        <div className={"publicCard"}>
                            Врач
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/admin`}>
                        <div className={"publicCard"}>
                            Администратор
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/accountant`}>
                        <div className={"publicCard"}>
                            Бухралтер
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/cashier`}>
                        <div className={"publicCard"}>
                            Кассир
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/reception`}>
                        <div className={"publicCard"}>
                            Регистратура
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/edit`}>
                        <div className={"publicCard"}>
                            Настройки
                        </div>
                    </Link>
                </div>
            </div>

            {/*
            <Link href={`/clinic/${params.clinic_id}/patient`}>Пациент</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/doctor`}>Врач</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/admin`}>Администратор</Link>
            <br/>


            <Link href={`/clinic/${params.clinic_id}/accountant`}>Бухралтер</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/cashier`}>Кассир</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/reception`}>Регистратура</Link>

            <br/>
            <Link href={`/clinic/${params.clinic_id}/edit`}>Настройки</Link>*/}
        </div>
    )

}

