"use client"
import { MdOutlineEmail } from "react-icons/md";
import QuestionNotified from "../question-notified";
import { RiMailSendLine } from "react-icons/ri";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ContactUs } from "./contact";

interface LeaderProps {
    currentUser: any
}

const Leader:React.FC<LeaderProps> = ({
    currentUser
}) =>{
    return (
        <div className="grid grid-cols-6 items-center justify-start gap-2 px-2">
            <div className="col-span-3 flex flex-col items-start justify-start gap-1 text-neutral-100 text-[15px]">
                <div className="flex items-center justify-between ">
                    <div className="text-lg">Team Leader</div>
                </div>
                <div className="text-neutral-400 text-justify">
                    You can add new member as admin under your role, ensuring clear direction and effective leadership within your teams.
                </div>
            </div>
            <div className="col-span-3">
            <div className="flex items-center justify-end ">
                    
                    <QuestionNotified 
                        title="team leader"
                        content= "Once of member of team lead. all role on dashboard."
                    />
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className=" inline-flex  items-center justify-start gap-2 text-neutral-100 text-[14px] bg-slate-500/30 rounded-md px-2 py-1 ">
                        <div>
                            <MdOutlineEmail className="w-4 h-4 text-neutral-100" />
                        </div>
                        <div>
                            hoanglinh171038@gmail.com
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <div 
                            className="group text-neutral-100 px-2 py-1 rounded-md cursor-pointer"
                            
                            >
                                
                                <Popover>
                                    <PopoverTrigger>
                                        <RiMailSendLine className="w-4 h-4 text-neutral-200 group-hover:text-white transition-all duration-300"/>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        side="bottom"
                                        className="mr-2 min-w-[30rem] rounded-r-md shadow-md"
                                    >
                                        <ContactUs 
                                            currentUser = {currentUser}
                                        />
                                    </PopoverContent>
                                </Popover>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leader