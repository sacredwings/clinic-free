// @ts-nocheck
'use client'
import {useEffect, useState} from "react";
import Link from "next/link"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {AuthDel, AuthUpdate} from '@/store/reducer/myUser'
import style from './style.module.sass'

export default function Navbar ({resAccount}) {
    const myUser = useAppSelector((state) => state.myUser)
    const dispatch = useAppDispatch()
    let [user, setUser] = useState(resAccount)

    useEffect(() => {
        (async () => {
            setUser(myUser)
        })()
    }, [myUser])


    const Auth = () => {
        return <>

            <div className={style.block}>
                <h1>Мед. комиссии</h1>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link href={'/org'}>Организации</Link>
                    </li>
                    <li className="list-group-item">
                        <Link href={'/hf/constructor'}>Вредные факторы</Link>
                    </li>
                    <li className="list-group-item">
                        <Link href={'/contract-type/constructor'}>Типы договоров</Link>
                    </li>
                    <li className="list-group-item">
                        <Link href={'/doctor/hf'}>Врач</Link>
                    </li>
                </ul>
            </div>

            <div className={style.block}>
                <h1>Пользователи</h1>

                <ul className="list-group list-group-flush">
                <li className="list-group-item">
                        <Link href={'/user'}>Пользователи</Link>
                    </li>
                    <li className="list-group-item">
                        <Link href={'/role'}>Роли</Link>
                    </li>
                </ul>
            </div>
        </>
    }

    const NoAuth = () => {
        return <>
            <div className={style.block}>
                <h1>Авторизация</h1>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <Link href={'/auth/login'}>Вход</Link>
                    </li>
                </ul>
            </div>
        </>
    }

    return (
        <div className={style.sideBar}>
            {user && user._id ? Auth() : NoAuth()}
        </div>
    )
}