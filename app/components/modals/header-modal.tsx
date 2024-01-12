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
        <div>
            <div>{title}</div>
            <button 
                onClick={onClose}
            >
                <CgClose />
            </button>
        </div>
    )
}

export default HeaderModal