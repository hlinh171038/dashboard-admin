"use client"

import { useEffect, useState } from "react";
import HeaderModal from "../components/modals/header-modal";

interface ModalsProps {
    isOpen: boolean,
    onClose: () =>void;
    onOpen: () =>void;
    title: string
}

const Modals:React.FC<ModalsProps> = ({
    isOpen,
    onClose,
    onOpen,
    title
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
                bg-neutral-700/80
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
                "
            >
                <HeaderModal 
                    title="title"
                    onClose={onClose}
                />
                modal
            </div>
        </div>
    )
}

export default Modals