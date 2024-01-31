// @ts-nocheck
import type { Metadata } from 'next'
import Auth from '@/component/auth/login'

export default function Login () {
    return (
        <main>
            <Auth />
        </main>
    )
}

export async function generateMetadata({ params }): Promise<Metadata> {
    return { title: 'Вход' }
}