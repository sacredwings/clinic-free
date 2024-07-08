// @ts-nocheck

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                Меню кассира
            </div>
            <main className={'container'}>
                {children}
            </main>
        </>

    )
}
