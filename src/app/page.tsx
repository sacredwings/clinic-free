// @ts-nocheck
import Image from 'next/image'
import Link from "next/link";

export default function Home() {
    return (
        <main className={'container'} style={{maxWidth: '540px'}}>
            <Link href={'/clinic'}>Клиники</Link>
            <br/>
            <Link href={'/doctor'}>Врачи</Link>
            <br/>
            <Link href={'/user'}>Пользователи</Link>
        </main>
    )
}
