import RoleList from '@/component/role/list'
import {ServerResearchGet, ServerSpecialistGet, ServerWorkerGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from "next/link";

export default async function Role ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    return (
        <>
            <RoleList />
        </>
    )
}
