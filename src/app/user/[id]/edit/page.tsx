import UserEdit from '@/component/user/edit'
import {ServerUserGetById} from "@/component/function/url_api";

export default async function User ({
                                  params,
                                  //searchParams
                              }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let user = await ServerUserGetById({ids: [params.id]}, {cookies:null})

    return (
        <div className="card">
            <div className="card-body">
                <h1>Пользователь / редактирование</h1>
                <UserEdit user={user[0]}/>
            </div>
        </div>
    )
}
