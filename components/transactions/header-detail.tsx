'use client'
import { PiMoneyDuotone } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { cn } from "@/lib/utils";

interface HeaderDetailProps {
    totalPrice : number;
    status: string;
}

const HeaderDetail:React.FC<HeaderDetailProps> = ({
    totalPrice,
    status
}) =>{
    return (
        <div className="w-full text-[14px] px-2">
            <div className=" text-neutral-200 flex flex-col items-start justify-start gap-2 w-full p-2">
                <div className="flex items-center justify-start gap-2">
                    <PiMoneyDuotone className="w-4 h-4" />
                    <span className="uppercase ">amount</span>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="text-2xl font-bold">{totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})} </div>
                    <div className="flex items-center justify-start gap-1">
                        <span>
                            <GoDotFill 
                            className={cn("w-4 h-4",
                                        status === 'pending' ? 'text-yellow-400' :(status ==="done" ? "text-green-400" : 'text-red-600')
                                        )}/>
                        </span>
                       <span className="text-neutral-200 text-[14px] capitalize"> {status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderDetail