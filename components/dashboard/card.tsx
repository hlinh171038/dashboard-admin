"use client"

import { FaRegUserCircle } from "react-icons/fa";

const Card = () =>{
    return (
        <div className="bg-slate-600 hover:bg-slate-500/40 px-4 py-2 flex justify-start gap-3 rounded-md cursor-pointer ">
            <div className="flex justify-center items-start mt-1">
                <FaRegUserCircle className="w-4 h-4 text-white " />
            </div>
            <div className="text-white hover:text-200 flex flex-col gap-2 text-[15px]">
                <div>Total users</div>
                <div>10.987</div>
                <div className="flex justify-start items-center gap-1 text-[12px] text-muted ">
                    <div className="text-green-600 ">12%</div>
                    <div>more than previous week.</div>
                </div>
            </div>
        </div>
    )
}

export default Card