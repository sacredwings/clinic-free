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
                <p><span class="badge text-bg-secondary">Администратор</span></p>
            </div>
            <main>
                {children}
            </main>
        </>
    )
}
