import WorkerId from '@/component/worker/id'
import {ServerOrgGet, ServerSpecialistGet, ServerWorkerGetById} from "@/component/function/url_api";
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function User ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    let arOrg = await ServerOrgGet({
        offset: 0,
        count: 10000
    }, {cookies:cookies()})

    const List = (arList) => {
        return <div className="list-group">
            {arList.map((list, i) => {
                let href = `/org/${list._id}/contract`
                return <Link className="list-group-item list-group-item-action" href={href} key={i}>
                    {list.name}
                </Link>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Организаций нет
        </div>
    }

    return (
        <>
            <h1>Организации <Link type="button" className="btn btn-outline-success" href={'/org/add'}> + </Link></h1>
            {(arOrg.items.length) ? List(arOrg.items) : NoList()}
        </>
    )
}
