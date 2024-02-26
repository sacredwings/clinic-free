// @ts-nocheck
import DoctorList from '@/component/doctor/list'
import {
    ServerWorkerGet,
    ServerSpecialistGet,
    ServerWorkerEdit,
    ServerWorkerGetById, ServerAccountGet, ServerWorkerGetDoctor
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";
import React from "react";


export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let account = await ServerAccountGet({cookies:cookies()})
    let worker = await ServerWorkerGetDoctor({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <DoctorList worker={worker} account={account}/>
        </>
    )
}
