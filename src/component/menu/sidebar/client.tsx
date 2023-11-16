'use client'
import {useEffect, useState} from "react";
import Link from "next/link"
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {AuthDel, AuthUpdate} from '@/store/myUser'
import {loadReCaptcha} from "recaptcha-v3-react-function-async"
import config from '../../../../config.json'
import { useRouter } from 'next/navigation';

export default function Navbar ({resAccount}) {
    const myUser = useAppSelector((state) => state.myUser)
    const dispatch = useAppDispatch()
    let [user, setUser] = useState(resAccount)

    useEffect(() => {
        (async () => {
            setUser(myUser)
        })()
    }, [myUser])


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
        <div>
            {user && user._id ? Auth() : NoAuth()}
        </div>
    )
}