import React from 'react'
import Category from './Category'
import { getAllCategory } from '@/app/actions/getAllCategory'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getAllUser2 } from '@/app/actions/getAllUser2'
import { getAllCategory2 } from '@/app/actions/getAllCategory2'

const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {

  const search = typeof searchParams.search === 'string' ? searchParams.search : '';
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
  const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10;
    const category = await getAllCategory({search})
    const category2 = await getAllCategory2()
    const currentUser = await getServerSession(authOptions);
    const users = await getAllUser2()
  return (
    <div>
     <Category 
        category = {category}
        category2 = {category2}
        currentUser = {currentUser}
        users = {users}
        search = {search}
        page = {page}
        per_page = {per_page}
      />
    </div>
  )
}

export default page
