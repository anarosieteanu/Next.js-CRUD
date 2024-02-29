import '@/styles/globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Proiect Pibd',
  description: 'By Ana',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto h-screen max-w-7xl bg-gray-300 pt-5 font-medium ">
          {children}
        </div>
      </body>
    </html>
  )
}
