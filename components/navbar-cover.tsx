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
        <div className={cn(" duration-200 w-full h-auto ml-[25%]",
                    !sidebar.isOpen && "ml-0"
                )}>
           {children}
        </div>
    )
}

export default NavbarCover