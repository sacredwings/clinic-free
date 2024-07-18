// @ts-nocheck

import {ServerRoleGet, ServerClinicGetById} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Link from "next/link";

export default async function Role ({
                                        params,
                                        searchParams
                                    }:{
    params: { clinic_id: string, id: string },
    searchParams: { page: number, q: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/role`



    return (
        <div>

            <div>
                <p>Роль</p>
                <p>
                    {params.id}
                </p>
            </div>


        </div>
    )

}

