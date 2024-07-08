// @ts-nocheck

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                Меню Врача
            </div>
            <main className={'container'}>
                {children}
            </main>
        </>

    )
}
