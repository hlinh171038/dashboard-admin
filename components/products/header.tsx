"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoSearchSharp } from "react-icons/io5"
import { useDebounce } from "use-debounce"

interface ProducHeaderProps {
    category: string
    brand: string
    price: string
    location: string
    stock: string
    search: string
}

const ProductHeader:React.FC<ProducHeaderProps> = ({
    category,
    brand,
    price,
    location,
    stock,
    search
}) =>{
    const [text,setText] = useState('')
    const [query] = useDebounce(text, 300);
    console.log(text)
    const router = useRouter()

    useEffect(()=>{
        router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${price}&stock=${stock}&page=1&per_page=10`)
       
    },[query,category,price,location,stock,brand,router,])
    return (
        <div>
            <div className="flex justify-between items-center px-2 py-2">
            <div className="relative">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <input 
                            className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-sm text-neutral-200 focus:outline-none" 
                            placeholder="Search ... "
                            value={text}
                            onChange={(e)=>setText(e.target.value)}
                        />
                    </div>
                <button 
                    onClick={()=>{
                        router.push('/dashboards/product/add')
                    }}
                    className="bg-slate-900 hover:bg-slate-900/40  hover:text-white text-neutral-200 px-2 py-1 text-[15px] rounded-md duration-300 transition-all">
                    Add New
                </button>
            </div>
        </div>
    )
}

export default ProductHeader