"use client"

import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import {useDebounce} from 'use-debounce'

const HeaderCustomer = () =>{
    const [text,setText] = useState('')
    const [query] = useDebounce(text, 500);
    const searchparams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()
    // 1. input variable to capturing the input user
    // const handleSearch = useCallback((term:string) =>{
    //     const params = new URLSearchParams(searchparams);
    //     if (term) {
    //       params.set('query', term);
    //     } else {
    //       params.delete('query');
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    //     if(params){
    //         axios.get(`/api/filter-user/`,{params})
    //         .then((res)=>{
    //             console.log(res.data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //         })
    //     }
        
    //   },[pathname,replace,searchparams])

    // const handleSearch = async() =>{
    //     axios.get(`/api/filter-user/`)
    //             .then((res)=>{
    //                 console.log(res.data)
    //             })
    //             .catch((err)=>{
    //                 console.log(err)
    //             })
    // }
   

    const router = useRouter()

    const handleAddNew = () =>{
        router.push('/dashboards/customers/add')
    }

    useEffect(()=>{
        router.push(`/dashboards/customers/?search=${query}`)
    },[router,query])

    return (
        <div>
            <div className="flex justify-between items-center px-2 py-2">
            <div className="relative">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <input 
                            className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm focus:outline-none" 
                            placeholder="Search ... "
                            onChange={(e)=> setText(e.target.value)}
                            value={text}
                            />
                            
                    </div>
                <button 
                    onClick={handleAddNew}
                    className="bg-slate-900 hover:bg-slate-900/40  hover:text-white text-neutral-200 px-2 py-1 text-[15px] rounded-md duration-300 transition-all"
                >
                    Add New 
                </button>
            </div>
        </div>
    )
}

export default HeaderCustomer