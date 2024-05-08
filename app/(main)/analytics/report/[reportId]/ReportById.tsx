"use client"

import { cn } from "@/lib/utils";
import { Mail } from "@prisma/client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { MdCopyAll } from "react-icons/md";
import { toast } from "sonner";

interface ReportByIdProps {
    mailById: Mail[] | any;
}

const ReportById:React.FC<ReportByIdProps> = ({
    mailById: mail
}) =>{
   // console.log(mail);
    const router = useRouter()

    //handle coppy id

  const handleCopy =(id:string) =>{
    navigator.clipboard.writeText(id)
    toast.success("coppied to clipboard")
  }
  //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
    return (
        <div className="  w-full px-2">
           <div className=" w-full text-[14px] text-neutral-400 flex flex-col gap-2">
               
               {/*information */}
               <div className=" w-full" >
                   
                    <div className="grid grid-cols-6 gap-2">
                       <div className=" col-span-2 px-4">
                       <div className="text-[15px] text-neutral-100 underline cursor-pointer" onClick={()=>router.push('/analytics/report')}>Back</div>
                        <Image 
                                src = {mail.userImage ? mail.userImage : '/avatar.png'}
                                width={300}
                                height={300}
                                alt="avatar"
                                objectFit=""
                                className="rounded-full aspect-square w-full"
                            />
                             <div
                                className="flex item-center justify-start gap-1 "
                            >
                                <div className="flex items-center justify-center">
                                    <GoDotFill className={cn("w-4 h-4 text-red-600",
                                                        )}/>
                                </div>
                                <div className="text-[14px] text-neutral-100">{ 'offline'}</div>
                            </div>
                            <div className="flex items-center justify-between bg-slate-600/80 rounded-md px-2 py-1 w-full">
                                <div className="flex items-center justify-center text-[15px]">
                                    <div className="text-neutral-200">ID : </div>
                                    <div className="text-neutral-400"> {mail && mail.id}</div>
                                </div>
                                <div>
                                    <MdCopyAll 
                                    className="w-4 h-4 hover:text-white cursor-pointer text-neutral-200" 
                                    onClick={()=>handleCopy(mail && mail.id)}/>
                                </div>
                            </div>
                       </div>
                        <div className="col-span-4 bg-slate-600 rounded-md p-2 flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-neutral-100 text-[15px]">Information</div>
                                    <div>All information of reporter</div>
                                </div>
                                <div>{mail.status === 'help'? (
                                        <span className="text-red-600 text-[13px] capitalize">can not solve, need help</span>
                                        ):mail.status ==='pending' ?(
                                            <span className="text-yellow-500 text-[13px]">Pending</span>
                                        ):(
                                            <span className="text-green-600 text-[13px]">Done</span>
                                        )}
                                </div>
                            </div>
                            <div className=" ">
                                <div>UserName:</div>
                                <div className="px-2 py-1 rounded-md bg-slate-500/60 w-full capitalize">{mail.userName && mail.userName}</div>
                            </div>
                            <div className=" ">
                                <div>Email:</div>
                                <div className="px-2 py-1 rounded-md bg-slate-500/60 w-full">{mail.mailSend && mail.mailSend}</div> 
                            </div>
                            <div className="">
                                <div>Role:</div>
                                <div className="px-2 py-1 rounded-md bg-slate-500/60 w-full capitalize">{mail.role && mail.role}</div>
                            </div>
                            <div className="">
                                <div>Admin Support:</div>
                                <div className="px-2 py-1 rounded-md bg-slate-500/60 w-full flex items-center justify-between">
                                    <div>{mail.supportBy && mail.supportBy}</div>
                                    <div>{mail.status === 'help'? (
                                        <span className="text-red-600 text-[13px] capitalize">can not solve, need help</span>
                                        ):mail.status ==='pending' ?(
                                            <span className="text-yellow-500 text-[13px]">Pending</span>
                                        ):(
                                            <span className="text-green-600 text-[13px]">Done</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Date:</div>
                                <div className="px-2 py-1 rounded-md bg-slate-500/60 w-full">{mail.created_at && new Date(mail.created_at).toLocaleString()}</div>
                            </div>
                            <div>
                                <div>Content:</div>
                                <div className="px-2 py-1 rounded-md bg-slate-500/60 w-full text-justify">{mail.content && mail.content}</div>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
        </div>
    )
}

export default ReportById