"use client"

import {IconType} from 'react-icons/lib'
import clsx from 'clsx'
import { cn } from '@/lib/utils';

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
            className={clsx(" group relative px-2 py-1 rounded-lg  transition-all  w-full text-[15px]", 
                        outline ? 'bg-white text-slate-600 hover:bg-white hover:border-slate-500 hover:text-slate-600 border-2 border-slate-600': "text-white  bg-slate-600 hover:bg-slate-500", 
                        disabled && 'opacity-70 cursor-not-allowed'
                        )}
        >
            {Icon && (
                <Icon 
                   size={20}
                   className={cn(' text-black absolute left-4 top-0.9 ',
                    outline && " group-hover:text-slate-600"
                   )}
                />
            )}
            {label}
        </button>
    )
}

export default Button