import React, {Component, useState, useEffect, useRef} from 'react'
import Link from 'next/link'



export default function ({Logout, user}) {
    let [q, setQ] = useState('') //поисковая фраза
    const [showNotify, setShowNotify] = useState(false)

    const UserButton = () => {
        return <form className="d-flex">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                       role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user.login}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right" style={{left: 'auto', right: 0}}
                        aria-labelledby="navbarDropdownMenuLink">
                        <li><Link href={`/user/${user._id}`} className="dropdown-item">Моя страница</Link></li>
                        <li><Link href="/setting" className="dropdown-item">Настройки</Link></li>
                        <div className="dropdown-divider"/>
                        <li><Link href="/" className="dropdown-item" onClick={Logout}>Выход</Link></li>
                    </ul>
                </li>
            </ul>
        </form>
    }

    const AuthRegButton = () => {
        return <form className="d-flex">
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link href="/auth" className="nav-link">Вход</Link>
                </li>

                <li className="nav-item">
                    <Link href="/reg" className="nav-link">Регистрация</Link>
                </li>

            </ul>
        </form>
    }

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link href="/" className="navbar-brand">ООО "Пульсар"</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">

                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            Проф. осмотр
                        </a>

                        <ul className="dropdown-menu">
                            <li>
                                <Link href={'/org'} className="dropdown-item" aria-current="page">
                                    Организации
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link href={'/proffiz'} className="dropdown-item" aria-current="page">
                                    Физ. лица
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item dropdown">

                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                            Коструктор
                        </a>

                        <ul className="dropdown-menu">
                            <li>
                                <Link href={'/hf/constructor'} className="dropdown-item">Вредный фактор</Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link href={'/contract-type/constructor'} className="dropdown-item">Типы договоров</Link>
                            </li>
                        </ul>
                    </li>
                </ul>

                {user.auth ? UserButton() : AuthRegButton()}
            </div>
        </div>
    </nav>
}