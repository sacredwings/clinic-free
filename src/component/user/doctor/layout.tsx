// @ts-nocheck

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                Меню \ Ппользователь \ Специальности врача
            </div>
            <main className={'container'}>
                {children}
            </main>
        </>

    )
}
