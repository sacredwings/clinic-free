// @ts-nocheck
import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import "fontawesome-free-v6/css/all.css"
import '@/app/globals.sass'
import Navbar from '@/component/menu/navbar/server'
import Toast from '@/component/toast/list'
import StoreProvider from '@/store/StoreProvider'
import ReactYandexMetrika from '@/component/metrika/react-yandex-metrika'

export const metadata: Metadata = {
  title: 'Клиника здоровья',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ru">
      <body>
      <StoreProvider>
          <Toast/>
          <Navbar/>
          {children}
      </StoreProvider>
      </body>
      </html>
  )
}
