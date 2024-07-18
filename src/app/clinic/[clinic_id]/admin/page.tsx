// @ts-nocheck
import {cookies} from "next/headers";
import Link from "next/link";

export default async function ClinicId ({
                                            params,
                                            searchParams
                                        }:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {


    return (
        <div>
            <div>
                <p>Клиника панель Админа</p>
            </div>

            {params.clinic_id}

            <br/>
            <Link href={`/clinic/${params.clinic_id}/admin/appointment`}>Приемы</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/admin/org`}>Организации</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/admin/contract`}>Договора</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/admin/prof-examination`}>Проф. осмотры</Link>
        </div>
    )

}

