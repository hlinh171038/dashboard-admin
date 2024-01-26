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
import { FaBox } from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";
import { IoBag } from "react-icons/io5";
import { TbFileReport } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";

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
        link:"/dashboards"
    },
    {
        title:"Customers",
        icon: FaUser,
        link: "/dashboards/customers"
    },
    {
        title:"Products",
        icon: FaBox,
        link: "/dashboards/product"
    },
    {
        title:"Transactions",
        icon: MdAttachMoney,
        link: "/dashboards/revueue"
    },
]

const analytics = [
    {
        title:"revueue",
        icon:IoBag,
        link: "/analytics/revueue"
    },
    {
        title:"report",
        icon:TbFileReport,
        link: "/analytics/report"
    },
    {
        title:"team",
        icon:AiOutlineTeam,
        link: "/analytics/team"
    },
]

const setting = [
    {
        title:"setting",
        icon: IoSettingsSharp,
        link: "/users/setting"

    },
    {
        title:"help",
        icon: TbHelpHexagonFilled,
        link: "/users/help"

    }
]

const Sidebar = () =>{
    const path = usePathname();
    const sidebar = useSidebar()
    console.log(sidebar.isOpen)
    return (
        <div className={cn("flex flex-col h-screen rounded-md"
            )}>
            <Link  href={"/dashboards"} className="h-auto bg-slate-900 text-white pt-0.5 flex items-center justify-between">
                <Image src="/logo2.png" width="96" height="96" alt="logo"/>
                <MdArrowBackIos 
                    className="text-white w-5 h-5 mr-4 hover:text-slate-600 transition-all"
                    onClick={()=>sidebar.onClose()}
                />
            </Link>
            
            <div className="bg-slate-600/80 h-screen text-white flex flex-col gap-4 px-4 py-4">
                <Link  href={"/dashboards"} 
                       className={cn("flex items-center text-white text-sm gap-4 cursor-pointer transition-all duration-300",
                                path.includes('/dashboards') && "text-slate-900 font-bold hover:text-slate-80"
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
                            className={cn("px-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm  transition-all duration-300",
                                path === item.link && "bg-slate-500/60 rounded-md py-1"
                            )}>
                            <Icon className="w-4 h-4" />
                            <div> {item.title}</div>
                        </Link>
                    )
                })}

                {/* analyst */}
                <div className={cn("flex items-center text-white text-sm gap-4 cursor-pointer transition-all duration-300",
                    path.includes("/analytics") && "text-slate-900 hover:text-slate-800 font-bold"
                )}>
                    <IoAnalytics className="w-5 h-5"/>
                    <div>Analytics</div>
                </div>
                {analytics.map((item)=>{
                    const Icon = item.icon
                    return (
                        <Link 
                            href={item.link} 
                            key={item.title} 
                            className={cn("px-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm  transition-all duration-300",
                                path === item.link && "bg-slate-500/60 rounded-md py-1"
                            )}>
                            <Icon className="w-4 h-4" />
                            <div> {item.title}</div>
                        </Link>
                    )
                })}
                {/* setting */}
                <div className={cn("flex items-center text-white text-sm gap-4 cursor-pointer transition-all duration-300",
                    path.includes("/users") && "text-slate-900 hover:text-slate-800 font-bold"
                )}>
                    <FaUserCircle className="w-5 h-5"/>
                    <div>Users</div>

                </div>
                    {setting.map((item)=>{
                        const Icon = item.icon;
                        return (
                            <Link href={item.link} key={item.title} className={clsx("px-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm transition-all duration-300 ",
                            
                                path === item.link && "bg-slate-500/60 rounded-md py-1"
                            )}>
                                <Icon className="w-4 h-4" />
                                <div> {item.title}</div>
                            </Link>
                        )
                    })}
                
                
            </div>
            <div onClick={()=>signOut()} className="bg-slate-900 text-white flex items-center justify-center gap-4 cursor-pointer hover:text-neutral-200">
                <div >Log out</div>
                <MdLogout className="w-4 h-4" />
            </div>
        </div>
    )
}

export default Sidebar