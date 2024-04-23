"use client"

import { GoPlus } from "react-icons/go"
import { AiOutlineTeam } from "react-icons/ai";
import { toast } from "sonner";

const Header = () =>{

    const handleAddItem = () =>{
        toast.warning("Use Lead's role to add new team")
    }
    return (
        <div 
            className="text-[14px] text-neutral-400 px-2 flex items-center justify-between"
        >
            <div
                className="flex flex-col ga-0.5"
            >
                <div 
                    className=" flex items-center justify-start gap-2"
                >
                    <div><AiOutlineTeam className="w-4 h-4 text-neutral-100" /></div>
                    <div className="text-[15px] text-neutral-100 font-bold">Team Manager</div>
                </div>
                <div 
                    className="text-neutral-400 "
                >Overview of all teams without your organization</div>
            </div>
            <div className="">
                <span
                    onClick={handleAddItem}
                    className=" cursor-pointer rounded-md py-1 text-white px-2 flex items-center justify-start gap-1 bg-[#4FA29E] hover:opacity-[0.7] hover:text-white">
                    <div>
                        <GoPlus className="w-4 h-4 text-white"/>
                    </div>
                    <div>
                        Add team
                    </div>
                </span>
            </div>
        </div>
    )
}

export default Header