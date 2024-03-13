"use client"

import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useState } from "react"
import { IconType } from "react-icons/lib";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import ItemAddNew from "./item-add-new";

interface SidebarItemProps {
    link: string;
    title: string;
    addTitle?: string;
    addLink?: string;
    icon:IconType;
    addIcon?:IconType
}

const SidebarItem:React.FC<SidebarItemProps> = ({
    link,
    title,
    addTitle,
    addLink,
    icon:Icon,
    addIcon:AIcon
}) =>{
    const path = usePathname()
    const [isOpen,setIsOpen] = useState(false)
   
    return (
        <div >
            <div className={cn("pl-4 pr-2 flex items-center justify-between",
                                path === link && "bg-slate-500/60 rounded-md py-1"
                            )}>
                <Link
                    href={link} 
                    className={cn(" flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm  transition-all duration-300",
                            // path === link && "bg-slate-500/60 rounded-md py-1"
                        )}
                >
                    <Icon className="w-4 h-4" />
                    <div> {title}</div>
                </Link>
                {addTitle && addLink && AIcon && (
                     <button
                     onClick={()=>setIsOpen(!isOpen)}
                     className="transition-all duration-300 "
                 >
                     {!isOpen ? (
                         <MdOutlineKeyboardArrowDown 
                             className="w-4 h-4 text-neutral-100 hover:text-neutral-400"
                         />
                     ):(
                         <MdOutlineKeyboardArrowUp
                             className="w-4 h-4 text-neutral-100 hover:text-neutral-400"
                         />
                     )}
                 </button>
                )}
               
            </div>
            
            {addTitle && addLink && AIcon && isOpen && (
                <ItemAddNew
                    link = {addLink}
                    title={addTitle}
                    icon ={AIcon}
                />
            )}

        </div>
    )
}

export default SidebarItem