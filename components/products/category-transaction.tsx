"use client"
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface TransactionProps {
    handleAddTransaction: (transaction:any,value:string) =>void;
    transaction: any
    exercute?:any
}

const Transaction:React.FC<TransactionProps> = ({
    handleAddTransaction,
    transaction = [],
    exercute
})=>{
    const [array,setArray] =useState([])
    const [open,setOpen] = useState(false)
    const [openSort,setOpenSort] = useState(false)
    const [textSort,setTextSort] = useState('sort by ...')
    const boxRef = useRef<any>(null);
   

     //handle click outside
     const handleClickOutside = (event:any) => {
        if (boxRef.current && !boxRef?.current?.contains(event.target)) {
          setOpenSort(false);
        }
      };
     

    //handle open sort
    const handleOpenSort = useCallback(()=>{
        if(!exercute) {
            setOpenSort(!openSort)
        }
        
    },[openSort,exercute])
    // click outside the box
    useEffect(() => {
        if (openSort) {
          document.addEventListener('click', handleClickOutside);
          return () => document.removeEventListener('click', handleClickOutside);
        }
      }, [openSort]);
    
    return (
        <div className="flex flex-col gap-1  ">
            <div className="text-neutral-200 text-[15px] mb-[-3px]">Transportation</div>
            {/* <Select>
            <SelectTrigger className="w-full bg-slate-500/60 rounded-md px-2 py-1 text-[15px] text-neutral-400">
            {transaction.length >0 ?(
                    transaction.map((item:any)=>{
                        return <div 
                                className="cursor-pointer"
                                key={item}>
                                    {item} |
                                </div>
                    })
                ):"Transaction..."}
            </SelectTrigger>
            <SelectContent>
                <div className="cursor-pointer hover:bg-slate-500/60 w-full rounded-md px-2 transition-all duration-300 text-[14px]" onClick={()=>handleAddTransaction(array,'payment on delivery')}>Payment on delivery</div>
                <div className="cursor-pointer hover:bg-slate-500/60 w-full rounded-md px-2 transition-all duration-300 text-[14px]" onClick={()=>handleAddTransaction(array,'payment on card')}>Payment on card</div>
            </SelectContent>
            </Select> */}
           <div className=" w-full text-[14px] text-neutral-200 ">
                   
                   <div  ref={boxRef} className="bg-slate-500/60 rounded-md  px-2 py-1 w-full cursor-pointer flex items-center justify-start gap-0.5" onClick={handleOpenSort}>
                    {transaction.length >0 ?(
                        transaction.map((item:any)=>{
                            return <div 
                                    className="cursor-pointer"
                                    key={item}>
                                        {item} |
                                    </div>
                        })
                    ):"Transaction..."}
                    </div>
                   <div className={cn("absolute top-[3.2rem] left-0 bg-slate-500/60 rounded-md w-full duration-300 transition-all cursor-pointer z-10",
                                   openSort ? 'flex flex-col gap-1 px-2 py-1' : 'hidden'
                               )}>
                             
                       <div onClick={()=>handleAddTransaction(array,'payment on delivery')} className="text-[14px] text-neutral-400 hover:text-neutral-100 ">online</div>
                       <div onClick={()=>handleAddTransaction(array,'payment on card')} className="text-[14px] text-neutral-400 hover:text-neutral-100 ">offline</div>
                      
                   </div>
               </div>
        </div>
    )
}

export default Transaction