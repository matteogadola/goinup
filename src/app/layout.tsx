import '@/app/globals.css'
import { fonts } from '@/lib/fonts'

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${fonts.map(font => font.variable).join(' ')}`}>
      <head>
        <link rel="icon" type="image/png" href="favicon.ico" />
      </head>
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  )
}
