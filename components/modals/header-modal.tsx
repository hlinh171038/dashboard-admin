"use client"

import { CgClose } from "react-icons/cg";

interface HeaderModalProps {
    title?: string,
    onClose: () =>void;
}

const HeaderModal:React.FC<HeaderModalProps> = ({
    title,
    onClose
}) => {

    return (
        <div className="relative my-3 duration-300 transition-all">
            <div
                className="uppercase text-blue-600 font-semibold text-center text-[30px]"
            >
                {title}
            </div>
            <button 
                className="absolute top-1 right-4"
                onClick={onClose}
            >
                <CgClose className="text-red-600 hover:text-red-500 transition-all"/>
            </button>
        </div>
    )
}

export default HeaderModal