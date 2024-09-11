// @ts-nocheck
import {ServerClinicGet, ServerClinicGetById, ServerRoleGet} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Link from "next/link";
import List from "@/component/role/list";

export default async function Role ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { page: number, q: string }
}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/role`

    let account = await ServerAccountGet({cookies: cookies()})
    let list = await ServerRoleGet({
        clinic_id: params.clinic_id
    }, {cookies: cookies()})

    return (
        <div>

            <div>
                <p>Список ролей клиники</p>

                <List list={list} accessAdd={true} clinic={{_id: params.clinic_id}}/>
            </div>


        </div>
    )

}

