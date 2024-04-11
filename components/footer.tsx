"use client"

import useSidebar from "@/app/hooks/useSidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BsCCircleFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { RiGithubLine } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const Footer = () =>{
    const sidebar = useSidebar()
    const router = useRouter()

    const handleNavigate = useCallback(()=>{
        router.push('/analytics/team')
    },[router])
    console.log(sidebar)
    return (
        <div className={cn("flex w-full transition duration-200 bg-slate-900/90 border-top-1 border-slate-900",
            
        )}>
            <div className={cn("",
                sidebar.isOpen ? "w-[25%]": "w-0"
            )}></div>
            <div  className={cn(" w- text-neutral-200 text-[13px] py-2 px-2",
                     sidebar.isOpen ? "w-[75%]": "w-full"
            )}>
                {/* component */}
                <div
                    className="grid grid-cols-4 py-4"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-start gap-1 mt-8">
                            <Image 
                                src="/logo.webp"
                                width={30}
                                height={30}
                                alt="logo"
                                className="aspect-square"
                            />
                            <div className="">
                                <div className="font-bold  text-[14px]" style={{color:'#5EC0B5'}}>Dashboard </div>
                                <div className="text-neutral-100 text-[12px] mt-[-4px]">Insight</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <div onClick={handleNavigate} className="text-neutral-100 px-2 py-1 rounded-full hover:opacity-[0.8] cursor-pointer" style={{backgroundColor:"#5EC0B5"}}>Tell Us More</div>
                            <div className="bg-neutral-100 px-2 py-1 rounded-full hover:opacity-[0.8] cursor-pointer" style={{color:"#5EC0B5",border:"2px solid #5EC0B5"}}>Watch Demo</div>
                        </div>
                        <div className="flex -items-center justify-start gap-2">
                            <Link href={`https://www.facebook.com/profile.php?id=100068924575831&locale=vi_VN`}>
                                <div className="p-1 rounded-full flex items-center justify-center border border-neutral-100 w-6 h-6 hover:bg-blue-700 cursor-pointer transition-all duration-300" >
                                <FaFacebookF className="w-4 h-4 text-neutral-100" />
                                </div>
                            </Link>
                            <Link href={`https://chat.zalo.me/`}>
                                <div className="p-1 rounded-full flex items-center justify-center border border-neutral-100 w-6 h-6 hover:bg-blue-500 cursor-pointer transition-all duration-300">
                                    <SiZalo className="w-4 h-4 text-neutral-100" />
                                </div>
                            </Link>
                            <Link href={`https://github.com/hlinh171038`}>
                                <div className="p-1 rounded-full flex items-center justify-center border border-neutral-100 w-6 h-6 hover:bg-black cursor-pointer transition-all duration-300">
                                    <RiGithubLine className="w-4 h-4 text-neutral-100" />
                                </div>
                            </Link>
                                <div className="p-1 rounded-full flex items-center justify-center border border-neutral-100 w-6 h-6 hover:bg-blue-400 cursor-pointer transition-all duration-300">
                                    <FaTwitter className="w-4 h-4 text-neutral-100" />
                                </div>
                            
                            
                        </div>
                    </div>
                    <div  className=" flex flex-col gap-2">
                        <div className="text-[17px] text-white capitalize">get started</div>
                        <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                            <div className="hover:text-white">Users manager</div>
                            <div className="hover:text-white">Dashboard</div>
                            <div className="hover:text-white">Products Managers</div>
                            <div className="hover:text-white">Add New Product</div>
                            <div className="hover:text-white">Discount Manager</div>
                            <div className="hover:text-white">Transactions Manager</div>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <div className="text-[17px] text-white capitalize">account information </div>
                        <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                            <div  className="hover:text-white">Loggined and out of dashboard</div>
                            <div  className="hover:text-white">Find out role</div>
                            <div  className="hover:text-white">Administrator</div>
                            <div  className="hover:text-white">Change email</div>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-2 justify-end">
                        <div className="text-[17px] text-white capitalize">Administrator support</div>
                        <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                            <div  className="hover:text-white">Resource</div>
                            <div  className="hover:text-white">Documentation</div>
                            <div  className="hover:text-white">Free Demo</div>
                            <div  className="hover:text-white">Term and Service</div>
                            <div  className="hover:text-white">Privaci Policy</div>
                            <div  className="hover:text-white">Data Processing</div>
                        </div>
                    </div>
                </div>
                {/* copy right */}
                <div className="flex items-center justify-end px-2 py-2 border-t border-neutral-400">
                   
                    <div className="flex items-center justify-start ">
                        <BsCCircleFill className="w-4 h-4 "/>
                        <p>opyright belong to Linh Thai</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer