"use client"

import useSidebar from "@/app/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { BsCCircleFill } from "react-icons/bs";

const Footer = () =>{
    const sidebar = useSidebar()
    console.log(sidebar)
    return (
        <div className={cn("flex w-full transition duration-200 bg-slate-900/90 border-top-1 border-slate-900",
            
        )}>
            <div className={cn("",
                sidebar.isOpen ? "w-[25%]": "w-0"
            )}></div>
            <div  className={cn("flex justify-between items-center w- text-neutral-200 text-[13px] py-2 px-2",
                     sidebar.isOpen ? "w-[75%]": "w-full"
            )}>
                <div>Linh Thai</div>
                <div className="flex items-center justify-start ">
                    <BsCCircleFill className="w-4 h-4 "/>
                    <p>opyright belong to Linh Thai</p>
                </div>
            </div>
        </div>
    )
}

export default Footer