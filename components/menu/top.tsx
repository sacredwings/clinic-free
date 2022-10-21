import Link from 'next/link'

export default function () {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link href="/"><a className="navbar-brand" >ООО "Пульсар"</a></Link>
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
                                <Link href={'/org'}>
                                    <a className="dropdown-item" aria-current="page">Организации</a>
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link href={'/proffiz'}>
                                    <a className="dropdown-item" aria-current="page">Физ. лица</a>
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
                                <Link href={'/hf/constructor'}><a className="dropdown-item">Вредный фактор</a></Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <Link href={'/contract-type/constructor'}><a className="dropdown-item">Типы договоров</a></Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}