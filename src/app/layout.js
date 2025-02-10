import './globals.css'

export const metadata = {
  title: 'Salary Scout',
  description: 'Know your worth, grow your career',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}