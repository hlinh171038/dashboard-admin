import type { Metadata } from 'next'
import {Nunito} from 'next/font/google'
import './globals.css'
//import { siteConfig } from './config/site'







const inter = Nunito({ subsets: ['latin'] })

export const metadata ={
  title: "Dashboard Inside",
  description: '',
  icons: [
    {
      url: "/logo.webp",
      href: "/logo.webp"
    }
  ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  

  
    

  return (

    <html lang="en">
      
      
        <body className={inter.className}>
           {children}
        </body>
   
       
       
    </html>
 
  )
}
