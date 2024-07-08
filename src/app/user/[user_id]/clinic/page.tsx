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
            <Link href={`/`}>Клиники где ведет прием и оказывает услуги (показывать всем)</Link>
            <br/>
            <Link href={`/`}>Клиники где был на приеме или оказана услуга (показывать только мне)</Link>
        </div>
    )

}

