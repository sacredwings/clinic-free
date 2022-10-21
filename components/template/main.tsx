import Head from "next/head" //заголовок
import {useEffect, useState} from "react"

import Top from '../menu/top' //верхнее меню
//import "bootstrap/dist/css/bootstrap.min.css" //стили bootstrap

export default function ({children, title}) {
    useEffect(() => {
        (async () => {
            //подключение bootstrap
            typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
        })()

    }, [])

    return <>
        <Head>
            <title>{title}</title>
        </Head>
        <Top/>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {children}
                </div>
            </div>
        </div>
    </>
}