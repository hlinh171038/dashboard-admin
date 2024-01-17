"use client"

import {IconType} from 'react-icons/lib'
import clsx from 'clsx'

interface ButtonProps {
    label: string,
    disabled?: boolean,
    onClick: () => void;
    outline?: boolean;
    icon?: IconType,
   
}

const Button:React.FC<ButtonProps> = ({
    label,
    disabled,
    onClick,
    outline,
    icon:Icon
}) =>{
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx("relative px-2 py-1 rounded-lg bg-blue-950 hover:bg-blue-700 transition-all", 
                        outline && 'bg-white border-black text-black', 
                        disabled && 'opacity-70 cursor-not-allowed'
                        )}
        >
            {Icon && (
                <Icon 
                   size={24}
                   className='
                    absolute
                    left-4
                    top-3
                   ' 
                />
            )}
            {label}
        </button>
    )
}

export default Button