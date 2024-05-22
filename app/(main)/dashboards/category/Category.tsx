"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'


interface CategoryProps {
  category: any
}

const Category:React.FC<CategoryProps> = ({
  category = []
}) => {
  const [text,setText] = useState<any>('')
  const query = useDebounce(text,300);
  const router = useRouter()

  console.log(category)

  const handleAddCategory = () =>{
    if(text === '') {
      toast.warning('Fill out category !!!');
       return;
    }

    axios.post('/api/add-new-category',{text})
      .then((res:any)=>{
        console.log(res?.data);
        toast.success('success.');
        router.refresh();
      })
      .catch((err:any)=>{
        toast.error('Some thing went wrong !!!')
      })
  }
  return (
    <div>
      <div className="flex flex-col justify-start items-start gap-2 w-full px-2">
        <div className='bg-slate-600 rounded-md '>
          <input type="text" onChange={(e:any)=>setText(e.target.value)} value={text} />
          <div onClick={handleAddCategory}>Add New Category +</div>
          <table>
            <tr></tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Category

