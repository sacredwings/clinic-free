import {cookies} from "next/headers";
import Client from "./client";
import {ServerAccountGet} from "@/component/function/url_api";

export default async function ({}) {
    const resAccount = await ServerAccountGet({cookies: cookies()})

    return (
        <Client resAccount={resAccount}/>
    )

}