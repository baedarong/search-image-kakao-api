import { type Metadata } from 'next'
import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/tailwind.css'
import ReactQueryProviders from '@/utils/react-query-provider'
import { ToastContainer } from 'react-toastify'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const metadata: Metadata = {
  title: {
    template: '%s - DeceptiConf',
    default: 'DeceptiConf - A community-driven design conference',
  },
  description:
    'At DeceptiConf you’ll learn about the latest dark patterns being developed to trick even the smartest visitors, and you’ll learn how to deploy them without ever being detected.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full bg-white antialiased',
        inter.variable,
        dmSans.variable,
      )}
    >
      <body className="flex min-h-full">
        <ReactQueryProviders>
          <ToastContainer
            position="top-right"
            theme="colored"
            autoClose={1500}
          />
          <div className="flex w-full flex-col">{children}</div>
        </ReactQueryProviders>
      </body>
    </html>
  )
}
