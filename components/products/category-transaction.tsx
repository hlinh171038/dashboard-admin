"use client"
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoMdArrowDropup } from "react-icons/io";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FaRegSquareCheck } from "react-icons/fa6";
import { FaRegSquare } from "react-icons/fa";

interface TransactionProps {
    //handleAddTransaction: (transaction:any,value:string) =>void;
    transaction: any
    exercute?:any;
    id: string;
    setCustomerValue: any;
}

const Transaction:React.FC<TransactionProps> = ({
    //handleAddTransaction,
    transaction = [],
    exercute,
    id,
    setCustomerValue
})=>{
    const [array,setArray] =useState([])
    const [open,setOpen] = useState(false)
    const [openSort,setOpenSort] = useState(false)
    const [text,setText] = useState(`--- choose your ${id} ---`)
    const [textArr,setTextArr] = useState<any>(transaction ? transaction : [])
    const boxRef = useRef<any>(null);

    console.log(textArr)

     //handle choose
  const handlechoose = (item:string,id:number) =>{
    console.log(item)
    //check item
    const arr = [...textArr];
    console.log(arr)
    const index = arr && arr.findIndex((it:any) => it == item);
    console.log(item === arr[0])
    console.log(index)
    if(index !== -1) {
        console.log('try1')
        arr && arr.splice(index,1);
        console.log(array)
    } else {
        // const obj = {
        //     id: id,
        //     value: item
        // }
        arr.push(item)
    }
    console.log(arr)
   
    setOpenSort(!openSort) 
    // const cus:string[] = [];
    // arr && arr.forEach((item:any)=>{
    //     cus.push(item?.value)
    // }) 
    setTextArr(arr);
    setCustomerValue('transaction',arr)
  }
   console.log(textArr)

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
      useEffect(()=>{
        setTextArr(transaction && transaction)
      },[transaction])
    const transactions = [
        {
            id:1,
            title:'1. Payment (Online Payment, Cash on Delivery, Installment)',
            value: 'Payment'
        },
        {
            id:2,
            title:'2. E-wallet (MoMo Wallet, ZaloPay Wallet)',
            value: "E-wallet"
        },
        {
            id:3,
            title:'3. Credit/Debit Card',
            value: "Card"
        },
        {
            id:4,
            title:'4. Cash on Delivery (COD)',
            value: 'COD'
        }
    ]
    return (
        <div className="flex flex-col gap-1  ">
          
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
                                    
                                  )}> {textArr.length > 0 ? (
                                    <div className="flex items-center justify-start gap-2">
                                        {textArr.map((item:any)=>{
                                            return <div key={item}>
                                                        {item} |
                                                    </div>
                                        })}
                                    </div>
                                  ):text}</div>
                                  {!openSort  ? (<MdOutlineArrowDropDown  className='w-4 h-4 text-neutral-100'/>): (<IoMdArrowDropup  className='w-4 h-4 text-neutral-100'/>)}
                                  
                                </div>
                                
                                  <div className={cn("absolute top-[3.2rem] left-0 bg-slate-500 rounded-md w-full  duration-300 transition-all cursor-pointer z-10  ",
                                  openSort ? 'flex flex-col gap-1 px-2 py-2 space-y-1' : 'hidden'
                              )}>
                              {transactions && transactions.map((item:any)=>{
                                  return <div
                                              key={item?.id}  
                                              onClick={()=>handlechoose(item?.value,item?.id)}
                                              className=" group flex items-center justify-between capitalize hover:bg-neutral-100 hover:text-slate-900 transition-all duration-300 hover:px-2 hover:py-1 rounded-md w-full"
                                          >
                                            {item?.title}
                                            <div className="flex items-center justify-end gap-2 ">
                                              {textArr.includes(item?.value) ? (
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

export default Transaction