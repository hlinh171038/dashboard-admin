"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import TableCategory from './table'
import { User } from '@prisma/client'
import HeaderCustomer from './header'
import Pagination from './pagination'


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
  const [addNewLoading,setAddNewLoading] = useState<boolean>(false)
  const router = useRouter()

  console.log(category)

  const start = (page as number - 1) * Number(per_page) ; // 0,5,10
  const end= Number(page)  * Number(per_page) ;//5,10,15
  const max = Math.ceil(category.length / per_page);
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
              setAddNewLoading = {setAddNewLoading}
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
            start ={start}
            end ={end}
            category = {category}
            addNewLoading = {addNewLoading}
          />
          <div className='flex items-center justify-end '>
            <Pagination 
              page = {page}
              per_page ={per_page}
              max={max}
              search ={search}
              handleLoading={handleLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category

