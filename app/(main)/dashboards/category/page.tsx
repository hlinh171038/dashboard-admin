import React from 'react'
import Category from './Category'
import { getAllCategory } from '@/app/actions/getAllCategory'

const page = async() => {
    const category = await getAllCategory()
  return (
    <div>
     <Category category = {category}/>
    </div>
  )
}

export default page
