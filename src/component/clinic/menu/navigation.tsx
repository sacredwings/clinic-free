// @ts-nocheck
'use client'

import Link from "next/link";
import {ServerClinicGetById} from "@/component/function/url_api";
//import {cookies} from "next/headers";
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import {cookies} from "next/headers";

export default function Layout({clinic}) {
    //const router = useRouter()
    //const pathname = usePathname()
    //const searchParams = useSearchParams()!;
    const segments = usePathname().split('/')
    console.log(segments)

    const Navigation = (arr) => {
        return <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {segments.map((item, i)=> {
                    if (i === 0) return <li key={i} className="breadcrumb-item"><Link href="/">Главная</Link></li>
                    if (segments[1] === 'clinic') {
                        if (segments[3]==='admin') {
                            if (segments[4]==='org') {
                                if (segments[6]==='edit') {
                                    if (i === 6) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}/${segments[6]}`}>Редактирование</Link></li>
                                }
                                if (i === 4) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}`}>Организации</Link></li>
                                if (i === 5) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}`}>Текущая</Link></li>
                            }
                            if (segments[4]==='contract') {
                                if (segments[6]==='edit') {
                                    if (i === 6) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}/${segments[6]}`}>Редактирование</Link></li>
                                }
                                if (i === 4) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}`}>Договора</Link></li>
                                if (i === 5) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}`}>Текущий</Link></li>
                            }
                            if (segments[4]==='prof-examination') {
                                if (segments[6]==='edit') {
                                    if (i === 6) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}/${segments[6]}`}>Редактирование</Link></li>
                                }
                                if (i === 4) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}`}>Проф. осмотры</Link></li>
                                if (i === 5) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}`}>Текущий</Link></li>
                            }
                            if (i === 3) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}/${segments[3]}`}>Администратор</Link></li>
                        }
                        if (i === 1) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}`}>Клиники</Link></li>
                        if (i === 2) return <li key={i} className="breadcrumb-item"><Link href={`/${segments[1]}/${segments[2]}`}>Текущая</Link></li>
                    }
                })}
            </ol>
        </nav>
    }
    /*
    const Navigation = (arr) => {
        return <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {segments.map((item, i)=> {
                    if (i === 0) return <li key={i} className="breadcrumb-item"><Link href="/">Главная</Link></li>
                    if (i === 1 && item==='clinic') return <li key={i} className="breadcrumb-item"><Link href={`/clinic`}>Клиники</Link></li>
                    if (i === 2 && segments[1]==='clinic') return <li key={i} className="breadcrumb-item"><Link href={`/clinic/${item}`}>Текущая</Link></li>
                    if (i === 3 && segments[1]==='clinic' && item==='admin') return <li key={i} className="breadcrumb-item"><Link href={`/clinic/${segments[2]}/admin`}>Администратор</Link></li>
                    if (i === 4 && segments[1]==='clinic' && segments[3]==='admin' && item==='org') return <li key={i} className="breadcrumb-item"><Link href={`/clinic/${segments[2]}/${segments[3]}/org`}>Организации</Link></li>
                })}
            </ol>
        </nav>
    }*/

    return (
        <>
            {Navigation()}
            <hr/>

        </>

    )

    return (
        <>
            {Navigation()}
            <hr/>
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
