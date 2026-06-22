import type { Metadata } from 'next'
import '../views/App/App.css';

export const metadata: Metadata = {
  title: 'rs-react-app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
        <div id="root">{children}</div>
    </body>
    </html>
  )
}
