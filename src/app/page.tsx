// @ts-nocheck
import Link from "next/link";
import Style from './style.module.sass'

export default function Home() {
    return (
        <main className={Style.page}>
            <div className={"publicContainer"}>
                <Link href={'/clinic'}>
                    <div className={"publicCard"}>
                        Клиники
                    </div>
                </Link>
                <Link href={'/doctor'}>
                    <div className={"publicCard"}>
                        Врачи
                    </div>
                </Link>
                <Link href={'/user'}>
                    <div className={"publicCard"}>
                        Пользователи
                    </div>
                </Link>
            </div>
        </main>
    )
}
