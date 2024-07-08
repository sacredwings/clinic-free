// @ts-nocheck
import {
    ServerContractGetById,
    ServerHfGet,
    ServerOrgGetById,
    ServerResearchGet,
    ServerSpecialistGet
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import ClinicAdd from "@/component/clinic/add";

export default async function Constructor ({
                                               params
                                           }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    return (
        <ClinicAdd/>
    )
}
