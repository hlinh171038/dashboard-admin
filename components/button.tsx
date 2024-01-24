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
            className={clsx("relative px-2 py-1 rounded-lg  bg-slate-600 hover:bg-slate-500 transition-all text-white w-full", 
                        outline && 'bg-white text-slate-600 hover:bg-white hover:border-slate-500 hover:text-slate-500 border-2 border-slate-600', 
                        disabled && 'opacity-70 cursor-not-allowed'
                        )}
        >
            {Icon && (
                <Icon 
                   size={24}
                   className='
                   text-black
                    absolute
                    left-4
                    top-1.5
                   ' 
                />
            )}
            {label}
        </button>
    )
}

export default Button