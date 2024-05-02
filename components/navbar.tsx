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
import Link from "./navbar/link"
import { usePathname } from "next/navigation"




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
    const [link,setLink] = useState('')
    const [idUrl,setIdUrl] = useState('')
    const path = usePathname()
    console.log(path)

    // take id fron url
    useEffect(()=>{
        const pathPart = path.split('/');
        console.log(pathPart);
        if(pathPart.length === 4) {
            setIdUrl(pathPart[pathPart.length -1])
        }
        console.log(idUrl)
    },[path,idUrl])

    useEffect(()=>{
        const array:any[] = []
        tempMail && tempMail.forEach((item:any)=>{
            if(item.mailRecive === email) {
         
               array.push(item)
            }
        })
        setShowMail(array)
    },[email,tempMail])
    console.log(tempMail)
    console.log(showMail) // curentuser id,email,name,comment
    console.log(email)
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

      // user id correpond with current user
      useEffect(()=>{
       const result =  user && user.find((item:any) =>item.email === email);
       console.log(result)
       setUserId(result && result?.id)
      },[email,user])

     useEffect(()=>{
        
        switch(path) {
            case '/dashboards/customers' : setLink('customer'); break;
            case '/dashboards/customers/add' : setLink('customer-add'); break;
            case `/dashboards/customers/${idUrl}`: setLink('customer-detail');break;
            case '/dashboards/product' : setLink('product'); break;
            case '/dashboards/product/add' : setLink('product-add'); break;
            case `/dashboards/product/${idUrl}`: setLink('product-detail');break;
            case '/dashboards/discount' : setLink('discount'); break;
            case '/dashboards/discount/add' : setLink('discount-add'); break;
            case `/dashboards/discount/${idUrl}`: setLink('discount-detail');break;
            case '/dashboards/transaction' : setLink('transaction'); break;
            case `/dashboards/transaction/${idUrl}`: setLink('transaction-detail');break;
            case '/analytics/report' : setLink('report'); break;
            case `/analytics/report/${idUrl}`: setLink('report-detail');break;
            case '/analytics/team' : setLink('team'); break;
            case '/analytics/team/add' : setLink('team-add'); break;
            case '/users/help' : setLink('help'); break;
            case '/history' : setLink('history'); break;
        }
     },[path,idUrl])
     console.log(link)
    return (
        <div id="navbar" style={{background:'#262E3F'}} className={cn("transition-all duration-300 sticky top-0 p-2 z-30 ",
                        )} >
            <div 
                className={cn("bg-slate-600 shadow-sm  w-full h-[70px] grid grid-cols-12 gap-x-4 justify-between items-center px-4 relative rounded-md",
                    sticky ?'bg-slate-600 shadow-md':''
                )}
            >
                <div className="col-span-2 mb-4">
                    <HiOutlineBars3 
                        onClick={()=>sidebar.onOpen()}
                        className={cn("w-6 h-6 text-white cursor-pointer transition block hover:opacity-[0.5]",
                                    sidebar.isOpen && " hidden"
                        
                                )} 
                    />
               <Link type={link} />
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
                                        // mail ={showMail}
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
                                    //notify = {notify}
                                    userId ={userId}
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