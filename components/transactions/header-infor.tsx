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
}

const HeaderInfor:React.FC<HeaderInforProps> = ({
    name,
    email,
    sdt,
    image,
    id
}) =>{
    const router = useRouter()
    return (

        <div className="text-neutral-200 text-[15px] px-2">
           <div className="flex items-center justify-between">
                <div className="text-[18px] capitalize mx-2 mt-2">User </div> 
                <div 
                    className="text-[14px] capitalize mx-2 mt-2 text-neutral-400 text-thin underline cursor-pointer"
                    onClick={()=> router.push(`/dashboards/customers/${id}`)}
                >
                    Detail 
                </div>
           </div>
            <hr/>
            <div className="flex items-center justify-start gap-2 px-2 mt-2">
                <div>
                    <Image 
                        src={image ? image: '/avatar'}
                        width="50"
                        height="50"
                        alt="avatar"
                        className="rounded-full aspect-square"
                    />
                </div>
                <div >
                    <div className="mb-[-1px]">{name}</div>
                    <div className="flex items-center justify-start gap-[1px]">
                        <div>
                            <GoDotFill className={cn('w-4 h-4 text-green-500')}/>
                        </div>
                        <div className="text-neutral-400">active</div>
                    </div>
                </div>
            </div>
            <table className="w-[100%] mx-2 px-2">

               
                <tr>
                    <td  className="w-[40%]">Email:</td>
                    <td className="text-neutral-400 text-thin">{email}</td>
                </tr>
                <tr>
                    <td  className="w-[40%]">SDT:</td>
                    <td className="text-neutral-400 text-thin">{sdt}</td>
                </tr>
            </table>
            
           
        </div>
    )
}

export default HeaderInfor