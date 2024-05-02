"use client"
import { FaPlus } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface CategoryRadioProps {
    id: string;
    unit: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    exercute?:any

}
const CategoryRadioUnit:React.FC<CategoryRadioProps> = ({
    id,
    unit,
    register,
    errors,
    exercute
}) =>{
    return (
        <div className=" col-span-1 w-full flex flex-col items-start justify-start gap-[1%] relative h-[70px]">
                    <div className="text-[15px] text-neutral-200 ">Unit</div>
                    <div 
                      className="group bg-slate-500/60 text-neutral-300 px-2 py-1 hover:bg-slate-500/80 hover:text-white cursor-pointer text-[14px] rounded-md w-full flex items-center justify-between transition-all duration-300"
                    >
                     <span> {unit === '' ? 'Category': unit}</span>
                     <Popover>
                      <PopoverTrigger  >
                        <FaPlus className="text-neutral-300 group-hover:text-white w-3 h-3 group-hover:w-4 group-hover:h-4" />
                      </PopoverTrigger>
                      <PopoverContent 
                        sideOffset={10} 
                        alignOffset={10} 
                        side="bottom"
                        >
                          <div className="grid grid-cols-3 text-[14px] text-slate-900">
                              <label className="flex items-center justify-start">
                                  <input  className="text-slate-900" type="radio" {...register(id)} value="vnd" defaultChecked disabled={exercute}/>
                                  <span>Vnd</span>
                              </label>
                              <label className="flex items-center justify-start">
                                  <input className="text-slate-900"  type="radio" {...register(id)} value="dollar" disabled={exercute}/>
                                  <span>Dollar</span>
                              </label>
                             
                          </div>
                          
                      </PopoverContent>
                    </Popover>
                    </div>
                  </div>
    )
}

export default CategoryRadioUnit