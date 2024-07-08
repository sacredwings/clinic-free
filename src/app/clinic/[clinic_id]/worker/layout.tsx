// @ts-nocheck

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                Меню Медицинского работника
            </div>
            <main className={'container'}>
                {children}
            </main>
        </>

    )
}
