"use client"
import { FaPlus, FaRegSquareCheck } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { Category } from "@prisma/client";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FaRegSquare } from "react-icons/fa";

interface CategoryRadioProps {
    id: string;
    category: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    exercute?: any,
    categorys: Category[] | any;
    setCustomerValue : any;
}
const cate = ['cloth','t-shirt','shirt','pant','jean','vest','tie','belt','glasses','hat','craft','skirt','stock','bag','slipper','shoes','underware','watch','jacket']
const Categoryfilter:React.FC<CategoryRadioProps> = ({
    id,
    category,
    register,
    errors,
    exercute,
    categorys = [],
    setCustomerValue
}) =>{

  const [openSort,setOpenSort] = useState(false)
    const [text,setText] = useState(category ? category :`--- choose your ${id} ---`)
    const boxRef = useRef<any>(null);

     //handle click outside
     const handleClickOutside = (event:any) => {
        if (boxRef.current && !boxRef?.current?.contains(event.target)) {
          setOpenSort(false);
        }
      };
     

    //handle open sort
    const handleOpenSort = useCallback(()=>{

        setOpenSort(!openSort)  
    },[openSort])


    //handle choose
    const handlechoose = (item:string) =>{
      setText(item)
      setCustomerValue(id,item)
      setOpenSort(!openSort)  

    }
     // click outside the box
     useEffect(() => {
      if (openSort) {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }
    }, [openSort]);
    return (
        <div className="  w-full flex flex-col items-start justify-start gap-[1%] relative h-[70px]">
                   
                   <div className='relative w-full'>
                            <div className="text-slate-900 text-[15px] capitalize ">{id}</div>
                              <div className=" w-full text-[14px] text-neutral-200 ">
                                      
                                <div  
                                        ref={boxRef} 
                                        className={cn("bg-slate-500/60 rounded-md bg-white border border-slate-900  px-2 py-1 w-full cursor-pointer flex items-center justify-between gap-0.5",
                                                    // openSort && 'bg-neutral-100 '
                                              )} 
                                        onClick={handleOpenSort}
                                >
                                  <div className={cn("duration-300 transition-all text-slate-900 capitalize",
                                    // text ===`--- choose your ${id} ---` ? (openSort ? 'text-slate-900': 'text-neutral-400') : (openSort ? 'text-slate-900' : 'text-neutral-100')
                                    
                                  )}> {text}</div>
                                  {!openSort  ? (<MdOutlineArrowDropDown  className='w-4 h-4 text-slate-900'/>): (<IoMdArrowDropup  className='w-4 h-4 text-salte-900'/>)}
                                  
                                </div>
                                
                                  <div className={cn("absolute top-[3.2rem] left-0 bg-white border border-slate-900 rounded-md w-full h-32 duration-300 transition-all cursor-pointer z-10 overflow-x-hidden ",
                                  openSort ? 'flex flex-col gap-1 px-2 py-2 space-y-1' : 'hidden'
                              )}>
                              {categorys && categorys.map((item:any)=>{
                                  return <div
                                              key={item?.id}  
                                              onClick={()=>handlechoose(item?.name)}
                                              className=" group flex items-center justify-between capitalize text-slate-900 transition-all duration-300 hover:px-2 hover:py-1 rounded-md w-full hover:bg-neutral-100"
                                          >
                                            {item?.name}
                                            <div className="flex items-center justify-end gap-2 ">
                                              {text === item?.name ?(
                                                  <FaRegSquareCheck
                                                      className="w-4 h-4  font-thin text-slate-900"
                                                     
                                                      />
                                              ):(
                                                  <FaRegSquare 
                                                      className="w-4 h-4  text-slate-900"
                                                      
                                                      />
                                              )}
                                             
                                            </div>
                                          </div>
                              })}
                              
                              
                    </div>
                              
                            </div>
                        </div>
                    {/* </div> */}
                  </div>
    )
}

export default Categoryfilter