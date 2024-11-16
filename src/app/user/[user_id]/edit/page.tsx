// @ts-nocheck
//import UserEdit from '@/component/user/edit'
//import UserEditAuth from '@/component/user/editAuth'
//import UserEditRole from '@/component/user/editRole'
//import UserEditVisit from '@/component/user/editVisit'

import {
    ServerResearchGet,
    ServerSpecialistGet,
    ServerUserGetById,
    ServerRoleGet,
    ServerUserEditAuth
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";

export default async function User ({
                                  params,
                                  searchParams
                              }:{
    params: { id: string },
    searchParams: { form: number }
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
    let role = await ServerRoleGet({
        offset: 0,
        count: 100
    }, {cookies:cookies()})

    return (
        <>
            <h1>Пользователь</h1>

            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link
                        className={(!searchParams.form || searchParams.form === 'user') ? `nav-link active` : `nav-link`}
                        aria-current="page" href="?form=user">Пользователь</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'auth') ? `nav-link active` : `nav-link`}
                          aria-current="page" href="?form=auth">Авторизация</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'role') ? `nav-link active` : `nav-link`}
                          aria-current="page" href="?form=role">Роли</Link>
                </li>
                <li className="nav-item">
                    <Link className={(searchParams.form === 'visit') ? `nav-link active` : `nav-link`}
                          aria-current="page" href="?form=visit">Приемы</Link>
                </li>
            </ul>

            {/*
            {(!searchParams.form || searchParams.form === 'user') ?
                <UserEdit user={user[0]} specialist={specialist.items} research={research.items}
                          role={role.items}/> : null}
            {(searchParams.form === 'auth') ?
                <UserEditAuth user={user[0]} specialist={specialist.items} research={research.items} role={role.items}/> : null}
            {(searchParams.form === 'role') ? <UserEditRole user={user[0]} specialist={specialist.items} research={research.items} role={role.items}/> : null}
            {(searchParams.form === 'visit') ? <UserEditVisit user={user[0]} specialist={specialist.items} research={research.items} role={role.items}/> : null}
            */}
        </>
    )
}
