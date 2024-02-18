// @ts-nocheck
import {
    ServerContractGetById,
    ServerHfGet,
    ServerOrgGetById,
    ServerResearchGet, ServerRoleGet,
    ServerSpecialistGet
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import UserAdd from "@/component/user/add";

export default async function Constructor ({
                                               params
                                           }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let specialist = await ServerSpecialistGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})
    let research = await ServerResearchGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})
    let role = await ServerRoleGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Новый пользователь</h1>
            <UserAdd specialist={specialist.items} research={research.items} role={role.items}/>
        </>
    )
}
