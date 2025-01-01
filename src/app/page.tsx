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
                    <div className={"publicCard publicCardDisable"}>
                        Врачи (в разработке)
                    </div>
                </Link>
                <Link href={'/service'}>
                    <div className={"publicCard publicCardDisable"}>
                        Услуги (в разработке)
                    </div>
                </Link>
                <Link href={'/diagnostic'}>
                    <div className={"publicCard publicCardDisable"}>
                        Диагностика (в разработке)
                    </div>
                </Link>
            </div>
        </main>
    )
}
