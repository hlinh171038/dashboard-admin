"use client"

import { Product } from "@prisma/client"
import ItemProduct from "./item"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoBasketOutline } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";



interface TableProductProps {
    data: Product[] | undefined;
    query: string
    category: string
    brand: string
    price: string
    stock: string
    location: string

}

const TableProduct:React.FC<TableProductProps> = ({
    data =[],
    query,
    category,
    brand,
    price,
    stock,
    location
}) =>{
    const router = useRouter()
    const [categoryArr,setCategoryArr] = useState<any>([])
    const [brandArr,setBrandArr] = useState<any>([])
    


    const fillterCategory = useCallback(() =>{
        
        const result : any[] = [];
        for(let i=0;i<data.length;i++){
            if(!result.includes(data[i].category)){
          
                result.push(data[i].category)
             
            }
        }
       setCategoryArr(result)
    },[data])

    // filter brand
    const fillterBrand = useCallback(() =>{
        
        const result : any[] = [];
        for(let i=0;i<data.length;i++){
            if(!result.includes(data[i].brand)){
               
                result.push(data[i].brand)
            
            }
        }
       setBrandArr(result)
    },[data])

    //handle back product
    const handleBackProduct = useCallback(()=>{
        router.push(`/dashboards/product/?query=&category=&brand=&location=&price=&stock=&page=1&per_page=10`)
    },[router])

    // handle push category
    const handlePushCategory = (value:string) =>{
        router.push(`/dashboards/product/?query=${query}&category=${value==='all'?'':value}&brand=${brand}&location=${location}&price=${price}&stock=${stock}&page=1&per_page=10`)
    }
    //handle push brand
    const handlePushBrand = (value:string) =>{
        
        router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${value==='all'?'':value}&location=${location}&price=${price}&stock=${stock}&page=1&per_page=10`)
    }

    //handle push location
    const handlePushLocation = (value:string) =>{
        router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${value==='all'?'':value}&price=${price}&stock=${stock}&page=1&per_page=10`)
    }

    //handle push price
    const handlePushPrice = (value:string) =>{
        router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${value==='all'?'':value}&stock=${stock}&page=1&per_page=10`)
    }
    
    //handle push stock
    const handlePushStock = (value:string) =>{
        router.push(`/dashboards/product/?query=${query}&category=${category}&brand=${brand}&location=${location}&price=${price}&stock=${value==='all'?'':value}&page=1&per_page=10`)
    }
    
    useEffect(()=>{
       fillterCategory()
       fillterBrand()
    },[fillterBrand,fillterCategory])

    return (
       <div className="w-full h-full mt-2">
        <table className="w-full text-[15px] text-neutral-400 ">
            <tr className="font-bold text-neutral-100">
                <td>Title</td>
                <td className="relative">
                    <Select
                        onValueChange={(e) =>handlePushBrand(e)}
                    >
                        <SelectTrigger className=" ">
                            Brand
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Brand</SelectItem>
                            {brandArr.map((item: any)=>{
                                return  <SelectItem key={item} value={item as string}  >{item}</SelectItem>
                            })}
                             
                        </SelectContent>
                    </Select>

                </td>
                <td>
                    <Select
                        onValueChange={(e)=>handlePushPrice(e)}
                    >
                        <SelectTrigger className=" ">
                            Price
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Price</SelectItem>
                            <SelectItem value='100000' >
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4"/>
                                    <span>100.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='1000000'>
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4" />
                                    <span>1.000.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='5000000' >
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4"/>
                                    <span>5.000.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='10000000'>
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4" />
                                    <span>10.000.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='25000000' >
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4"/>
                                    <span>25.000.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='50000000'>
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4" />
                                    <span>50.000.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='75000000' >
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4"/>
                                    <span>75.000.000</span>
                                </div>
                            </SelectItem>
                            <SelectItem value='100000000'>
                                <div className="flex items-center justify-start">
                                    <MdOutlineKeyboardArrowLeft className="w-4 h-4" />
                                    <span>100.000.000</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </td>
                <td className="relative">
                    <Select
                        onValueChange={(e)=>handlePushCategory(e)}
                    >
                        <SelectTrigger className="">
                            Category
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Item</SelectItem>
                            {categoryArr.map((item: any)=>{
                                return  <SelectItem key={item} value={item }>{item}</SelectItem>
                            })}
                           
                        </SelectContent>
                    </Select>
                </td>
                <td>
                    <Select
                        onValueChange={(e)=>handlePushLocation(e)}
                    >
                        <SelectTrigger className="">
                            Location
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Location</SelectItem>
                            <SelectItem value="north-side" defaultChecked={true}>North Side</SelectItem>
                            <SelectItem value="soth-side" defaultChecked={true}>Soth Side</SelectItem>
                        </SelectContent>
                    </Select>
                </td>
                <td>Created At</td>
                <td>
                    <div className="flex items-center justify-center">
                    <Select
                        onValueChange={(e)=>handlePushStock(e)}
                    >
                        <SelectTrigger className=" ">
                            Stock
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all" defaultChecked={true}>All Location</SelectItem>
                            <SelectItem value="in-stock" defaultChecked={true}>In stock</SelectItem>
                            <SelectItem value="out-of-stock" defaultChecked={true}>Out of stock</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>
                </td>
                <td></td>
            </tr>
            {data.map((item)=>{
                return (
                    <ItemProduct
                        key={item.id}
                        title={item.title as string }
                        brand = {item.brand as string}
                        category = {item.category as string}
                        location = {item.location as string}
                        description={item.description as string }
                        img={item.image as string}
                        price={item.defaultPrice as number }
                        created_at={item.created_at }
                        stock={item.stock as number}
                        id = {item.id}
                    />
                )
            })}
    
          
       </table>
         {data && data.length === 0 &&(
            <div className="w-full flex flex-col items-center justify-center gap-1 text-neutral-100 text-[14px] h-[60vh]">
               
                   
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="flex items-center justify-start gap-2">
                        <IoBasketOutline  className="w-6 h-6 text-neutral-100 font-thin"/>
                        <div className=" text-[14px] uppercase">No result found !!!</div>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <span className="text-thin text-[14px] text-neutral-400 flex items-center justify-center gap-1">Click here  <span><IoReturnDownBackOutline onClick={handleBackProduct} className="text-neutral-200 w-4 h-4 cursor-pointer hover:text-white transition-all duration-300"/></span> to back to all product</span> 
                        </div>
                    </div>
            </div>
            
        )}
       </div>
    )
}

export default TableProduct