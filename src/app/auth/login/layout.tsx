// @ts-nocheck
//import './globals.css'
//import 'bootstrap/dist/css/bootstrap.min.css'

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className={'container'}>
            <div className={'row'}>
                {children}
            </div>
        </div>
    )
}