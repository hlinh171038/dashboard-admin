"use client"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"

  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Discount } from "@prisma/client"
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { MdOutlineKeyboardArrowLeft, MdOutlineUnfoldMore } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

  interface DiscountSearchProps {
    discount: Discount[] | any;
    detailId?: string[] | any;
    handleAddDiscountId: (value:string) => void;
    hadleDeleteDiscount: (id:string) =>void; 
    exercute?:any
  }

const DiscountSearch:React.FC<DiscountSearchProps> = ({
    discount = [],
    detailId = [],
    handleAddDiscountId,
    hadleDeleteDiscount,
    exercute
}) =>{

    const [title,setTitle] = useState('')
    const [coupon, setCoupon] = useState<any>([])
    const [voucher,setVoucher] = useState<any>([])
    const [rewards,setRewards] = useState<any>([])
    const [ship,setShip] = useState<any>([])
    const [chosen,setChosen] = useState<any>([])
    

    //handle delete
    const handleDeleteItem = useCallback((id:string)=>{
        if(!exercute) {
        const result = chosen.filter((item:any)=>item.id !== id)
        setChosen(result)
        hadleDeleteDiscount(id)
        }
    },[chosen,hadleDeleteDiscount,exercute])

    //handle command
    const handleCommand =(item:any)=>{
        if(!exercute) {
            setTitle(item.title)
            // let array = chosen
           const check = chosen.find((it:any)=>it.id === item.id)
           if(check) {
            toast.warning('have added !!');
            return;
           }
            const array = [...chosen,item];
          
           
           
         setChosen(array)
         handleAddDiscountId(item.id)
        }
       
    }


    // coupon
    useEffect(()=>{
        const result = discount && discount.filter((item:any)=>{
            return item.type === 'coupon'
        });
       
        setCoupon(result)
    },[discount])

    //voucher
    useEffect(()=>{
        const result = discount && discount.filter((item:any)=>{
            return item.type === 'voucher'
        });
      
        setVoucher(result)
    },[discount])

    //rewards
    useEffect(()=>{
        const result = discount && discount.filter((item:any)=>{
            return item.type === 'rewards'
        });
       
        setRewards(result)
    },[discount])
   

    // ship
    useEffect(()=>{
        const result = discount && discount.filter((item:any)=>{
            return item.type === 'ship'
        });
      
        setShip(result)
    },[discount])

    useEffect(()=>{
        const arr = [...detailId];
        const empty:any[] = [];
        discount && discount.forEach((item:any)=>{
            arr && arr.forEach((it)=>{
                if(item.id === it) {
                    empty.push(item);
                }
            })
        });

        setChosen(empty)
    },[discount])
    
    return (
        <div className="w-full">
            <Popover >
                <PopoverTrigger className="w-full">
                    <div className="rounded-md flex items-center justify-between px-2 text-neutral-100 text-[15px] w-full min-w-[200px] bg-slate-500/60">
                        <div className=" rounded-md  py-1 flex items-center justify-start text-neutral-400 text-[14px]">
                            {title ==='' ? "Add some discount here": title}
                        </div>
                        <div>
                            <MdOutlineUnfoldMore className="w-4 h-4 text-neutral-100" />
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent side="bottom" className="w-full">
                    <Command className="w-full">
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Coupon">
                            {coupon.map((item:any)=>{
                                return (
                                    <div
                                    key={item.id}
                                    onClick={()=>handleCommand(item)}
                                    >
                                        <CommandItem
                                        >
                                            {item.title}
                                        </CommandItem>
                                    </div>
                                    
                                )
                            })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Voucher">
                            {voucher.map((item:any)=>{
                                return (
                                    <div
                                    key={item.id}
                                    onClick={()=>handleCommand(item)}
                                    >
                                        <CommandItem
                                        >
                                            {item.title}
                                        </CommandItem>
                                    </div>
                                    
                                )
                            })}
                            
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Rewards">
                            {rewards.map((item:any)=>{
                                return (
                                    <div
                                    key={item.id}
                                    onClick={()=>handleCommand(item)}
                                    >
                                        <CommandItem
                                         
                                        >
                                            {item.title}
                                        </CommandItem>
                                    </div>
                                    
                                )
                            })}
                            
                            </CommandGroup>
                            <CommandGroup heading="ship">
                            {ship.map((item:any)=>{
                                return (
                                    <div
                                    key={item.id}
                                    onClick={()=>handleCommand(item)}
                                    >
                                        <CommandItem
                                        >
                                            {item.title}
                                        </CommandItem>
                                    </div>
                                    
                                )
                            })}
                            
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
                </Popover>
                <div className="flex flex-col gap-1 mt-2">
                    {chosen.length >0 && (
                        <table id="trend-sale-table">
                        <tr className="text-neutral-100 text-[15px]">
                            <td>Title</td>
                            <td>Type</td>
                            <td>Percent</td>
                            <td>#code</td>
                            <td>Delete</td>
                        </tr>
                       
                    { chosen.map((item:any)=>{
                        return <tr key={item.id} className="text-neutral-400 text-[14px]">
                                    <td>{item.title}</td>
                                    <td>{item.type}</td>
                                    <td>{item.percent} %</td>
                                    <td>{item.code}</td>
                                    <td>
                                        <MdDeleteOutline 
                                            className="w-4 h-4 text-neutral-400"
                                            onClick={()=>handleDeleteItem(item.id)}
                                        /> 
                                    </td>
                                </tr>
                    })}
                    </table>
                    )}
                
                </div>
        </div>
        
        
    )
}

export default DiscountSearch