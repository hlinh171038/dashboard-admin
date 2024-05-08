"use client"

import { cn } from "@/lib/utils";
import { Discount } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdCopyAll } from "react-icons/md";
import { toast } from "sonner";

interface DiscountDetailProps {
    discount: Discount[] | any;
    id?: string;
}

const DiscountDetail:React.FC<DiscountDetailProps> = ({
    discount = [],
    id,
}) =>{
   const [discountDetail,setDiscountDetail] = useState<any>([])
   const [read,setRead] = useState(false);
   const [readVoucher,setReadVoucher] = useState(false)
   const [type,setType] = useState('')
   const [day,setDay] = useState<number>(0);
   const [hours,setHours] = useState<number>(0);
   const router = useRouter()

    useEffect(()=>{
       const result = discount && discount.filter((item:any)=>item.id === id);
        setDiscountDetail(result[0])
    },[discount,id])

    // handle copy code

    const handleCopy =(id:string) =>{
        navigator.clipboard.writeText(id)
        toast.success("coppied to clipboard")
      }

      // time
    useEffect(()=>{
        const now:any = new Date();
        const end:any = new Date(discountDetail.endDate)
        const diff = end -now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setDay(days);
        setHours(hours)
    },[discountDetail])

    //type
    useEffect(()=>{
        setType(discountDetail && discountDetail.type)
    },[discountDetail])
   const left = discountDetail.transaction && discountDetail.transaction.length

   //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
    return (
        <div className="bg-none rounded-md px-2 w-full grid grid-cols-5 gap-2">
            <div className="col-span-3 flex flex-col gap-2 bg-slate-600 rounded-md text-[14px] text-neutral-400 p-2">
                <div className="flex items-center justify-between">
                    <div className="text-[15px] font-bold text-neutral-100 uppercase">Detail {discountDetail.type} : <span className="text-neutral-400 font-thin text-[14px] normal-case">{id}</span></div>
                    {new Date(discountDetail.endDate) > new Date()?(
                        <span className="flex items-center justify-start gap-0.5 ">
                            <GoDotFill className="text-green-600 w-4 h-4"/>
                            <span>Valid</span>
                        </span>
                    ):(
                        <span className="flex items-center justify-start gap-0.5">
                            <GoDotFill className="text-red-600 w-4 h-4"/>
                            <span>Invalid</span>
                        </span>
                    )}
                </div>
                {/* detail code */}
                <div>
                    <div className="text-neutral-100 text-[15px] capitalize">{discountDetail.type} Code  </div>
                    <div className="text-[14px] text-neutral-400 "> The code use to valid this {discountDetail.type}</div>
                    <div className="bg-slate-500/60 px-2 py-1 rounded-md flex items-center justify-between">
                        <div>{discountDetail.code}</div>
                        <MdCopyAll onClick={()=>handleCopy(discountDetail && discountDetail.code)} className="w-4 h-4 text-neutrl-400 hover:text-neutral-100"/>
                    </div>
                </div>
                {/* title */}
                <div>
                    <div  className="text-neutral-100 text-[15px]" >Title:</div>
                    <div>{discountDetail.title}</div>
                </div>
                {/* description */}
                <div>
                    <div  className="text-neutral-100 text-[15px]" >Title:</div>
                    <div>{discountDetail.description && (discountDetail.description.length >200 ? (
                        <span>{!read ?discountDetail.description.substring(0,200)+ '...':discountDetail.description} 
                            <span 
                                onClick={()=>setRead(!read)}
                                className="underline text-[13px] ml-2 cursor-pointer"
                            >
                                {!read ?'read more':'collapse'}
                            </span>
                        </span>
                    ): discountDetail.description)}
                    </div>
                </div>
                {/* type */}
                <div>
                    <div className="text-neutral-100 text-[15px]"   >Type:</div>
                 
                    <div className="flex flex-col gap-2">
                            <div className="col-span-1 border border-neutral-100 px-2 py-1 flex items-center justify-between">
                                <div>Rewards</div>
                                {discountDetail.type ==='rewards' ?(
                                        <FaRegSquareCheck 
                                        className="w-4 h-4 text-neutral-100"
                                    
                                        />
                                        
                                    ):(
                                        <FaRegSquare 
                                            className="w-4 h-4 text-neutral-100 font-thin"
                                            
                                            />
                                    )}
                            </div>
                            <div className="col-span-1 border border-neutral-100 px-2 py-1 flex items-center justify-between">
                            <div>Coupon</div>
                                {discountDetail.type ==='coupon' ?(
                                        <FaRegSquareCheck 
                                        className="w-4 h-4 text-neutral-100"
                                    
                                        />
                                        
                                    ):(
                                        <FaRegSquare 
                                            className="w-4 h-4 text-neutral-100 font-thin"
                                            
                                            />
                                    )}
                            </div>
                            <div className="col-span-1 border border-neutral-100 px-2 py-1 flex items-center justify-between">
                                <div>Voucher</div>
                                {discountDetail.type ==='voucher' ?(
                                        <FaRegSquareCheck 
                                        className="w-4 h-4 text-neutral-100"
                                    
                                        />
                                        
                                    ):(
                                        <FaRegSquare 
                                            className="w-4 h-4 text-neutral-100 font-thin"
                                            
                                            />
                                    )}
                            </div>
                            <div className="col-span-1 border border-neutral-100 px-2 py-1 flex items-center justify-between">
                                <div>Ship</div>
                                {discountDetail.type ==='ship' ?(
                                        <FaRegSquareCheck 
                                        className="w-4 h-4 text-neutral-100"
                                    
                                        />
                                        
                                    ):(
                                        <FaRegSquare 
                                            className="w-4 h-4 text-neutral-100 font-thin"
                                            
                                            />
                                    )}
                            </div>
                    </div>
                </div>

                {/* date */}
                
               <div>
                <div className="text-neutral-100 text-[15px]"> Date:</div>
                    <div className="flex items-center justify-between">
                        <span>Valid Time which you can use this {discountDetail.type}</span> 
                        <span>Expiring soon: {day+'d' +" - "+ hours+'h' + ' left'}</span>
                    </div>
                    <div className="bg-slate-500/60 rounded-md px-2 py-1 flex items-center justify-start gap-2">
                        <div>{new Date(discountDetail.startDate).toLocaleString()}</div>
                        <div>-</div>
                        <div>{new Date(discountDetail.endDate).toLocaleString()}</div>
                    </div>
               </div>
                <div className="flex items-center justify-start gap-2">
                    <div className="text-neutral-100 text-[15px]">Percent:</div>
                    <div>{discountDetail.percent } %</div>
                </div>
                {/* quantity */}
                <div>
                    <div className="text-neutral-100 text-[15px]">Quantity:</div>
                    <div>
                        <div className="flex items-center justify-start gap-2">
                            <div>Total:</div>
                            <div>{discountDetail.count} {discountDetail.type}</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <div>Number of codes left:</div>
                            <div>{left } {discountDetail.type}</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <div>Number of codes remained:</div>
                            <div>{discountDetail.count - left } {discountDetail.type}</div>
                        </div>
                    </div>
                </div>
            </div>
            {discountDetail.type ==='ship'?(
                <div className="col-span-2 flex items-start justify-center mt-8 w-full ">
                    
                    <div className=" relative grid grid-cols-3 w-[80%]">
                        <div className="col-span-1 bg-[#4FA29E] px-2 py-2">
                            <div className="uppercase text-[20px] text-white py-2 ">freeShip</div>
                            <div className="capitalize text-[12px] text-neutral-100 pl-2">shipping code</div>
                        </div>
                        <div className="col-span-2 bg-neutral-100 text-neutral-400 text-[14px] px-2 flex flex-col justify-between">
                            <div>
                                <div className="capitalize text-[16px] font-bold text-slate-900 mt-2">maximum decrese: {discountDetail.percent} %</div>
                                <div className="capitalize text-slate-900">{discountDetail && discountDetail.condition}</div>
                            </div>
                            <div className="text-[12px] mt-[5%]">Expiring soon: {day+'d' +" - "+ hours+'h' + ' left'}</div>
                        </div>
                        <div className="w-10 h-10 bg-[#262E3F] absolute top-[-25px] left-[-28px] rounded-full">
                            
                        </div>
                        <div className="w-10 h-10 bg-[#262E3F] absolute bottom-[-25px] left-[-28px] rounded-full">

                        </div>
                    </div>
                </div>
            ):
            (
                <div className="col-span-2 flex items-start justify-center mt-8">
                <div className=" relative w-[50%]  text-[14px] text-neutral-400 bg-neutral-100 shadow-md">
                    {/* header */}
                    <div className="capitalize text-[15px] border-[#5EC0B5] px-1 py-0.5">
                        {discountDetail.title}
                    </div>
                    <Image 
                            src={'/star.webp'}
                            width={100}
                            height={100}
                            alt="discount"
                            className="absolute top-[-25px] right-[-45px] rotate-12"
                        />
                    <div className="absolute top-2 right-[-16px] text-red-600 text-[17px] font-bold ">
                        <div className="flex items-center justify-center w-8 ">
                        {discountDetail.percent } <span className="normal-case font-thin">%</span>
                        </div>
                    </div>
                    <div>
                        <Image 
                            src="/discount.webp"
                            width={400}
                            height={40}
                            alt="discount picture"
                            className="w-full "
                        />
                    </div>
                    <div className="grid grid-cols-3">
                        <div className={cn("col-span-1 border border-neutral-100 px-2 py-1",
                                            discountDetail.type === 'rewards' && 'bg-neutral-400 text-white'
                                                )}
                        >rewards</div>
                        <div  className={cn("col-span-1 border border-neutral-100 px-2 py-1",
                                            discountDetail.type === 'coupon' && 'bg-neutral-400 text-white'
                                                )}>coupon</div>
                        <div  className={cn("col-span-1 border border-neutral-100 px-2 py-1",
                                            discountDetail.type === 'voucher' && 'bg-neutral-400 text-white'
                                                )}>voucher</div>
                    </div>
                    {/* information */}
                    <div className="px-2 py-1">
                    <div>{discountDetail.description && (discountDetail.description.length >200 ? (
                        <span>{!readVoucher ?discountDetail.description.substring(0,100)+ '...':discountDetail.description} 
                            <span 
                                onClick={()=>setReadVoucher(!readVoucher)}
                                className="underline text-[13px] ml-2 cursor-pointer"
                            >
                                {!readVoucher ?'read more':'collapse'}
                            </span>
                        </span>
                    ): discountDetail.description)}
                    </div>
                    </div>
                    <div className="flex items-center justify-start gap-0.5 mx-2 text-[13px] border-t border-neutral-400">
                        <div>Valid: {new Date(discountDetail.startDate).toLocaleDateString()}</div>
                        <div>-</div>
                        <div>{new Date(discountDetail.endDate).toLocaleDateString()}</div>
                    </div>
                </div>
           </div>
            )
        }
        </div>
    )
}

export default DiscountDetail