// @ts-nocheck
import {ServerAccountGet, ServerRoleGet, ServerPermissionGet} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Link from "next/link";
import Add from "@/component/clinic/edit/role/add";

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
    let listRole = await ServerRoleGet({
        clinic_id: params.clinic_id
    }, {cookies: cookies()})
    let listPermission = await ServerPermissionGet({
    }, {cookies: cookies()})

    let error = false
    const ListError = (list) => {
        return list.map((item, i)=>{
            if (item.code) {
                error = true
                return <div key={i} className="alert alert-warning" role="alert">
                    <b>{item.code}</b> {item.msg}
                </div>
            }
        })
    }

    const ListContent = () => {
        if (!error)
            return <Add listPermission={listPermission.response} listRole={listRole.response} accessAdd={true} clinic={{_id: params.clinic_id}}/>
    }

    return (
        <div>
            <p>Создание роли</p>

            {ListError([account, listRole, listPermission])}

            {ListContent()}
        </div>
    )

}

