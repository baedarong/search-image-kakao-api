import { Footer } from '@/components/Footer'

export function Layout({
  children,
  showFooter = true,
}: {
  children: React.ReactNode
  showFooter?: boolean
}) {
  return (
    <>
      <main className="flex-auto">{children}</main>
      {showFooter && <Footer />}
    </>
  )
}
