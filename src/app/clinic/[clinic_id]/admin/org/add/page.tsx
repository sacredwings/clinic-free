// @ts-nocheck
import OrgAdd from '@/component/clinic/admin/org/add'
import {ServerOrgGet, ServerSpecialistGet, ServerWorkerGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { clinic_id: string },
    //searchParams: { page: number, q: string }
}) {

    return (
        <>
            <h1>Новая организация</h1>
            <Link className="btn btn-primary btn-sm" href={`/clinic/${params.clinic_id}/admin/org`}>
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                список организаций
            </Link>
            <OrgAdd clinic_id={params.clinic_id}/>
        </>
    )
}
