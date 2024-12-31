// @ts-nocheck
import {cookies} from "next/headers";
import Link from "next/link";
import React from "react";

export default async function ClinicId ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {

    return (
        <div className={"publicPage"}>
            <div className={"publicContainer"}>
                <Link href={`/clinic/${params.clinic_id}/edit/role`}>
                    <div className={"publicCard"}>
                        Роли
                    </div>
                </Link>
            </div>
        </div>
    )

}

