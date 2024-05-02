"use client"

import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import QuestionNotified from "../question-notified";

import { IconType } from "react-icons/lib";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Value } from "@radix-ui/react-select";



interface InputNumberProps {
    id: string
    register: UseFormRegister<FieldValues>
    title: string;
    placeholder: string;
    type: string
    errors: FieldErrors
    disabled?: boolean
    question?: boolean
    defaultValues?: string
    wide?: boolean
    unit?: string
    value?: number
    exercute?: any;
}

const InputNumber:React.FC<InputNumberProps> = (
    {
        id,
        register,
        errors,
        disabled,
        title,
        placeholder,
        type,
        question,
        defaultValues,
        wide,
        unit,
        value:va,
        exercute
    }
) =>{
  
    return (
        <div className={cn(" flex flex-col items-start justify-start gap-[2%] w-full ",
                        wide ? "h[200px]":"h-[70px]"
                    )}>
                    <label 
                        className="
                        peer-focus:text-white 
                        peer-focus:font-bold  
                        peer-focus:drop-shadow-xl  
                        text-neutral-200 
                        text-[15px]
                        flex
                        items-center
                        justify-between
                        w-full
                        "
                        
                    >
                        {title}
                        {question && (
                            <span>
                            <QuestionNotified
                                title="?"
                                content="second email to vertified !!!"
                            />
                        </span>
                        )}
                    </label>
                    <div className="relative w-full">
                        <div className="absolute top-1 left-2 text-[14px] text-neutral-200 flex items-center justify-center">{unit ==='vnd'?'đ':(unit === 'dollar' ? '$':unit)}</div>
                        <input 
                            type={type}
                            className="px-2 py-1 pl-8 rounded-md bg-slate-500/60 text-[14px] text-neutral-200 focus:outline-none w-full" 
                            placeholder={placeholder} 
                            {...register(id)}
                            disabled={exercute}
                            />
                    </div>
                
         </div>
    )
}

export default InputNumber