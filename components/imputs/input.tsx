import clsx from 'clsx'
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'

interface InputPros {
    id: string,
    type: string,
    label: string,
    register:UseFormRegister<FieldValues>
    required?: boolean,
    disabled?: boolean,
    errors:FieldErrors,
    isVisible?: boolean,
    name?: string

}

const Input:React.FC<InputPros> = ({
    id,
    type,
    label,
    register,
    required,
    disabled,
    errors,
    isVisible,
    name
}) => {
    console.log(isVisible)
    return (
        <div className='mb-2 px-2'>
            <input 
               
                id={id}
                type={isVisible ? ' text' :type}
                {...register(id,{required})}
                placeholder={label}
                className={clsx("rounded-md tranparent focus:outline-none border-2 focus:border-[#5DBEBB]  text-slate-600 placeholder:text-slate-300 text-[14px] w-full px-2 py-1 placeholder:capitalize",
                    errors[id] && "text-rose-500 border-rose-500 focus:boder-rose-500"
                )}
            />
        </div>
    )
}

export default Input