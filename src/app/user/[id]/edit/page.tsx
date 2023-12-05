import UserEdit from '@/component/user/form'
import {ServerResearchGet, ServerSpecialistGet, ServerUserGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'

export default async function User ({
                                  params,
                                  //searchParams
                              }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let user = await ServerUserGetById({ids: [params.id]}, {cookies:cookies()})
    let specialist = await ServerSpecialistGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})
    let research = await ServerResearchGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Пользователь / редактирование</h1>
            <UserEdit user={user[0]} specialist={specialist.items} research={research.items}/>
        </>
    )
}
