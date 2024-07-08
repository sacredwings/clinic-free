// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import style from "./style.module.sass";
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

    const onClick = async (clinic_id) => {
        let arFields = {
            clinic_id: clinic_id,
        }

        let result = await ServerAccountSelectClinic(arFields)
    }

    return (
        <div onClick={()=>{onClick(element._id)}}>
            <Link href={`/clinic/${element._id}`}>{element.title}</Link>
        </div>
    )
}
