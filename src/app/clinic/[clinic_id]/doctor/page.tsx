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

            <div className={"publicBlock"}>
                <div className={"publicContainer"}>

                    <Link href={`/clinic/${params.clinic_id}/doctor/prof-examination`}>
                        <div className={"publicCard"}>
                            Приемы
                        </div>
                    </Link>

                    <Link href={`/clinic/${params.clinic_id}/doctor/appointment`}>
                        <div className={"publicCard"}>
                            Проф. осмотры
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    )

}

