import { Toaster } from "sonner"
import CategoryModal from "../modals/category-modal"
import LoginModals from "../modals/login-modals"
import RegisterModal from "../modals/register-modals"
import SidebarCover from "@/components/sidebar-cover"

import NavbarCover from "@/components/navbar-cover"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Sidebar from "@/components/sidebar"



const Layout = async (
    {
        children
    }:
    {
        children:React.ReactNode
    }
) =>{

    const session = await getServerSession(authOptions)

    return (
        <div>
            <Toaster />
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
                />
              {children}
         
          </NavbarCover>
        </div>
        
        <Footer/>
        </div>
    )
}

export default Layout