"use client"

import Image from "next/image"
import { MdArrowBackIos } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboardCustomize } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { RiContactsBookUploadFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useSidebar from "@/app/hooks/useSidebar";

const menuItems = [
    {
        title:"Home",
        icon: IoHome,
        link:"/dashboards/dashboard-home"
    },
    {
        title:"Customers",
        icon: FaUser,
        link: "/dashboards/customers"
    },
    {
        title:"Revueue",
        icon: MdAttachMoney,
        link: "/dashboards/revueue"
    },
]

const setting = [
    {
        title:"Theme",
        icon: IoIosColorPalette,
        link: "/setting/theme"

    }
]

const Sidebar = () =>{
    const path = usePathname();
    const sidebar = useSidebar()
    console.log(sidebar.isOpen)
    return (
        <div className={cn("flex flex-col h-screen"
            )}>
            <Link  href={"/dashboards/dashboard-home"} className="h-auto bg-slate-900 text-white pt-0.5 flex items-center justify-between">
                <Image src="/logo2.png" width="96" height="96" alt="logo"/>
                <MdArrowBackIos 
                    className="text-white w-5 h-5 mr-4 hover:text-slate-600 transition-all"
                    onClick={()=>sidebar.onClose()}
                />
            </Link>
            
            <div className="bg-slate-600 h-screen text-white flex flex-col gap-4 px-4 py-4">
                <Link  href={"/dashboard/dashboard-home"} 
                       className={cn("flex items-center text-white text-sm gap-4 cursor-pointer transition-all",
                                path.includes('/dashboards') && "text-slate-900 font-bold hover:text-slate-800"
                        )}
                >
                    <MdDashboardCustomize className="w-5 h-5"/>
                    <div>Dashboard</div>
                </Link>
                {menuItems.map((item)=>{
                    const Icon = item.icon
                    return (
                        <Link 
                            href={item.link} 
                            key={item.title} 
                            className={cn("ml-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm font-thin transition-all",
                                path === item.link && "text-slate-900 hover:text-slate-800 font-semibold"
                            )}>
                            <Icon className="w-4 h-4" />
                            <div> {item.title}</div>
                        </Link>
                    )
                })}
                <div className={cn("flex items-center text-white text-sm gap-4 cursor-pointer",
                    path.includes("/setting") && "text-slate-900 hover:text-slate-800 font-bold"
                )}>
                    <IoSettingsSharp className="w-5 h-5"/>
                    <div>Setting</div>

                </div>
                    {setting.map((item)=>{
                        const Icon = item.icon;
                        return (
                            <Link href={item.link} key={item.title} className={clsx("ml-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm font-thin",
                            
                                path === item.link && "text-slate-900 hover:text-slate-800 font-bold"
                            )}>
                                <Icon className="w-4 h-4" />
                                <div> {item.title}</div>
                            </Link>
                        )
                    })}
                <Link href="/contact" className={clsx("flex items-center text-white text-sm gap-4 cursor-pointer",
                    path === '/contact' && "text-slate-900 hover:text-slate-800 font-bold"
                )}>
                    <RiContactsBookUploadFill className="w-5 h-5"/>
                    <div>Contact Us</div>
                </Link>
                
            </div>
            <div onClick={()=>signOut()} className="bg-slate-900 text-white flex items-center justify-center gap-4 cursor-pointer hover:text-neutral-200">
                <div >Log out</div>
                <MdLogout className="w-4 h-4" />
            </div>
        </div>
    )
}

export default Sidebar