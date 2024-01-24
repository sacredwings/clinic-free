import {
    ServerContractGetById,
    ServerHfGet,
    ServerOrgGetById,
    ServerResearchGet,
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


    return (
        <>
            <h1>Новый работник</h1>
            <UserAdd specialist={specialist.items} research={research.items}/>
        </>
    )
}