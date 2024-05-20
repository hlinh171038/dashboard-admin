"use client"

import { cn } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";

interface provincesProps {
    data: any[];
    id: string;

    setCustomValue: (id:string, value: any) =>void;
    setProvinceSelected?: any
    province: string
}

const SelectProvince:React.FC<provincesProps> = ({
    data = [],
    setCustomValue,
    setProvinceSelected,
    id,
    province
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
        setOpenSort(!openSort)  
    },[openSort])

    //handle option
    const handleOption = (idjson:string,name:any,obj:any) =>{
        setText(name)
        setCustomValue(id,name)
        setProvinceSelected(obj)
    }
    // click outside the box
    useEffect(() => {
        if (openSort) {
          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
        }
      }, [openSort]);

      //province data take form user
      useEffect(()=>{
        if(province) {
            setText(province)
        }
      },[])
  return (
    <div className='relative'>
        <div className="text-neutral-200 text-[15px] capitalize ">{id}</div>
           <div className=" w-full text-[14px] text-neutral-200 ">
                   
            <div  ref={boxRef} className="bg-slate-500/60 rounded-md  px-2 py-1 w-full cursor-pointer flex items-center justify-between gap-0.5" onClick={handleOpenSort}>
               <div className={cn("duration-300 transition-all",
                 text ===`--- choose your ${id} ---` ? 'text-neutral-400 capitalize' : 'text-neutral-100 '
               )}> {text}</div>
               {!openSort ? (<MdOutlineArrowDropDown  className='w-4 h-4 text-neutral-100'/>): (<IoMdArrowDropup  className='w-4 h-4 text-neutral-100'/>)}
               
            </div>
            <div className={cn("absolute top-[3.2rem] left-0 bg-slate-500 rounded-md w-full h-[150px] duration-300 transition-all cursor-pointer z-10 overflow-y-scroll ",
                            openSort ? 'flex flex-col gap-1 px-4 py-2 space-y-1' : 'hidden'
                        )}>
                {data && data.map((item:any)=>{
                    return <div 
                                key={id ==="province" ? item?.idProvince  : (id === 'district' ? item?.idDistrict : item?.idCommune)}
                                onClick={()=>handleOption(item?.idProvince,item?.name,item)}
                                className='hover:text-white transition-colors duration-300'
                            >
                                {item?.name}
                            </div>
                })}
                        
             
            </div>
        </div>
    </div>
  )
}

export default SelectProvince
