"use client"

import { useCallback, useEffect, useState } from "react";
import HeaderModal from "../../components/modals/header-modal";
import { Content } from "next/font/google";
import Input from "../../components/imputs/input";
import Button from "@/components/button";

interface ModalsProps {
    isOpen: boolean,
    onClose: () =>void;
    onOpen: () =>void;
    onSubmit: () => void;
    title: string,
    content:React.ReactElement,
    footer:React.ReactElement
}

const Modals:React.FC<ModalsProps> = ({
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    title,
    content, 
    footer
}) =>{
    const [showModal,setShowModal] = useState(isOpen)
    

    // handle submit
    const handleSubmit = useCallback(()=>{
        onSubmit()
    },[onSubmit])

    
    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen])

    if(!showModal) {
        return null;
    }
    return (
        <div

            className="
                bg-neutral-600/60
                border-[1px]
                shadow-md
                flex
                justify-center
                items-center
                w-screen
                h-screen
                z-50
                fixed
            "
        >
            <div
                className="
                    w-full
                    md:w-3/6
                    h-full
                    md:h-auto
                    bg-white
                    rounded-md
                    shadow-md
                "
            >
                <HeaderModal 
                    title={title}
                    onClose={onClose}
                />
                {content}

               <div className="p-2 w-full">
                <button
                    onClick={handleSubmit}
                    className="text-white bg-blue-600 py-1.5 rounded-md flex items-center justify-center w-full hover:bg-blue-500 transition-colors"
                >
                    {title}
                </button>
               </div>
               <div className="px-2 py-2 pt-4 flex items-center justify-center text-neutral-400">
                    <div className="border-t-2 border-neutral-400 w-[50%] text-blue-600   px-2"></div>
                    <div>or</div>
                    <div className="border-t-2 border-neutral-400 w-[50%] text-blue-600   px-2"></div>
               </div>
                {footer}
            </div>
           
        </div>
    )
}

export default Modals