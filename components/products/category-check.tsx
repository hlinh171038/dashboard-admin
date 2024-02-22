"use client"
import { FaPlus } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface CategoryCheckProps {
    id: string;
    tag: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors

}

const CategoryCheck:React.FC<CategoryCheckProps> = ({
    id,
    tag,
    register,
    errors
}) =>{
    return (
        <div className=" col-span-1 w-full flex flex-col items-start justify-start gap-[1%] relative h-[70px]">
                    <div className="text-[15px] text-neutral-200 ">Category</div>
                    <div 
                      className="group bg-slate-500/60 text-neutral-300 px-2 py-1 hover:bg-slate-500/80 hover:text-white cursor-pointer text-[14px] rounded-md w-full flex items-center justify-between transition-all duration-300"
                    >
                     <span> {tag === '' ? 'Tag': tag}</span>
                     <Popover>
                      <PopoverTrigger  >
                        <FaPlus className="text-neutral-300 group-hover:text-white w-3 h-3 group-hover:w-4 group-hover:h-4" />
                      </PopoverTrigger>
                      <PopoverContent 
                        sideOffset={10} 
                        alignOffset={10} 
                        side="bottom"
                        className="
                          mr-4
                        "
                        >
                           <div className="uppercase w-full flex items-center justify-center">categories</div>
                          <div className="grid grid-cols-3 text-[14px] text-slate-900">
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="cloth" defaultChecked/>
                                  Cloth
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="bag"/>
                                  Bag
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="cloth"/>
                                  Cloth
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="watch"/>
                                  Watch
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="hat"/>
                                  Hat
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="tie"/>
                                  Tie
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="umbrella"/>
                                  Umbrella
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="shoes"/>
                                  Shoes
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="glass"/>
                                  Glass
                              </label>
                              <label className="">
                                  <input type="checkbox" {...register(id)} value="skirt"/>
                                  Skirt
                              </label>
                          </div>
                          
                      </PopoverContent>
                    </Popover>
                    </div>
                  </div>
    )
}

export default CategoryCheck