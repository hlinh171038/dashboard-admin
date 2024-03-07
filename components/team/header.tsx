"use client"

import { GoPlus } from "react-icons/go"
import { AiOutlineTeam } from "react-icons/ai";

const Header = () =>{
    return (
        <div 
            className="text-[15px] text-neutral-100 px-2"
        >
            <div
                className="flex flex-col ga-0.5"
            >
                <div 
                    className="text-xl flex items-center justify-start gap-2"
                >
                    <div><AiOutlineTeam className="w-4 h-4 text-neutral-100" /></div>
                    <div>Team Manager</div>
                </div>
                <div 
                    className="text-neutral-400 "
                >Overview of all teams without your organization</div>
            </div>
            <div className="flex justify-end items-center">
                <span className="w-[12%] cursor-pointer rounded-md py-1 px-2 flex items-center justify-start gap-1 bg-slate-900 hover:bg-slate-800 hover:text-white">
                    <div>
                        <GoPlus className="w-4 h-4 text-neutral-100"/>
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