import clsx from 'clsx'
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'

interface InputPros {
    id: string,
    type: string,
    label: string,
    register:UseFormRegister<FieldValues>
    required?: boolean,
    disabled?: boolean,
    errors:FieldErrors

}

const Input:React.FC<InputPros> = ({
    id,
    type,
    label,
    register,
    required,
    disabled,
    errors
}) => {

    return (
        <div className='mb-2 px-2'>
            <input 
                id={id}
                type={type}
                {...register(id,{required})}
                placeholder={label}
                className={clsx("rounded-md tranparent focus:outline-none border-2 focus:border-sky-500  text-slate-600 placeholder:text-slate-300 w-full p-2",
                    errors[id] && "text-rose-500 border-rose-500 focus:boder-rose-500"
                )}
            />
        </div>
    )
}

export default Input