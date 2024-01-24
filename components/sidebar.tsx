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
        icon: IoIosColorPalette
    }
]

const Sidebar = () =>{
    const path = usePathname();
    console.log(path)
    return (
        <div className="h-screen  flex flex-col">
            <Link  href={"/dashboards/dashboard-home"} className="h-auto bg-slate-900 text-white py-1 flex items-center justify-between">
                <Image src="/logo2.png" width="100" height="100" alt="logo"/>
                <MdArrowBackIos className="text-white w-5 h-5 mr-4"/>
            </Link>
            
            <div className="bg-slate-600 h-screen text-white flex flex-col gap-4 px-4 py-4">
                <Link  href={"/dashboard/home-dashboard"} className="flex items-center text-white text-sm gap-4 cursor-pointer">
                    <MdDashboardCustomize className="w-5 h-5"/>
                    <div>Dashboard</div>
                </Link>
                {menuItems.map((item)=>{
                    const Icon = item.icon
                    return (
                        <Link href={item.link} key={item.title} className="ml-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm font-thin">
                            <Icon className="w-4 h-4" />
                            <div> {item.title}</div>
                        </Link>
                    )
                })}
                <div className="flex items-center text-white text-sm gap-4 cursor-pointer">
                    <IoSettingsSharp className="w-5 h-5"/>
                    <div>Setting</div>

                </div>
                    {setting.map((item)=>{
                        const Icon = item.icon;
                        return (
                            <div key={item.title} className="ml-4 flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200 text-sm font-thin">
                            <Icon className="w-4 h-4" />
                            <div> {item.title}</div>
                        </div>
                        )
                    })}
                <div className="flex items-center text-white text-sm gap-4 cursor-pointer">
                    <RiContactsBookUploadFill className="w-5 h-5"/>
                    <div>Contact Us</div>
                </div>
                
            </div>
            <div className="bg-slate-900 text-white">log out</div>
        </div>
    )
}

export default Sidebar