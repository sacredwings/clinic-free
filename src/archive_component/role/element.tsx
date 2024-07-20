// @ts-nocheck
'use client'
import React, {useState, useEffect} from 'react'
import Link from "next/link";


export default function Element ({clinic_id, element}) {
    return (
        <div >
            <Link href={`/clinic/${clinic_id}/role/${element._id}`}>{element.name}</Link>
        </div>
    )
}
