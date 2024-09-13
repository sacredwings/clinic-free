// @ts-nocheck
import Style from "./list.module.sass";
import {ServerUserGet} from "@/component/function/url_api";
import {cookies} from "next/headers";
import Element from "./element";
import Form from "@/component/menu/form";
import Pagination from "@/component/menu/pagination";
import Link from "next/link";
export default async function Search ({searchParams}) {
    let page = 1
    if (searchParams.page) page = Number(searchParams.page)
    const step = 20
    const url = `/user`

    const arUsers = await ServerUserGet({
        q: searchParams.q ? searchParams.q : null,
        count: step,
        offset: (page - 1) * step
    }, {cookies: cookies()})

    return (
        <>
            <div className={Style.header}>
                <div>
                    <h1 className={Style.h1}>Пользователи <Link type="button" className="btn btn-outline-success" href={`/user/add`}> + </Link></h1>
                </div>

                <div>
                    <Form searchParams={searchParams} url={url}/>
                </div>
            </div>

            <div className={Style.content}>
                <ul className="list-group list-group-flush">
                    {arUsers.items.map((item, i)=>{
                        return <Element key={i} element={item}/>
                    })}
                </ul>
            </div>

            <div className={Style.pagination}>
                <Pagination searchParams={searchParams} url={url} count={arUsers.count} step={step}/>
            </div>

        </>
    )
}