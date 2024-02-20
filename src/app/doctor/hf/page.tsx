// @ts-nocheck
import DoctorList from '@/component/doctor/list'
import {
    ServerWorkerGet,
    ServerSpecialistGet,
    ServerWorkerEdit,
    ServerWorkerGetById, ServerWorkerGetDoctor
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";


export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let worker = await ServerWorkerGetDoctor({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Пациенты</h1>

            <br/>
            <br/>
            <DoctorList worker={worker}/>
        </>
    )
}
