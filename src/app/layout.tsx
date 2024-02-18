// @ts-nocheck
import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import "fontawesome-free-v6/css/all.css"
import '@/app/globals.sass'
import Navbar from '@/component/menu/navbar/server'
import Sidebar from '@/component/menu/sidebar/server'
import Toast from '@/component/toast/list'
import StoreProvider from '@/store/StoreProvider'
import style from './style.module.sass'

export const metadata: Metadata = {
  title: 'Клиника здоровья',
  description: '',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
        <body>
        <StoreProvider>
            <Toast/>
            <Navbar/>
            <div className={style.container}>
                <div className={style.sideBar}>
                    <Sidebar/>
                </div>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </StoreProvider>
        </body>
        </html>
    )
}
