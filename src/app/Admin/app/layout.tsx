import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'HealthCare Dashboard',
  description: 'Healthcare management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}