// @ts-nocheck
import type { Metadata } from 'next'
import Telegram from '@/component/auth/telegram'

export default function TelegramPage () {
    return (
        <main>
            <div className={'text-center'} style={{padding: '20px'}}>
                <h1>Вход с помощью телеграм</h1>
                <Telegram />
            </div>
        </main>
    )
}

export async function generateMetadata({ params }): Promise<Metadata> {
    return { title: 'Вход с помощью телеграм' }
}