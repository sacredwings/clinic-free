// @ts-nocheck
import style from "./style.module.sass";
import React from "react";
import Link from "next/link";

export default function RoleElement ({element}) {
    return (
        <div className={style.card}>
            {element.title}
        </div>
    )
}
