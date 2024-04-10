"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Product, Transaction } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import '@/app/globals.css'
import ItemCategory from "./item-category"

interface TrendingSaleProps {
    transaction : Transaction[] | any;
    product: Product[] | any;
    guestThisWeek: Transaction[] | any;
    guestLastWeek: Transaction[] | any
}

const TrendingSale:React.FC<TrendingSaleProps> =({
    transaction = [],
    product = [],
    guestThisWeek = [],
    guestLastWeek =[]
}) =>{

    const [categories,setCategories] = useState<any>([])
    const [categoriesLastweek,setCategoriesLastWeek] = useState<any>([])
   


  
     
      // transaction category this week
    const handleCateLastWeek = useCallback(()=>{
        const array =[...guestLastWeek];
        const emptyArr = [];

      for(let i =0 ;i<array.length;i++) {
         emptyArr.push(array[i].productId)
      }
     
      // array contain all id have been split
      let splitId:any[] = [];
      for(let ele of emptyArr) {
        splitId = splitId.concat(ele)
      }
      let result:any[] = []
      
      for(let i =0 ;i<product.length;i++) {
       
        //console.log(product[i].id)
        for(let j= 0;j<splitId.length;j++) {
        
            if(product[i].id === splitId[j]) {
          
                const obj ={
                    id:product[i].id,
                    title: product[i].category,
                }
                const exist = result.findIndex((item)=>item.id === obj.id)

                if(exist === -1) {
                 
                    result = [...result,{...obj,count:1}]
                } else {
                    result[exist].count ++;
                }
            }
        }
      }
     // filter category
     let category: any[] = [];
     for(let i= 0;i<result.length;i++) {
        const obj= {
            count:result[i].count,
            category: result[i].title
        }
        const index = category.findIndex((item)=>item.category === result[i].title)

        if(index === -1) {
            category = [...category,{...obj}]
        } else {
            category[index].count += obj.count;
        }
     }
    
     setCategories(category)
    },[guestLastWeek,product])

     // transaction category this week
     const handleCateThisWeek = useCallback(()=>{
        const array =[...guestThisWeek];
        const emptyArr = [];

      for(let i =0 ;i<array.length;i++) {
         emptyArr.push(array[i].productId)
      }

      // array contain all id have been split
      let splitId:any[] = [];
      for(let ele of emptyArr) {
        splitId = splitId.concat(ele)
      }
      let result:any[] = []
      
      for(let i =0 ;i<product.length;i++) {
  
        for(let j= 0;j<splitId.length;j++) {
        
            if(product[i].id === splitId[j]) {
               
                const obj ={
                    id:product[i].id,
                    title: product[i].category,
                }
                const exist = result.findIndex((item)=>item.id === obj.id)

                if(exist === -1) {
                  
                    result = [...result,{...obj,count:1}]
                } else {
                    result[exist].count ++;
                }
            }
        }
      }
     // filter category
     let category: any[] = [];
     for(let i= 0;i<result.length;i++) {
        const obj= {
            count:result[i].count,
            category: result[i].title
        }
        const index = category.findIndex((item)=>item.category === result[i].title)

        if(index === -1) {
            category = [...category,{...obj}]
        } else {
            category[index].count += obj.count;
        }
     }
     //console.log(category)
     setCategories(category)
    },[guestThisWeek,product])
    

    const handleCategory = useCallback((value:string)=>{
        if(value ==='thisweek'){
            handleCateThisWeek()
        }else {
            handleCateLastWeek()
        }
    },[handleCateLastWeek,handleCateThisWeek])

    // 
    useEffect(()=>{
        handleCateThisWeek()
    },[handleCateThisWeek])
    return (
        <div 
            className="flex flex-col items-center justify-between px-2 py-2 w-full"
        >
            <div 
                className="flex items-center justify-between px-2 py-2 w-full"
            >
            <div 
                    className="capitalize "
                >
                    trending sale
                </div>
            <div>
            <Select
                onValueChange={(e) =>handleCategory(e)}
            >
                <SelectTrigger className=" ">
                    Date In Week
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="thisweek">This Week</SelectItem>
                    <SelectItem value="lastweek">Last Week</SelectItem>
                   
                </SelectContent>
            </Select>
            </div>
            </div>
            {/* chart */}
           
            <div 
                className="w-full"
            >
                <table 
                    id="trend-sale-table"
                    className="w-full"
                    >
                    <tr className="text-neutral-200 text-[15px]">
                        <td>Category</td>
                        <td>Amount</td>
                        <td>Percent</td>
                    </tr>
                    {categories && categories.map((item:any)=>{
                        return <ItemCategory
                                    key={item.category}
                                    category = {item.category}
                                    amount = {item.count}
                                    categories = {categories}
                                />
                    })}
                </table>
            </div>
        </div>
    )
}

export default TrendingSale