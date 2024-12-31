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
                <Link href={`/clinic/${params.clinic_id}/accountant/employee`}>
                    <div className={"publicCard"}>
                        Сотрудники
                    </div>
                </Link>
            </div>
        </div>
    )

}

