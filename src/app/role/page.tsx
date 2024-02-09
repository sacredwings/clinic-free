// @ts-nocheck
import RoleList from '@/component/role/list'
import {ServerRoleGet} from "@/component/function/url_api";
import {cookies} from "next/headers";

export default async function Role ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let arRole = await ServerRoleGet({
        offset: 0,
        count: 10000
    }, {cookies:cookies()})
    return (
        <>
            <RoleList list={arRole}/>
        </>
    )
}
