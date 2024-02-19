// @ts-nocheck
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Пользователи',
    description: 'Пользователи сайта',
}

export default function Layout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <main className={'container'} style={{maxWidth: '960px'}}>
            <div className={'row'}>
                <div className={'col-12'}>
                    {children}
                </div>
            </div>
        </main>
    )
}
