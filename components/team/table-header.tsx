"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5"

import { useDebounce } from "use-debounce"


const TableHeader = () =>{

    const router = useRouter()
    const [text,setText] = useState('')
    const [query] = useDebounce(text, 300);

    console.log(text)
    useEffect(()=>{
        router.push(`/analytics/team?search=${query}&page=1&per_page=5`)
    },[query,router])
    return (
        <div className="w-full flex items-center justify-between">
            <div className="relative">
            <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
            <input 
                className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" 
                placeholder="Search ... "
                onChange={(e)=> setText(e.target.value)}
                value={text}
                />          
            </div>
        </div>
    )
}
export default TableHeader