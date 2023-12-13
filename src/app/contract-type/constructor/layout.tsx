import type { Metadata } from 'next'
//import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '@/component/menu/navbar/server'
import Toast from '@/component/toast/list'
import Provider from '@/store/provider'



export const metadata: Metadata = {
    title: 'Пользователи',
    description: 'Пользователи сайта',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <main className={'container'} style={{maxWidth: '992px'}}>
            {children}
        </main>
    )
}
