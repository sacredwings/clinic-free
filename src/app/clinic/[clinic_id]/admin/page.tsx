// @ts-nocheck
import {cookies} from "next/headers";
import Link from "next/link";
import React from "react";
import Style from "@/app/clinic/[clinic_id]/style.module.sass";

export default async function ClinicId ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {

    return (
        <div className={Style.page}>
            <div className={"publicContainer"}>
                <Link href={`/clinic/${params.clinic_id}/admin/appointment`}>
                    <div className={"publicCard"}>
                        Приемы
                    </div>
                </Link>

                <Link href={`/clinic/${params.clinic_id}/admin/org`}>
                    <div className={"publicCard"}>
                        Организации
                    </div>
                </Link>

                <Link href={`/clinic/${params.clinic_id}/admin/contract`}>
                    <div className={"publicCard"}>
                        Договора
                    </div>
                </Link>

                <Link href={`/clinic/${params.clinic_id}/admin/prof-examination`}>
                    <div className={"publicCard"}>
                        Проф. осмотры
                    </div>
                </Link>
            </div>
        </div>
    )

}

