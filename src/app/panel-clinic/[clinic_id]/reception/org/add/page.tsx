// @ts-nocheck
import OrgAdd from '@/component/org/add'
import {ServerOrgGet, ServerSpecialistGet, ServerWorkerGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {

    return (
        <>
            <h1>Новая организация</h1>
            <OrgAdd />
        </>
    )
}
