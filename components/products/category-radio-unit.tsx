"use client"
import { FaPlus, FaRegSquareCheck } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FaRegSquare } from "react-icons/fa";

interface CategoryRadioProps {
    id: string;
    unit: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    exercute?:any;
    setCustomerValue?: any

}
const CategoryRadioUnit:React.FC<CategoryRadioProps> = ({
    id,
    unit,
    register,
    errors,
    exercute,
    setCustomerValue
}) =>{
  const [openSort,setOpenSort] = useState(false)
  const [text,setText] = useState(unit ? unit :`--- choose your ${id} ---`)
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
  const array = [{id:1,value:'vnd'},{id:1,value:'dollar'}]
    return (
        <div className=" col-span-1 w-full flex flex-col items-start justify-start gap-[1%] relative h-[70px]">
                    
                     <div className='relative w-full'>
                            <div className="text-neutral-200 text-[15px] capitalize ">{id}</div>
                              <div className=" w-full text-[14px] text-neutral-200 ">
                                      
                                <div  
                                        ref={boxRef} 
                                        className={cn("bg-slate-500/60 rounded-md  px-2 py-1 w-full cursor-pointer flex items-center justify-between gap-0.5",
                                                    openSort && 'bg-neutral-100 '
                                              )} 
                                        onClick={handleOpenSort}
                                >
                                  <div className={cn("duration-300 transition-all focus:bg-neutral-100 focus:text-slate-900 capitalize",
                                    text ===`--- choose your ${id} ---` ? (openSort ? 'text-slate-900': 'text-neutral-400') : (openSort ? 'text-slate-900' : 'text-neutral-100')
                                    
                                  )}> {text}</div>
                                  {!openSort  ? (<MdOutlineArrowDropDown  className='w-4 h-4 text-neutral-100'/>): (<IoMdArrowDropup  className='w-4 h-4 text-neutral-100'/>)}
                                  
                                </div>
                                
                                  <div className={cn("absolute top-[3.2rem] left-0 bg-slate-500 rounded-md w-full  duration-300 transition-all cursor-pointer z-10  ",
                                  openSort ? 'flex flex-col gap-1 px-2 py-2 space-y-1' : 'hidden'
                              )}>
                              {array && array.map((item:any)=>{
                                  return <div
                                              key={item?.id}  
                                              onClick={()=>handlechoose(item?.value)}
                                              className=" group flex items-center justify-between capitalize hover:bg-neutral-100 hover:text-slate-900 transition-all duration-300 hover:px-2 hover:py-1 rounded-md w-full"
                                          >
                                            {item?.value}
                                            <div className="flex items-center justify-end gap-2 ">
                                              {text === item?.value ?(
                                                  <FaRegSquareCheck
                                                      className="w-4 h-4 text-neutral-100 font-thin group-hover:text-slate-900"
                                                     
                                                      />
                                              ):(
                                                  <FaRegSquare 
                                                      className="w-4 h-4 text-neutral-100 group-hover:text-slate-900"
                                                      
                                                      />
                                              )}
                                             
                                            </div>
                                          </div>
                              })}
                              
                              
                    </div>
                              
                            </div>
                        </div>
                  </div>
    )
}

export default CategoryRadioUnit