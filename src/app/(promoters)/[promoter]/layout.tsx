import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function PromoterLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {
    promoter: string
  }
}) {
  return (
    <>
      <Navbar promoter={params.promoter} />
      <main>{children}</main>
      <Footer promoter={params.promoter} />
    </>
  )
}