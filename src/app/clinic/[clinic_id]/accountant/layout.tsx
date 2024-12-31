// @ts-nocheck

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <div>
                <p><span class="badge text-bg-secondary">Бухгалтер</span></p>
            </div>
            <main>
                {children}
            </main>
        </>
    )
}
