import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'

const Category = () => {
  const [text,setText] = useState<any>('')
  const query = useDebounce(text,300);
  const handleAddCategory = () =>{
    
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

