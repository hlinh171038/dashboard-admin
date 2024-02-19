"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";


interface RadioProps {
    id:string;
    title1:string;
    title2:string;
    register: UseFormRegister<FieldValues>;
    errors:FieldErrors;
    defaultValues?: string

}
const Radio:React.FC<RadioProps> = ({
    id,
    title1,
    title2,
    register,
    errors,
    defaultValues =''
}) =>{
    return (
        <div>
            <div className="text-neutral-200 text-[15px] capitalize">{id}</div>
            <div className="flex items-center justify-start gap-4 text-neutral-200 text-[15px] capitalize">
                <div className="flex items-center justify-start gap-1">
                    <input {...register(id)} type="radio" value={title1} required defaultChecked />
                    <label htmlFor={id}>{title1}</label>
                </div>
                <div className="flex items-center justify-start gap-1">
                    <input {...register(id)} type="radio" value={title2} required  />
                    <label htmlFor={id}>{title2}</label>
                </div>
            </div>
        </div>
    )
}

export default Radio