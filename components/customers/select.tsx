"use client"

import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { useCallback, useRef, useState } from "react"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


interface SelectCustomerProps {
    title: string,
    id: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}
const SelectCustomer:React.FC<SelectCustomerProps> = ({
    title,
    id,
    register,
    errors
}) => {
    const [option,setOption] = useState(false)
    const [selected,setSelected] = useState(title)
    const [inputValue,setInputValue] = useState(title)
    const refSelected = useRef()

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
        
        <div className="flex flex-col items-start justify-start  relative h-[70px]">
            <label htmlFor={title} className="text-neutral-200 text-[15px] ">{title}</label>
            <select 
                id={title} 
                {...register(id)} 
                value={inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                className={cn("  rounded-md py-1 px-2  w-full text-[15px]",
                                    inputValue === title ?"text-neutral-400 bg-slate-500/60":"text-slate-900 bg-slate-200"           
                            )}
                >   
                    <option value="" selected className=" bg-white rounded-md">{inputValue}</option>
                    <option value="yes" className=" bg-white rounded-md">Yes</option>
                    <option value="no" className=" bg-white rounded-tr-none">No</option>
            </select>
          
        </div>
        
    )
}

export default SelectCustomer