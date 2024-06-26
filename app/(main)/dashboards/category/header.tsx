"use client"

import axios from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5"
import {useDebounce} from 'use-debounce'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { LuClipboardCopy } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io"

import { Category, User } from "@prisma/client"

import { toast } from "sonner"
import { RxCross2 } from "react-icons/rx"
import ExportFile from "@/components/customers/export-file"
import CopyLink from "@/components/customers/copylink"
import { MdOutlineKeyboardCommandKey } from "react-icons/md"

interface HeaderProps {
    category: Category[] | any;
    category2: Category[] | any;
    user2: User[] | any;
    currentUser: any;
    handleLoading: (value:boolean) => void;
    setAddNewLoading: any;
  
}

const Headercategory:React.FC<HeaderProps> = ({
    category =[],
    user2 = [],
    currentUser,
    category2 = [],
    handleLoading,
    setAddNewLoading,
   
}) =>{
    const [text,setText] = useState('')
    const [textAdd,setTextAdd] = useState('')
    const [current,setCurrent] = useState<any>(null)
    const [openAdd,setOpenAdd] = useState<any>(false)
 
    const [query] = useDebounce(text, 300);
    const inputRef = useRef<any>(null)
  
   
    

    const router = useRouter()

    //handle add category

    const handleAddCategory = () =>{
    if(textAdd === '') {
      toast.warning('Fill out category !!!');
       return;
    }
        setAddNewLoading(true)
    axios.post('/api/add-new-category',{text:textAdd})
      .then((res:any)=>{
        console.log(res?.data);
        
        toast.success('success.');
        router.refresh();
      })
      .catch((err:any)=>{
    
        toast.error(err?.response?.data?.error || 'some thing went wrong')
      })
      .finally(()=>{
        setAddNewLoading(false)
        setTextAdd('')
        setOpenAdd(false)
      })
  }

     //handle reset
     const handleReset = useCallback(()=>{
        router.push(`/dashboards/category?search=&page=1&per_page=10`);
        setText('')
    },[router])

    const handleAddNew = () =>{
        if(current?.role === 'no'){
            toast.warning("Only create new user with exercute peremission !!!");
            return;
        }
        if(current?.permission === 'read') {
            console.log('try2')
            toast.warning("Only create new user with exercute permission !!!");
            return;
        }
       setOpenAdd(!openAdd)
    }

    useEffect(()=>{
        handleLoading(true)
        router.push(`/dashboards/category/?search=${query}&page=1&per_page=10`)
    },[router,query,handleLoading])
    useEffect(()=>{
        const handleKeyDown = (event:any) =>{
            if(event.ctrlKey && event.key === 'm'){
                inputRef.current && inputRef.current.focus()
            }
        };
        document.addEventListener('keydown',handleKeyDown);

        return () =>{
            document.removeEventListener('keydown',handleKeyDown)
        }
    },[])

    useEffect(()=>{
        const result = user2 && user2.find((item:any)=>item.email === currentUser.user.email);
        setCurrent(result)
     },[currentUser,user2])

     
    return (
        <div>
            <div className="flex justify-between items-center px-2 py-2">
            <div className="relative w-[31.5%]">
                        <div className="absolute top-2 left-2 "><IoSearchSharp className="w-3 h-3 text-white"/></div>
                        <div className="absolute top-1.5 right-2 text-[11px] text-neutral-400 flex items-center justify-start gap-1">
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">Ctrl</div>
                    
                            <div className="border border-neutral-400 px-1 py-[0.01rem] rounded-md flex items-center justify-center">M</div>
                        </div>
                        {category && category.length < category2.length && (
                            <div className="absolute bottom-[-20px] left-0 text-[13px] text-green">
                                {category.length === 0 ? (
                                    <span className="text-red-600 flex items-center justify-start gap-8" >
                                        <span>No item matching</span>
                                        <span >
                                            <RxCross2 
                                                onClick={handleReset}
                                                className="w-3 h-3 text-red-600 cursor-pointer"/>
                                        </span>
                                    </span>
                                ) : (
                                    <span className="text-green-600 flex items-center justify-start gap-8">
                                        <span>{category.length } item is finded</span>
                                        <span >
                                            <RxCross2 
                                                onClick={handleReset}
                                                className="w-3 h-3 text-red-600 cursor-pointer"/>
                                        </span>
                                    </span>
                                )}
                            </div>
                        )}
                        <input 
                            ref={inputRef}
                            className="w-full px-2 py-1 pl-8 pr-16 rounded-md text-neutral-100 bg-slate-500/60 text-[14px] focus:outline-none" 
                            placeholder="Search ... "
                            onChange={(e)=> setText(e.target.value)}
                            value={text}
                            />
                            
                </div>
               <div className="flex items-center justify-end gap-2">
                {/* export to SCV file */}
                <ExportFile
                    data = {category}
                    currentUser = {current}
                    filename='category'
                />
                {/* coppy link */}
                    <Popover>
                        <PopoverTrigger  >
                            <LuClipboardCopy  
                                
                                className="w-4 h-4 text-neutral-400 hover:text-white transition-all duration-300" 
                            />    
                        </PopoverTrigger>
                        <PopoverContent  
                            side="bottom" 
                            align="start" 
                            sideOffset={4}
                            className="bg-neutral-100 text-slate-600 text-[13px] px-4 py-2 rounded-md mr-2"
                            >
                                <CopyLink
                                    currentUser ={currentUser}
                                    customer = {user2}
                                />
                        </PopoverContent>
                    </Popover>
                
               <button 
                    onClick={handleAddNew}
                    className="hover:text-white text-neutral-400  py-1 text-[15px] rounded-md duration-300 transition-all"
                >
                     <IoMdAdd className="w-4 h-4" /> 
                </button>
               </div>
            </div>
            {openAdd && (
                 <div className=" relative flex flex-col gap-0.5 transition-all duration-300">
                    {/* <div className="text-[15px] text-neutral-100">Add New Category </div> */}
                    <div className="flex items-center justify-start gap-1 px-2 py-1 w-full">
                     <input 
                        type="text"
                        onChange={(e:any)=>setTextAdd(e.target.value)} 
                        value={textAdd} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleAddCategory() // Call the function on Enter press
                            }
                          }}
                        placeholder="Category name.."
                        className="w-full rounded-md px-2 py-1 bg-slate-500/50 text-[14px] text-neutral-100 outline-none"
                     />
                     <div className="absolute top-[0.5rem] right-[4.6rem] text-neutral-400 text-[14px] flex items-center justify-start gap-1 ">
                            <MdOutlineKeyboardCommandKey className="w-4 h-4 " /> 
                            <span>Enter |</span>
                        </div>
                    <div 
                        onClick={handleAddCategory}
                        className="absolute top-1 right-2 underline px-2 py-1 rounded-md hover:opacity-[0.7] text-neutral-100 hover:text-white text-[14px] cursor-pointer"
                    >Add New </div>
                 </div>
                </div>
            )}
           
        </div>
    )
}

export default Headercategory