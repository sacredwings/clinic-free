// @ts-nocheck
import UserEdit from '@/component/user/form'
import {ServerResearchGet, ServerSpecialistGet, ServerUserGet, ServerUserGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import {interfaceUserGet} from "@/component/function/url_api_type";
import UserSearchList from '@/component/user/search/list'
import Link from "next/link";
import React from "react";

export default async function User ({
                                        params,
                                        searchParams
                                    }:{
    params: { id: string },
    searchParams: { page: number, q: string }
}) {
    let user = await ServerUserGetById({ids: [params.id]}, {cookies:cookies()})
    user = user[0]
    return (
        <>
            <h1>Пользователь: </h1>
            <p><b>{user.second_name} {user.first_name} {user.last_name}</b></p>
            <p><Link type="button" className="btn btn-outline-success btn-sm" href={`/user/${user._id}/edit`}> редактировать ... </Link></p>
        </>
    )
}
