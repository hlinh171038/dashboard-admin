"use client"

import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaRegSquare } from 'react-icons/fa';
import { FaRegSquareCheck } from 'react-icons/fa6';
import { IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from 'sonner';

interface provincesProps {
    data: any[];
    id: string;
    errors?: any;
    setCustomValue: (id:string, value: any) =>void;
    commune: string
}

const SelectCommune:React.FC<provincesProps> = ({
    data = [],
    setCustomValue,
    errors,
    id,
    commune
}) => {

    const [array,setArray] =useState([])
    const [open,setOpen] = useState(false)
    const [openSort,setOpenSort] = useState(false)
    const [text,setText] = useState(`--- choose your ${id} ---`)
    const boxRef = useRef<any>(null);

     //handle click outside
     const handleClickOutside = (event:any) => {
        if (boxRef.current && !boxRef?.current?.contains(event.target)) {
          setOpenSort(false);
        }
      };
     

    //handle open sort
    const handleOpenSort = useCallback(()=>{
      if(data && data.length <= 0) {
        toast.warning('choose district first')
      }
        setOpenSort(!openSort)  
    },[openSort,data])

    //handle option
    const handleOption = (value:any) =>{
        setText(value)
        setCustomValue(id,value)
     
    }
    // click outside the box
    useEffect(() => {
        if (openSort) {
          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
        }
      }, [openSort]);

    useEffect(()=>{
        if(commune) {
            setText(commune)
        }
    },[])
  return (
    <div className='relative'>
        <div className="text-neutral-200 text-[15px] capitalize flex items-center justify-between">
          <div>{id}</div>
          <div>{errors?.commune && <span className="absolute top-0 right-0 text-[13px] text-red-600">{errors?.commune?.message as string}</span>}</div>
        </div>
           <div className=" w-full text-[14px] text-neutral-200 ">
                   
           <div  ref={boxRef} 
                  className={cn("bg-slate-500/60 rounded-md  px-2 py-1 w-full cursor-pointer flex items-center justify-between gap-0.5" ,
                  openSort && 'bg-neutral-100 '
                )}
                  onClick={handleOpenSort}>
              <div className={cn("duration-300 transition-all",
                 text ===`--- choose your ${id} ---` ? (openSort ? 'text-slate-900': 'text-neutral-400') : (openSort ? 'text-slate-900' : 'text-neutral-100')
               )}> {text}</div>
               {openSort && data && data.length > 0 ? (<IoMdArrowDropup  className='w-4 h-4 text-neutral-100'/>): (<MdOutlineArrowDropDown  className='w-4 h-4 text-neutral-100'/>)}
               
            </div>
            {data && data.length >0 && (
            <div className={cn("absolute top-[3.2rem] left-0 bg-slate-500 rounded-md w-full h-[150px] duration-300 transition-all cursor-pointer z-10 overflow-y-scroll",
                            openSort ? 'flex flex-col gap-1 px-2 py-1 space-y-1' : 'hidden'
                        )}>
                {data && data.map((item:any)=>{
                    return <div 
                                key={id ==="province" ? item?.idProvince  : (id === 'district' ? item?.idDistrict : item?.idCommune)}
                                onClick={()=>handleOption(item?.name)}
                                className='group hover:bg-neutral-100 hover:text-slate-900 transition-all duration-300 hover:px-2 hover:py-1 rounded-md w-full flex items-center justify-between'
                            >
                                {item?.name}
                                {text === item?.name ?(
                                <FaRegSquareCheck
                                    className=" w-4 h-4 text-neutral-100 font-thin group-hover:text-slate-900"
                                    
                                    />
                            ):(
                                <FaRegSquare
                                    className="w-4 h-4 text-neutral-100 group-hover:text-slate-900"
                                    
                                    />
                            )}
                            </div>
                })}
                        
             
            </div>
            )}
        </div>
    </div>
  )
}

export default SelectCommune
