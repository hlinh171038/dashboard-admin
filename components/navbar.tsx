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

import { HiOutlineBars3 } from "react-icons/hi2";
import clsx from "clsx"

interface NavProps {
    name: string |undefined | null
}

const Navbar:React.FC<NavProps>= ({
    name
}) => {

    const loginModal = useLoginModal()
    const registerModal = useRegister()

    const [hover,setHover] = useState(false)
   
    console.log(hover)
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
        <div 
            className="bg-white shadow-sm  w-full h-[70px] flex gap-x-4 justify-between items-center px-4 relative"
        >
            <div>
                <HiOutlineBars3 className="w-6 h-6 hover:text-neutral-700 cursor-pointer transition" />
            </div>
            <div>
                menu
            </div>
            <div 
                className="group flex gap-4 justify-center items-center cursor-pointer hover:bg-slate-600 transition overflow-hidden px-2 py-1 rounded-lg duration-300"
                onClick ={()=>setHover(!hover)}
            >
                <div className="group-hover:block group-hover:text-white hidden transition">{hover ? <MdKeyboardArrowUp className="w-4 h-4" />: <MdOutlineKeyboardArrowDown className="w-4 h-4" />}</div>
                <div className="group-hover:text-white text-slate-900 text-sm">{name}</div>
                
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>LT</AvatarFallback>
                </Avatar>
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
            </div>
        </div>
    )
}

export default Navbar