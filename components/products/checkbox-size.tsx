
"use client"

import { cn } from "@/lib/utils";
import { useState } from "react"

interface CheckboxSizeProps {
    handleCheck: (check:any,value:string) =>void;
    array: any
    column?: number
    title: string,
    sizeValue?: string,
    exercute?: any
}


const CheckboxSize:React.FC<CheckboxSizeProps> = ({
    handleCheck,
    array ,
    column,
    title,
    sizeValue,
    exercute
}) =>{

    const [data,setData] = useState(array)
    const [check,setCheck] = useState <any>(sizeValue || [])

  
    
    return (
        <div>
            <div className="text-[15px] text-neutral-200 capitalize ">{title}</div>
            <div 
                className={cn("grid items-start flex-col justify-start gap-1 text-[14px] text-neutral-200 bg-slate-500/60 rounded-md px-2 py-2",
                                column ? `grid-cols-${column}`:'grid-cols-2'
                        )}
            >
                {data.map((item:string)=>{
                    return <label key={item}  className="flex items-center justify-start" onClick={()=>handleCheck(check,item)}>
                            <input type="checkbox" value={item} checked={check.includes(item)} disabled={exercute}/>
                            <span>{item}</span>
                          </label>
                })}
            </div>
        </div>
    )
}

export default CheckboxSize