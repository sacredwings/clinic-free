// @ts-nocheck
import type { Metadata } from 'next'

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
