// @ts-nocheck

import {ServerClinicGet, ServerClinicGetById} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Form from "@/component/menu/form";
import List from '@/component/clinic/list'
import Pagination from "@/component/menu/pagination";
import Link from "next/link";

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
        <div>

            <div>
                <p>Клиника</p>
            </div>

            {clinic._id}
            <h1>{clinic.title}</h1>

            <br/>
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
            <Link href={`/clinic/${params.clinic_id}/edit`}>Настройки</Link>
        </div>
    )

}

