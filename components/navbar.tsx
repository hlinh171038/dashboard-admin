"use client"

import { Suspense, useCallback, useEffect, useState } from "react"

import useLoginModal from "../app/hooks/useLoginModal"


import useRegister from "@/app/hooks/useRegisterModal"
import { Mail, Notify, Relly, TempMail, User } from "@prisma/client"
import { signOut } from "next-auth/react"

import { MdOutlineMail } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";

import { HiOutlineBars3 } from "react-icons/hi2";

import useSidebar from "@/app/hooks/useSidebar"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { LuMailWarning } from "react-icons/lu";
import CommentContent from "./navbar/comment-content"
import MailContent from "./navbar/mailclient"



interface NavProps {
    name: string |undefined | null;
    img: string | undefined | null;
    email: string | undefined | null;
    mail: Mail[] | any;
    user: User[] | any;
    comment: Comment[] | any;
    relly : Relly[] | any;
    notify: Notify[] | any;
    tempMail: TempMail[] | any;
}   

const Navbar:React.FC<NavProps>= ({
    name,
    img,
    email,
    mail =[],
    user = [],
    comment = [],
    relly = [],
    notify = [],
    tempMail = []
}) => {

    const loginModal = useLoginModal()
    const registerModal = useRegister()
    const sidebar = useSidebar()

    const [hover,setHover] = useState(false)
    const [showMail,setShowMail] = useState<any>(null)
    const [sticky,setSticky] = useState(false)
    const [arrComment,setArrComment] = useState<any>([])
    const [arrHeart,setArrHeart] = useState<any>([])
    const [arrRelly,setArrRelly] = useState<any>([])
    const [arrRellyHeart,setArrRellyHeart] = useState<any>([])
    const [userId,setUserId] = useState('')

    useEffect(()=>{
        const array:any[] = []
        tempMail && tempMail.forEach((item:any)=>{
            if(item.mailRecive === email) {
         
               array.push(item)
            }
        })
        setShowMail(array)
    },[email,tempMail])
    console.log(showMail) // curentuser id,email,name,comment
    // sticky when scroll
    useEffect(() => {
        const handleScroll = () => {
          const navbar = document.getElementById('navbar');
          const scrollTop = window.scrollY; // Use scrollY instead of pageYOffset
          
          if(!navbar){
            return null;
          }
          setSticky(scrollTop > navbar.offsetHeight);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      // take comment
      // have showmail (curentuser id,email,name,comment)
      useEffect(()=>{
        const result:any[] = []
        comment && comment.map((item:any)=>{
            const id = showMail && showMail.id
            if(item.userId === id){
                result.push(item)
            }
        })
        setArrComment(result)
      },[comment,showMail])
      //console.log(arrComment); // comment correpond with current user

      // user id correpond with current user
      useEffect(()=>{
       const result =  user && user.find((item:any) =>item.email === email);
       console.log(result)
       setUserId(result && result?.id)
      },[email,user])

      console.log(userId)
     console.log(user)
     console.log(name)
    return (
        <div id="navbar" style={{background:'#262E3F'}} className={cn("transition-all duration-300 sticky top-0 p-2 z-30 ",
                        )} >
            <div 
                className={cn("bg-slate-600 shadow-sm  w-full h-[70px] grid grid-cols-12 gap-x-4 justify-between items-center px-4 relative rounded-md",
                    sticky ?'bg-slate-600 shadow-md':''
                )}
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
                
                <div className="col-span-3 flex items-center justify-end gap-4">
                    <div className="relative mt-2">
                        <Popover>
                            <PopoverTrigger>
                                <MdOutlineMail className="w-5 h-5 text-white" />
                                {showMail && showMail.length >0 && (
                                    <div className="absolute top-0 right-0 w-2  h-2 bg-red-600 rounded-full"></div>
                                )}
                            </PopoverTrigger>
                            <PopoverContent side="bottom" className="mt-6 mr-2 w-[300px] rounded-md">

                                   <MailContent
                                         mail ={showMail}
                                         userId = {userId && userId}
                                    />
                                
                               
                                
                            </PopoverContent>
                        </Popover>
                    </div>
                    <AiFillBell className="w-5 h-5 text-white" />
                    <div className="relative mt-2">
                        <Popover>
                            <PopoverTrigger>
                                <MdOutlineComment className="w-5 h-5 text-white" />
                                {notify && notify.length >0 && (
                                    <div className="absolute top-0 right-0 w-2  h-2 bg-red-600 rounded-full"></div>
                                )}
                            </PopoverTrigger>
                            <PopoverContent side="bottom" className="mt-6 mr-2 w-[300px] rounded-md">
                                <CommentContent
                                    // arrHeart = {arrHeart}
                                    // arrRelly = {arrRelly}
                                    // arrRellyHeart = {arrRellyHeart}
                                    notify = {notify}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Navbar