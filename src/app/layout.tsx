import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/app/globals.sass'
import Navbar from '@/component/menu/navbar/server'
import Toast from '@/component/toast/list'
import Provider from '@/store/provider'
import ReactYandexMetrika from '@/component/metrika/react-yandex-metrika'

export const metadata: Metadata = {
  title: 'Сайт для Военных',
  description: 'Сайт, форум, приложение для Военных',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="ru">
      <body>
      <Provider>
          <Toast />
          <Navbar />
          {children}
      </Provider>
      </body>
      </html>
  )
}
