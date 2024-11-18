// @ts-nocheck
import {
    ServerContractGet,
    ServerOrgGetById,
} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import ContractList from "@/component/clinic/admin/contract/list";
import Link from "next/link";

export default async function ContractGet ({
    params,
    searchParams
}:{
    params: { clinic_id: string },
    searchParams: { org_id: string, page: number, q: string }
}) {
    let org = await ServerOrgGetById({ids: [searchParams.org_id]}, {cookies:cookies()})
    let arContract = await ServerContractGet({
        clinic_id: params.clinic_id,

        q: params.q,
        org_id: searchParams.org_id,

        offset: 0,
        count: 1000
    }, {cookies:cookies()})

    return (
        <article>
            <h1>Договора</h1>

            <Link className="btn btn-primary btn-sm" href={`/clinic/${params.clinic_id}/admin/org`}>
                <i className="fa-solid fa-arrow-left"></i>
                &nbsp;
                список организаций
            </Link>
            <br/>
            <br/>

            {searchParams.org_id ?
                <Link type="button" className="btn btn-outline-success"
                      href={`/clinic/${params.clinic_id}/admin/contract/add?org_id=${searchParams.org_id}`}> Новый
                    договор + </Link> :
                <div className="alert alert-warning" role="alert">
                    Выберите организацию, чтобы <b>добавить</b> договор
                </div>}

            <ContractList
                list={arContract.items}
                clinic_id={params.clinic_id}
                org_id={searchParams.org_id}
            />
        </article>
    )
}
