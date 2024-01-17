"use client"

import { useEffect, useState } from "react";
import HeaderModal from "../../components/modals/header-modal";
import { Content } from "next/font/google";
import Input from "../../components/imputs/input";

interface ModalsProps {
    isOpen: boolean,
    onClose: () =>void;
    onOpen: () =>void;
    title: string,
    content:React.ReactElement
}

const Modals:React.FC<ModalsProps> = ({
    isOpen,
    onClose,
    onOpen,
    title,
    content
}) =>{
    const [showModal,setShowModal] = useState(isOpen)
    

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
            </div>
        </div>
    )
}

export default Modals