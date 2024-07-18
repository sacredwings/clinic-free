// @ts-nocheck

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                Меню Регистратуры
            </div>
            <main className={'container'}>
                {children}
            </main>
        </>

    )
}
