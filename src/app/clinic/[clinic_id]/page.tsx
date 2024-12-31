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
                <div className={"publicContainer"}>
                    <Link href={`/clinic/${params.clinic_id}/patient`}>
                        <div className={"publicCard publicCardDisable"}>
                            Пациент (в разработке)
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/doctor`}>
                        <div className={"publicCard publicCardDisable"}>
                            Врач (в разработке)
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/admin`}>
                        <div className={"publicCard"}>
                            Администратор
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/accountant`}>
                        <div className={"publicCard"}>
                            Бухгалтер
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/cashier`}>
                        <div className={"publicCard publicCardDisable"}>
                            Кассир (в разработке)
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

        </div>
    )

}

