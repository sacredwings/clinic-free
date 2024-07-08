// @ts-nocheck
import {cookies} from "next/headers";
import Link from "next/link";

export default async function ClinicId ({
                                            params,
                                            searchParams
                                        }:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {


    return (
        <div>
            <Link href={`/`}>Организации</Link>
            <br/>
            <Link href={`/`}>Проф. осмотры</Link>
        </div>
    )

}

