"use client"

import { FcCustomerSupport } from "react-icons/fc";
import { BiSupport } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { PiPhoneDisconnect } from "react-icons/pi";

const array = [
    {
        icon:<BiSupport className="w-6 h-6 " />,
        title:"support centre",
        number:'090999999'
    },
    {
        icon:<BsShop className="w-6 h-6 " />,
        title:"shop owner",
        number:'033722517'
    },
    {
        icon:<PiPhoneDisconnect className="w-6 h-6 " />,
        title:"team lead",
        number:'009072441'
    },
]



const Mail = ({
  
}) =>{
    return (
        <div className=" text-neutral-400 text-[14px] pb-2 ">
            {/*header*/}
            <div  className="grid grid-cols-3 items-center justify-between gap-2">
                {array.map((item)=>{
                    return (
                        <div 
                            key={item.number}
                            className="grid grid-cols-3  rounded-md px-2 py-1 bg-slate-600 text-[14px]"
                        >
                        
                            <div className="col-span-1 flex items-center justify-center">{item.icon}</div>
                            <div className="col-span-2 flex flex-col gap-y-0.5  ">
                                
                                <div className="text-neutral-100 capitalize">{item.title}</div>
                                <div className="text-neutral-400 cursor-pointer">+ {item.number}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Mail