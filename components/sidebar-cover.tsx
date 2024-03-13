"use client"

import useSidebar from "@/app/hooks/useSidebar"
import Sidebar from "./sidebar"
import { cn } from "@/lib/utils"

const SidebarCover = ({children}:{children:React.ReactNode}) =>{

    const sidebar = useSidebar()
    return (
        <div className={cn(' overflow-hidden transition-all duration-200 h-full w-full fixed top-0 left-0 pl-2 py-2',
                        !sidebar.isOpen && 'translate-x-[-100%] w-0 ' ,
                        sidebar.isOpen && ' translate-x-0 w-[25%] '
                        
                    )}
        >
            {children}
        </div>
    )
}

export default SidebarCover