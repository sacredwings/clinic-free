// @ts-nocheck
import UserEdit from '@/component/user/form'
import {ServerResearchGet, ServerSpecialistGet, ServerUserGet, ServerUserGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import {interfaceUserGet} from "@/component/function/url_api_type";
import UserSearchList from '@/component/user/search/list'

export default async function User ({
                                        params,
                                        searchParams
                                    }:{
    params: { id: string },
    searchParams: { page: number, q: string }
}) {
    return (
        <>
            <UserSearchList searchParams={searchParams}/>
        </>
    )
}
