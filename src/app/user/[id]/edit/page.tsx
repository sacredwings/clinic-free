import UserEdit from '@/component/user/form'
import {ServerResearchGet, ServerSpecialistGet, ServerUserGetById} from "@/component/function/url_api";


export default async function User ({
                                  params,
                                  //searchParams
                              }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let user = await ServerUserGetById({ids: [params.id]}, {cookies:null})
    let specialist = await ServerSpecialistGet({
        offset: 0,
        count: 100
    }, {cookies:null})
    let research = await ServerResearchGet({
        offset: 0,
        count: 100
    }, {cookies:null})
    return (
        <div className="card">
            <div className="card-body">
                <h1>Пользователь / редактирование</h1>
                <UserEdit user={user[0]} specialist={specialist} research={research}/>
            </div>
        </div>
    )
}
