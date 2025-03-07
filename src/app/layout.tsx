import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@components/navbar'
import Footer from '@components/footer'
import { fonts } from '@utils/fonts'

export const metadata: Metadata = {
  title: "Goinup Vertical",
  description: "Circuito di gare vertical a scopo benefico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${fonts.map(font => font.variable).join(' ')} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <div className="px-4 py-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
