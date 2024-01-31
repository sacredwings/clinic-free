// @ts-nocheck
import Style from "./element.module.sass";
import React from "react";
import Link from "next/link";
export default async function Search ({element}) {

    return (
        <li className="list-group-item">
            <Link href={`/user/${element._id}`}>{element.second_name} {element.first_name} {element.last_name}</Link>
            <br/>
            <Link type="button" className="btn btn-outline-success btn-sm" href={`/user/${element._id}/edit`}> редактировать ... </Link>
        </li>
    )

}