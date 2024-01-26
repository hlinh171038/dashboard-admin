"use client"

import useSidebar from "@/app/hooks/useSidebar"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { cn } from "@/lib/utils"



const NavbarCover = (
    {children}:
    {
        children:React.ReactNode
    }
) =>{

    const sidebar = useSidebar()
    return (
        <div className={cn("bg-slate-900/90 flex-initial  duration-300 w-full h-screen ",
                    sidebar.isOpen && ""
                )}>
           {children}
        </div>
    )
}

export default NavbarCover