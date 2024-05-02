"use client"

import { cn } from "@/lib/utils";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import QuestionNotified from "../question-notified";

interface InputCustomerIdProps {
    id: string
    register: UseFormRegister<FieldValues>
    title: string;
    placeholder: string;
    type: string
    errors: FieldErrors
    disabled?: boolean
    question?: boolean,
    defaultValues?: string,
    wide?: boolean
}

const InputCustomerId:React.FC<InputCustomerIdProps> = (
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
        wide
    }
) =>{
    return (
        <div className={cn(" flex flex-col items-start justify-start gap-2 relative ",
                        wide ? "h[200px]":"h-[70px]"
                    )}>
                <input 
                type={type} 
                {...register(id,{ required: true })}
                placeholder={placeholder} 
                value={defaultValues && defaultValues}
                disabled ={disabled}
                className={cn(" peer absolute top-5 left-0 rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize",
                                errors[id] && "text-red-600 border-red-600"
                             )}
             />
                <label 
                    className="
                    peer-focus:text-white 
                    peer-focus:font-bold  
                    peer-focus:drop-shadow-xl  
                    absolute 
                    top-0 
                    left-0 
                    text-neutral-200 
                    text-[15px]
                    flex
                    items-center
                    justify-between
                    w-full
                    capitalize
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
         </div>
    )
}

export default InputCustomerId