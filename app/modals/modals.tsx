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
                bg-neutral-800/80
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
                "
            >
                <HeaderModal 
                    title="title"
                    onClose={onClose}
                />
                {content}

                <Button
                    label="Register"
                    onClick={handleSubmit}
                />
                {footer}
            </div>
           
        </div>
    )
}

export default Modals