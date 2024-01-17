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
        <div className="relative ">
            <div>{title}</div>
            <button 
                className="absolute top-1 right-4"
                onClick={onClose}
            >
                <CgClose />
            </button>
        </div>
    )
}

export default HeaderModal