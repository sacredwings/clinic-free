// @ts-nocheck

import Link from "next/link";
import {ServerClinicGetById} from "@/component/function/url_api";
import {cookies} from "next/headers";

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
            <div>
                {/*<h1>{clinic.title}</h1>*/}
                <p>Администратор</p>

                {/*
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${params.clinic_id}/admin/appointment`}>Приемы</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${params.clinic_id}/admin/org`}>Организации</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${params.clinic_id}/admin/contract`}>Договора</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${params.clinic_id}/admin/prof-examination`}>Проф. осмотры</Link>
                    </li>
                </ul>*/}
            </div>
            <main>
                {children}
            </main>
        </>

    )
}
