"use client"


import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"

import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";


interface SelectCustomerProps {
    title: string
}
const SelectCustomer:React.FC<SelectCustomerProps> = ({
    title
}) => {
    const [option,setOption] = useState(false)
    const [selected,setSelected] = useState(title)


    const handleSelected = useCallback((item: string)=>{
        if(item === "Yes") {
            setSelected("Yes");
            setOption(false)
        }
        if(item === "No") {
            setSelected("No");
            setOption(false)
        }
    },[])
    return (
        <div className="relative h-[70px]">
            <div className={cn(" absolute w-full top-5 left-0 w-50 border-1 border-neutral-200 rounded-md px-2 py-1 flex items-center justify-between transition ",
                selected === `${title}` ?"bg-slate-500/60 w-full text-neutral-400":"bg-slate-500/60 w-full text-slate-900"
            )}>
                <div className={cn("text-[14px] ",
                                    
                                )}
                >
                    {selected}
                </div>
                <div>{!option ? <MdKeyboardArrowDown className="w-4 h-4 text-neutral-200 " onClick={()=>setOption(!option)}/> :<MdKeyboardArrowUp className="w-4 h-4 text-neutral-200 " onClick={()=>setOption(!option)}/>}</div>
            </div>
            <div className={cn("absolute top-14 left-0  bg-white  overflow-hidden transition-all duration-300 w-full rounded-md px-2 text-[14px] text-neutral-200",
                option ? "h-[70px] py-2" : "h-0 py-0"
            )}>
                <div onClick={() =>handleSelected("Yes")} className="hover:bg-slate-500/60 rounded-md transition px-2 text-slate-900  text-[14px]">Yes</div>
                <div onClick={()=>handleSelected("No")} className="hover:bg-slate-500/60 rounded-md transition px-2 text-slate-900 text-[14px]">No</div>
            </div>
            <label className="peer-click:text-white peer-checked:font-bold  peer-focus:drop-shadow-xl  absolute top-0 left-0 text-neutral-200 text-[15px]">{title}</label>
        </div>
    )
}

export default SelectCustomer