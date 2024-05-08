import type { Metadata } from 'next'
import {Nunito} from 'next/font/google'
//import './globals.css'


// import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Sidebar from '@/components/sidebar'

import SidebarCover from '@/components/sidebar-cover'
import NavbarCover from '@/components/navbar-cover'
import Footer from '@/components/footer'
import { Toaster } from 'react-hot-toast'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getAllMail } from '../actions/getAllMail'
import { getAllUser2 } from '../actions/getAllUser2'
import { getAllComment } from '../actions/getAllComment'
import { getAllReply } from '../actions/getAllReply'
import { getAllNotify } from '../actions/getAllNotify'
import { getAllTempMail } from '../actions/getAllTempMail'
import LoginModals from '../modals/login-modals'
import CategoryModal from '../modals/category-modal'
import RegisterModal from '../modals/register-modals'
import Navbar from '@/components/navbar'






const inter = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const session = await getServerSession(authOptions)
  const mail = await getAllMail()
  const user = await getAllUser2()
  const comment = await getAllComment()
  const relly = await getAllReply()
  const notify = await getAllNotify()
  const tempMail = await getAllTempMail()
  
    

  return (

    <html lang="en">
      
     
        <body className={inter.className}>
          <LoginModals />
        <CategoryModal />
        <LoginModals />
        <RegisterModal />
        
        <div className='flex justify-start items-start w-full min-h-screen h-auto bg-slate-900/90'>
          <SidebarCover >
            <Sidebar 
              name ={session?.user?.name}
              img = {session?.user?.image}
              email = {session?.user?.email}
            />
          </SidebarCover>
            <NavbarCover >
              <Navbar 
                name ={session?.user?.name}
                img = {session?.user?.image}
                email = {session?.user?.email}
                mail = {mail}
                user = {user}
                comment = {comment}
                relly = {relly}
                notify ={notify}
                tempMail = {tempMail}
                />
                {/* <div className='h-[13vh] w-full'></div> */}
              {children}
         
          </NavbarCover>
        </div>
        
        <Footer/>
        </body>
      
       
       
    </html>
 
  )
}