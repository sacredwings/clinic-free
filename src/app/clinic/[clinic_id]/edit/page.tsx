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
            <div>
                <p>Клиника панель Настроек</p>
            </div>

            {params.clinic_id}

            <br/>
            <Link href={`/clinic/${params.clinic_id}/edit/role`}>Роли</Link>
        </div>
    )

}

