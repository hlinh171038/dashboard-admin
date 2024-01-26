"use client"

import useSidebar from "@/app/hooks/useSidebar"
import Sidebar from "./sidebar"
import { cn } from "@/lib/utils"

const SidebarCover = ({children}:{children:React.ReactNode}) =>{

    const sidebar = useSidebar()
    return (
        <div className={cn('bg-slate-600  overflow-hidden transition-all duration-300 h-screen',
                        !sidebar.isOpen && 'translate-x-[-100%] w-0 ' ,
                        sidebar.isOpen && ' translate-x-0 w-[25%] '
                        
                    )}
        >
            {children}
        </div>
    )
}

export default SidebarCover