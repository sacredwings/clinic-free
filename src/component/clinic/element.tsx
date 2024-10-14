// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import Style from "./style.module.sass";
//import MinioFileViewer from "@/component/file/viewer";
import Link from "next/link";
import LikeElementList from "@/component/like/elementList";
import {DateFormat} from "@/utility/time";
import {ServerAccountSelectClinic, ServerClinicAdd} from "@/component/function/url_api";

export default function Element ({element, accessEdit, accessDelete, ElementDelete}) {
    let [form, setForm] = useState(element)
    let [edit, setEdit] = useState(false)

    useEffect(() => {
        (async () => {

        })()
    }, [])

    /*
    const onClick = async (clinic_id) => {
        let arFields = {
            clinic_id: clinic_id,
        }

        let result = await ServerAccountSelectClinic(arFields)
    }
    */

    return (
        <Link href={`/clinic/${element._id}`}>
            <div className={"publicCard"}>
                {element.title}
            </div>
        </Link>
    )

    return (
        <Link href={`/clinic/${element._id}`}>
            <div onClick={()=>{onClick(element._id)}} className={"publicCard"}>
                {element.title}
            </div>
        </Link>
    )
}
