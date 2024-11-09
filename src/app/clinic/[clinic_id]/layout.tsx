// @ts-nocheck
import Link from "next/link";
import {ServerClinicGetById} from "@/component/function/url_api";
//import {cookies} from "next/headers";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Menu from '@/component/clinic/menu/navigation'
import {cookies} from "next/headers";
import React from "react";
export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode,
    params: { clinic_id: string }
}) {

    let clinic = await ServerClinicGetById({
        ids: [params.clinic_id]
    }, {cookies: cookies()})
    clinic = clinic[0]

    return (
        <>
            <Menu clinic={clinic}/>

            <div className={"publicBlock"}>
                <h1>{clinic.title}</h1>
            </div>

            {children}
        </>

    )
}
