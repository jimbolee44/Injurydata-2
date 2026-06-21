import './globals.css'

export const metadata = {
  title: 'Injury Data — 20WC_202511',
  description: 'Workers comp case records',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
