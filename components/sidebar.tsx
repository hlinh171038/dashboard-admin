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
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import useSidebar from "@/app/hooks/useSidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaPlus } from "react-icons/fa6";
import SidebarItem from "./sidebar/sidebar-item";
import { MdDiscount } from "react-icons/md";
import { Router } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Button from "./button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegister from "@/app/hooks/useRegisterModal";
  

const menuItems = [
    {
        title:"Home",
        icon: IoHome,
        link:"/dashboards/home"
    },
    {
        title:"Customers",
        icon: FaUser,
        link: "/dashboards/customers",
        add: 
            {
                title:'Add User',
                icon:FaPlus,
                link:"/dashboards/customers/add"
            }
        

    },
    {
        title:"Products",
        icon: FaBox,
        link: "/dashboards/product",
        add: 
            {
                title:'Add Product',
                icon:FaPlus,
                link:"/dashboards/product/add"
            }
    },
    
    {
        title:"Discounts",
        icon: MdDiscount,
        link: "/dashboards/discount",
        add: {
            title:'Add New',
            icon:FaPlus,
            link:"/dashboards/discount/add"
        }
    },
    {
        title:"Transactions",
        icon: MdAttachMoney,
        link: "/dashboards/transaction"
    },
]

const analytics = [
    // {
    //     title:"Revueue",
    //     icon:IoBag,
    //     link: "/analytics/revueue"
    // },
    {
        title:"Report",
        icon:TbFileReport,
        link: "/analytics/report"
    },
    {
        title:"Team",
        icon:AiOutlineTeam,
        link: "/analytics/team"
    },
]

const setting = [
   
    {
        title:"Help",
        icon: TbHelpHexagonFilled,
        link: "/users/help"

    }
]

interface SideProps {
    name: string |undefined | null;
    img: string | undefined | null;
    email: string | undefined | null;
}
const Sidebar:React.FC<SideProps> = ({
    name,
    img,
    email
}) =>{
    const [isCustomerOpen,setIsCustomerOpen] = useState(false);
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegister()
    const sidebar = useSidebar()

    const [hover,setHover] = useState(false)
    const [showMail,setShowMail] = useState<any>(null)
    const path = usePathname();



   
    const handleLogin = useCallback(()=>{
        loginModal.onOpen()
    },[loginModal])

    const handleRegister = useCallback(()=>{
        registerModal.onOpen()
    },[registerModal])

    const handleSignOut = useCallback(()=>{
       signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
       })
    },[])
    


    
    return (
        <div className={cn("flex flex-col rounded-md h-full bg-slate-600  "
            )}>
            <div className="h-auto text-white  flex items-center justify-between px-2 py-4">
                <Popover>
                    <PopoverTrigger>
                        {/* <Image src="/logo2.png" width="96" height="96" alt="logo"/> */}
                            <div className="flex items-center justify-start gap-2 text-[15px] ">
                                <Avatar className="">
                                        <AvatarImage src={img as string} />
                                        <AvatarFallback>LT</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start gap-0.5">
                                    <div className="capitalize ml-4">
                                        {name}
                                    </div>
                                    <div className="inline-flex justify-start items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        <div className="font-thin text-[14px]">Ready for working</div>
                                    </div>
                                </div>
                            </div>
                    </PopoverTrigger>
                    <PopoverContent className=" bg-white rounded-md w-[300px] ml-2  px-2 py-4 flex flex-col gap-2 transition-all duration-300">
                        
                        <Button 
                            label="Login"
                            onClick={handleLogin}
                        
                        />
                        <Button 
                                label="Register"
                                onClick={handleRegister}
                                outline
                        />

                    </PopoverContent>
                </Popover>
               
                <MdArrowBackIos 
                    className="text-white w-5 h-5 mr-4 hover:text-neutral-400 transition-all"
                    onClick={()=>sidebar.onClose()}
                />
            </div>
            
            
            <div className=" h-screen text-white flex flex-col gap-4 px-4 py-4">
                <Link  href={"/dashboards"} 
                       className={cn("flex items-center text-white text-sm gap-4 cursor-pointer transition-all duration-300",
                                path.includes('/dashboards') && "text-slate-900 font-bold hover:text-slate-80"
                        )}
                >
                    <MdDashboardCustomize className="w-5 h-5"/>
                    <div>Dashboard</div>
                </Link>
                {menuItems.map((item)=>{
                    
                    return (
                        <SidebarItem
                            key={item.title}
                            link={item.link}
                            title={item.title}
                            icon ={item.icon}
                            addTitle = {item.add &&item.add.title}
                            addLink = {item.add && item.add.link}
                            addIcon = {item.add && item.add.icon}
                            />
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
            <div onClick={handleSignOut} className=" px-2 py-4 text-white flex items-center justify-start gap-4 cursor-pointer hover:text-neutral-200">
                <div >Log out</div>
                <MdLogout className="w-4 h-4" />
            </div>
        </div>
    )
}

export default Sidebar