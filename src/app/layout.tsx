import Banner from '@components/common/Banner'
import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

const kanit = Kanit({ weight: '400', subsets: ['thai'] })

export const metadata: Metadata = {
  title: 'May The Luck',
  description: 'A simulation lottory app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={kanit.className}>
        <Banner />
        <main className='max-w-[720px] min-h-screen mx-auto p-5 pt-10 bg-zinc-900'>
          {children}
        </main>
      </body>
    </html>
  )
}
