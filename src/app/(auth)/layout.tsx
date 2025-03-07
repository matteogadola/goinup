import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar promoter="goinup" />
      <main>{children}</main>
      <Footer promoter="goinup" />
    </>
  )
}