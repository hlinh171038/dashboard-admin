"use client"

import { useCallback, useState } from "react"

import useLoginModal from "../app/hooks/useLoginModal"

import Button from "./button"
import useRegister from "@/app/hooks/useRegisterModal"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";

import { HiOutlineBars3 } from "react-icons/hi2";
import clsx from "clsx"
import useSidebar from "@/app/hooks/useSidebar"
import { cn } from "@/lib/utils"



interface NavProps {
    name: string |undefined | null;
    img: string | undefined | null;
    email: string | undefined | null;
}

const Navbar:React.FC<NavProps>= ({
    name,
    img,
    email
}) => {

    const loginModal = useLoginModal()
    const registerModal = useRegister()
    const sidebar = useSidebar()

    const [hover,setHover] = useState(false)


   
    const handleLogin = useCallback(()=>{
        loginModal.onOpen()
    },[loginModal])

    const handleRegister = useCallback(()=>{
        registerModal.onOpen()
    },[registerModal])

    const handleSignOut = useCallback(()=>{
       signOut()
    },[])

    return (
        <div className="p-2">
            <div 
                className="bg-slate-600/80 shadow-sm  w-full h-[70px] grid grid-cols-12 gap-x-4 justify-between items-center px-4 relative rounded-md"
            >
                <div className="col-span-2">
                    <HiOutlineBars3 
                        onClick={()=>sidebar.onOpen()}
                        className={cn("w-6 h-6 text-white cursor-pointer transition block hover:text-slate-600",
                                    sidebar.isOpen && " hidden"
                        
                                )} 
                    />
                </div>
                <div className="col-span-7 flex justify-end items-center">
                    <div className="relative">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <input className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" placeholder="Search ... "/>
                    </div>
                </div>
                
                <div className="col-span-2 flex items-center justify-end gap-4">
                    <MdOutlineMail className="w-5 h-5 text-white" />
                    <AiFillBell className="w-5 h-5 text-white" />
                    <MdOutlineComment className="w-5 h-5 text-white" />
                </div>
                {/* <div 
                    className="col-span-1 group cursor-pointer  transition overflow-hidden px-2 py-1 rounded-lg duration-300 "
                    onClick ={()=>setHover(!hover)}
                >
                    <div className="group-hover:flex group-hover:text-white group-hover:w-auto group-hover:pr-8 bg-slate-600 overflow-hidden  transition-all  absolute top-3 right-9 w-0  gap-0.5 h-10 justify-center items-center rounded-full  px-2 py-0.5 duration-300">
                        <div className=" group-hover:block hidden ">{hover ? <MdKeyboardArrowUp className="w-4 h-4 text-white" />: <MdOutlineKeyboardArrowDown className="w-4 h-4" />}</div>
                        <div className=" group-hover:block hidden  text-sm">{name}</div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-4" >
                        <Avatar className="">
                            <AvatarImage src={img as string} />
                            <AvatarFallback>LT</AvatarFallback>
                        </Avatar>
                    
                    </div>
                    
                    
                </div>
                
                <div className={clsx(" fixed top-16 right-1 bg-white rounded-md border-1 border-slate-900 w-1/5 h-0 overflow-hidden px-2  flex flex-col gap-2 transition-all duration-300",
                                hover && "h-[200px] py-2"
                            )}
                >
                    <Button 
                        label="login"
                        onClick={handleLogin}
                    
                    />
                    <Button 
                            label="Register"
                            onClick={handleRegister}
                        
                    />
                    <div className=" flex items-center justify-center text-neutral-400">
                            <div className="border-t-2 border-slate-600 w-[50%]    px-2"></div>
                            <div className="text-slate-600 text-sm">or</div>
                            <div className="border-t-2 border-slate-600 w-[50%]    px-2"></div>
                    </div>
                    <Button 
                            label="Sign Out"
                            onClick={handleSignOut}
                        
                        />
                </div> */}
            </div>
        </div>
    )
}

export default Navbar