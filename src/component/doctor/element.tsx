// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import style from "./style.module.sass";
//import MinioFileViewer from "@/component/file/viewer";
import Link from "next/link";
import LikeElementList from "@/component/like/elementList";
import {DateFormat} from "@/utility/time";

export default function Element ({element, accessEdit, accessDelete, ElementDelete}) {
    let [form, setForm] = useState(element)
    let [edit, setEdit] = useState(false)

    useEffect(() => {
        (async () => {

        })()
    }, [])

    return (
        <div>
            {element.title}

        </div>
    )
}
