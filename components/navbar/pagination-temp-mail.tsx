"use client"

import { useCallback, useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import { Skeleton } from "../ui/skeleton";

interface paginProps {
    pagin: any;
    setPage:any;
    isLoading:any;
}

const PaginationTempMail:React.FC<paginProps> = ({
    pagin,
    setPage,
    isLoading
}) =>{

    const [line,setLine] = useState(1)
    const [perLine,setPerLine] = useState(4);

    const startPagin = (line *perLine) - perLine;
    const endPagin = line * perLine;

    //handle pagin show
    const handleShowPagin = () =>{
       if(pagin && pagin.length - endPagin >0) {
            setLine(line +1)
       }
    }

    //handle increasing pagin
    const handleIncreasingPagin = () =>{
        if(pagin && pagin.length - endPagin >0) {
            setLine(line +1)
       }
    }
    //handle increasing pagin
    const handleDescreasingPagin = () =>{
        if(pagin && pagin.length - startPagin  < pagin.length) {
            setLine(line -1)
       }
    }

    const handlePaginClick = useCallback((value:any)=>{
        setPage(value)
    },[])
    return (
        <div className="flex items-center justify-end gap-1 text-neutral-400">
                        <div>
                            <MdOutlineKeyboardArrowLeft className="w-4 h-4" onClick={handleDescreasingPagin}/>
                        </div>
                        {isLoading && <div className="flex items-center justify-end gap-1">
                                        <Skeleton className ="w-2 h-4" />
                                        <Skeleton className ="w-2 h-4" />
                                        <Skeleton className ="w-2 h-4" />
                                        <Skeleton className ="w-2 h-4" />
                                    </div>}
                        {pagin && pagin.length - startPagin  < pagin.length && '...'}
                        {
                            pagin.length >0 && pagin.slice(startPagin,endPagin).map((item:any)=>{
                                return (
                                    <div key={item} onClick={()=>handlePaginClick(item)} className="cursor-pointer ">{item}</div>
                                )
                            })
                        }
                        {pagin && pagin.length - endPagin >0 &&'...'}
                        <div>
                            <MdOutlineKeyboardArrowRight className="w-4 h-4" onClick={handleIncreasingPagin}/>
                        </div>
                   </div>
    )
}

export default PaginationTempMail