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
                <p>Клиника панель Клиента</p>
            </div>

            {params.clinic_id}

            <br/>
            <Link href={`/clinic/${params.clinic_id}/doctor/appointment`}>Список приемов</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/doctor/prof-examination`}>Список проф. осмотров</Link>
            <br/>
            <Link href={`/clinic/${params.clinic_id}/doctor/services`}>Список услуг</Link>
        </div>
    )

}

