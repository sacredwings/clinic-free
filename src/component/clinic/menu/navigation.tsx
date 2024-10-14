// @ts-nocheck
'use client'

import Link from "next/link";
import {ServerClinicGetById} from "@/component/function/url_api";
//import {cookies} from "next/headers";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export default function Layout({clinic}) {
    //const router = useRouter()
    //const pathname = usePathname()
    //const searchParams = useSearchParams()!;
    const segments = usePathname().split('/')
    console.log(segments)

    return (
        <>
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Library</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>

                {/*
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${clinic._id}/admin/appointment`}>Приемы</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${clinic._id}/admin/org`}>Организации</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${clinic._id}/admin/contract`}>Договора</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href={`/clinic/${clinic._id}/admin/prof-examination`}>Проф.
                            осмотры</Link>
                    </li>
                </ul>*/}
            </div>

        </>

    )
}
