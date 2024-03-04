"use client"

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { GoDotFill } from "react-icons/go";

interface HistoryItemProps {
    time: string;
    status: string;
    payment: string;
    id:string;
}
const HistoryItem:React.FC<HistoryItemProps> = ({
    time,
    status,
    payment,
    id
}) =>{
    const router = useRouter();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const event = new Date(new Date(time).getTime() + 24*60*60*1000);
    const r=event.toLocaleTimeString('en-US')
    const date = event.toLocaleDateString("en-US",options as any);
    return (
        <div className="flex items-start flex-col gap-[1px]">
            <div className="flex items-center justify-start gap-2">
                <div>{date}</div>
                <div>{r}</div>
            </div>
            <div className="flex items-center justify-start gap-2 text-[13px] text-neutral-400">
                <div className="flex items-center justify-start gap-1">
                        <span>
                            <GoDotFill 
                            className={cn("w-4 h-4",
                                        status === 'pending' ? 'text-yellow-400' :(status ==="done" ? "text-green-400" : 'text-red-600')
                                        )}/>
                        </span>
                       <span className=" capitalize"> {status}</span>
                </div>
                <div>-</div>
                <div>{payment === 'card'? 'online': 'offline'}</div>
                <div>-</div>
                <div 
                    className=" " 
                    onClick={()=>router.push(`/dashboards/transaction/${id}`)}
                >
                    Detail
                </div>
            </div>
        </div>
    )
}

export default HistoryItem