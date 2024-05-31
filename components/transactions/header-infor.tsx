"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";

interface HeaderInforProps {
    name: string;
    email: string;
    sdt: string;
    image: string;
    id: string;
    province: string;
    district: string;
    commune: string;
    location: string;
}

const HeaderInfor:React.FC<HeaderInforProps> = ({
    name,
    email,
    sdt,
    image,
    id,
    province,
    district,
    commune,
    location
}) =>{
    const router = useRouter()

    console.log(province)
    console.log(district)
    console.log(commune)
    console.log(location)
    return (

        <div className="text-neutral-200 text-[15px] px-2">
           <div className="flex items-center justify-between">
                <div className="text-[16px] font-semibold">User Information </div> 
                <div 
                    className="text-[14px] capitalize  mt-2 text-neutral-400 text-thin  cursor-pointer"
                    onClick={()=> router.push(`/dashboards/customers/${id}`)}
                >
                    Detail 
                </div>
           </div>
            <hr/>
            <div className="flex items-center justify-start gap-4  mt-2">
                <div>
                    <Image 
                        src={image ? image: '/avatar'}
                        width="45"
                        height="45"
                        alt="avatar"
                        className="rounded-full aspect-square object-cover"
                    />
                </div>
                <div >
                    <div className="mb-[-1px] capitalize text-[14px]">{name}</div>
                    <div className="flex items-center justify-start gap-[1px] text-neutral-400 text-[14px] font-thin">
                        {province ? province : `<Update>`}
                    </div>
                </div>
            </div>
            <table className="w-[100%]  mt-4 text-[14px]">

               
                <tr>
                    <td  className="w-[20%]">Email:</td>
                    <td className="text-neutral-400 text-thin">{email}</td>
                </tr>
                <tr>
                    <td  className="w-[15%]">SDT:</td>
                    <td className="text-neutral-400 text-thin">{sdt}</td>
                </tr>
                <tr>
                    <td  className="w-[15%] flex">Address:</td>
                    <td className="text-neutral-400 text-thin">{(location && commune && district && province) ? (location +', ' + commune +', ' + district +', '+ province) : "<Updating>"  }</td>
                </tr>
            </table>
            
           
        </div>
    )
}

export default HeaderInfor