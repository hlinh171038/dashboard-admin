"use client"
import { FaPlus } from "react-icons/fa6";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import QuestionNotified from "../question-notified";

interface CategoryRadioProps {
    id: string;
    category: string,
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
    exercute?: any
}
const cate = ['cloth','t-shirt','shirt','pant','jean','vest','tie','belt','glasses','hat','craft','skirt','stock','bag','slipper','shoes','underware','watch','jacket']
const CategoryRadio:React.FC<CategoryRadioProps> = ({
    id,
    category,
    register,
    errors,
    exercute
}) =>{
    return (
        <div className=" col-span-1 w-full flex flex-col items-start justify-start gap-[1%] relative h-[70px]">
                    <div className="text-[15px] text-neutral-200 flex items-center justify-between w-full">
                      <div>Category</div>
                      <QuestionNotified
                        title="category" 
                        content="Click + button to add product's category"
                      />
                    </div>
                    <div 
                      className="group bg-slate-500/60 text-neutral-300 px-2 py-1 hover:bg-slate-500/80 hover:text-white cursor-pointer text-[14px] rounded-md w-full flex items-center justify-between transition-all duration-300"
                    >
                     <span> {category === '' ? 'Category': category}</span>
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
                          rounded-md
                        "
                        >
                           <div className="uppercase w-full flex items-center justify-center">categories</div>
                          <div className="grid grid-cols-3 text-[14px] text-slate-900 px-4 py-4 gap-1">
                            {cate.map((item)=>{
                                return (<label 
                                            key={item} 
                                            className="flex items-center justify-start">
                                            <input type="radio" {...register(id)} value={item} disabled={exercute && exercute} />
                                            <span>{item}</span>
                                        </label>)
                            })}
                              
                          </div>
                          
                      </PopoverContent>
                    </Popover>
                    </div>
                  </div>
    )
}

export default CategoryRadio