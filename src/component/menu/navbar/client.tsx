'use client'
import {useEffect, useState} from "react";
import Link from "next/link"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {AuthDel, AuthUpdate} from '@/store/myUser'
import config from '../../../../config.json'
import { useRouter } from 'next/navigation';
import Style from "./navbar.module.sass";

export default function Navbar ({resAccount}) {
    const myUser = useAppSelector((state) => state.myUser)
    const dispatch = useAppDispatch()
    let [user, setUser] = useState(resAccount)

    useEffect(() => {
        (async () => {
            setUser(myUser)
        })()
    }, [myUser])

    useEffect(() => {
        (async () => {
            typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null

            LogIn(resAccount)
        })()

    }, [])

    const LogIn = (account) => {
        if (!account) return
        dispatch(AuthUpdate({
            _id: account._id,
            login: account.login,
        }))
    }

    const LogOut = () => {
        dispatch(AuthDel())
    }

    const Auth = () => {
        return <div className="d-flex">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.login}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right" style={{left: 'auto', right: 0}}
                        aria-labelledby="navbarDropdownMenuLink">
                        <li><Link legacyBehavior href={`/user/${user._id}`}><a className="dropdown-item" >Моя страница</a></Link></li>
                        <li><Link legacyBehavior href={"/setting"}><a className="dropdown-item" >Настройки</a></Link></li>
                        <div className="dropdown-divider"/>
                        <li><Link legacyBehavior href="/"><a className="dropdown-item" onClick={LogOut}>Выход</a></Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    }

    const NoAuth = () => {
        return <div className="d-flex">
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link legacyBehavior href={"/auth/login"}><a className="nav-link">Вход</a></Link>
                </li>

                <li className="nav-item">
                    <Link legacyBehavior href={"/auth/reg"}><a className="nav-link">Регистрация</a></Link>
                </li>

            </ul>
        </div>
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white shadow p-2 mb-2">
            <div className="container-fluid">
                <Link className="navbar-brand" href={'/'}>ООО "Пульсар"</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href={'#'} role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Навигация
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href={'/org'}>Проф. осмотр</Link></li>
                                <div className="dropdown-divider"/>
                                <li><Link className="dropdown-item" href={'/user'}>Пользователи</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href={'#'} role="button" data-bs-toggle="dropdown"
                                  aria-expanded="false">
                                Кострукторы
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href={'/hf/constructor'}>Вред. факторы</Link></li>
                                <li><Link className="dropdown-item" href={'/contract-type/constructor'}>Типы договоров</Link></li>
                            </ul>
                        </li>
                    </ul>

                    {user && user._id ? Auth() : NoAuth()}
                </div>
            </div>
        </nav>
    )
}