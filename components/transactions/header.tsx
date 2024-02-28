"use client"

import { useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import { AiOutlineDownload } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";


const Header = () => {
    const [text,setText] = useState('')
    return (
        <div className="flex items-center justify-between gap-2 w-full ">
            <div className="relative">
                <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                <input 
                    className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" 
                    placeholder="Search ... "
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-end gap-4">
                <div className="h-6 w-6 rounded-full  flex items-center justify-center text-neutral-200 border border-neutral-100 px-2 py-1 cursor-pointer ">
                    <AiOutlineDownload className="w-4 h-4"/>
                </div>
                <div className="flex items-center justify-start gap-2 text-neutral-200 border boder-neutral-100 rounded-md px-2 py-1 cursor-pointer text-[14px] text-thin">
                    <MdDateRange />
                    <div>Oct,10,2023 - Nov,13,2023</div>
                </div>
            </div>
        </div>
    )
}

export default Header