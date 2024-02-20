// @ts-nocheck
'use client'

//import Styles from './profile.module.sass'
import Link from "next/link"
import {cookies} from "next/headers"
import {ServerOwnerGetById, ServerVideoGet} from "@/component/function/url_api"
//import MinioFileViewer from "@/component/file/viewer"
//import VideoAdd from "@/component/video/add";
import React, {useEffect} from "react";

export default function DoctorList ({worker}) {


    useEffect(() => {
        (async () => {
            console.log(worker)
        })()
    }, [])

    const List = () => {
        return <ul className="list-group">
            {worker.items.map((item, i)=> {

                let user = item._user_id
                return <li key={i} className="list-group-item">{user.first_name}</li>
            })}

        </ul>
    }
    return List()
}