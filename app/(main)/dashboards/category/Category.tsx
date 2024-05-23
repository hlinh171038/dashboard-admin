"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import TableCategory from './table'
import { User } from '@prisma/client'
import HeaderCustomer from './header'


interface CategoryProps {
  category: any;
  category2:any;
  users : User[] | any;
  currentUser:any;
  search: string;
  page: number;
  per_page: number

}

const Category:React.FC<CategoryProps> = ({
  category = [],
  category2 = [],
  users = [],
  currentUser,
  search,
  page,
  per_page
}) => {

  const [status,setStatus] = useState(true);
  const [categoryDataSearch,setCategoryDataSearch] = useState<any>(null)
  const router = useRouter()

  console.log(category)

  

  // const handleAddCategory = () =>{
  //   if(text === '') {
  //     toast.warning('Fill out category !!!');
  //      return;
  //   }

  //   axios.post('/api/add-new-category',{text})
  //     .then((res:any)=>{
  //       console.log(res?.data);
  //       toast.success('success.');
  //       router.refresh();
  //     })
  //     .catch((err:any)=>{
  //       toast.error('Some thing went wrong !!!')
  //     })
  // }

   // handle loading
   const handleLoading = useCallback((value:boolean)=>{
      setStatus(value)
  },[])

 
  return (
    <div>
      <div className="flex flex-col justify-start items-start gap-2 w-full px-2 ">
        <div className='bg-slate-600 rounded-md w-full relative'>
          <HeaderCustomer 
              category = {category}
              currentUser = {currentUser}
              category2 ={category2}
              user2 ={users}
              handleLoading = {handleLoading}
          
              />
          {/* <input type="text" onChange={(e:any)=>setText(e.target.value)} value={text} />
          <div onClick={handleAddCategory}>Add New Category +</div>
          <input type="text" onChange={(e:any)=>setTextAdd(e.target.value)} value={textAdd} /> */}
          <TableCategory 
            currentUser={currentUser}
            user2={users}
            search = {search}
            page = {page}
            status ={status}
            per_page = {per_page}
            category = {category}
            setCategoryDataSearch = {setCategoryDataSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default Category

