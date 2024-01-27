import {
    ServerContractGetById,
    ServerHfGet,
    ServerOrgGetById,
    ServerResearchGet,
    ServerSpecialistGet
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'
import WorkerAdd from "@/component/worker/add";

export default async function Constructor ({
    params
}:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let contract = await ServerContractGetById({ids: [params.id]}, {cookies:cookies()})
    contract = contract[0]
    return (
        <>
            <h1>Новый работник</h1>
            <Link href={`/contract/${contract._id}/worker`} type="button" className="btn btn-primary btn-sm">
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                договор
            </Link>
            <WorkerAdd contract={contract}/>
        </>
    )
}
