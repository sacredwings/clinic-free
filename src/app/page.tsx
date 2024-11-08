// @ts-nocheck
import Link from "next/link";
import Style from './style.module.sass'

export default function Home() {
    return (
        <main className={"publicPage"}>
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
                <Link href={'/service'}>
                    <div className={"publicCard"}>
                        Услуги
                    </div>
                </Link>
                <Link href={'/diagnostic'}>
                    <div className={"publicCard"}>
                        Диагностика
                    </div>
                </Link>
            </div>
        </main>
    )
}
