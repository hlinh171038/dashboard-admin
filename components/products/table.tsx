"use client"

import { Product } from "@prisma/client"
import ItemProduct from "./item"
import { MdOutlineUnfoldMore } from "react-icons/md";
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
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiMiniMinusSmall } from "react-icons/hi2";



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
    const [array,setArray] = useState(data)
    console.log(data)

    const fillterCategory = useCallback(() =>{
        
        const result : any[] = [];
        for(let i=0;i<data.length;i++){
            if(!result.includes(data[i].category)){
                console.log(data[i].category)
                result.push(data[i].category)
                console.log(result)
            }
        }
       setCategoryArr(result)
    },[data])

    // filter brand
    const fillterBrand = useCallback(() =>{
        
        const result : any[] = [];
        for(let i=0;i<data.length;i++){
            if(!result.includes(data[i].brand)){
                console.log(data[i].brand)
                result.push(data[i].brand)
                console.log(result)
            }
        }
       setBrandArr(result)
    },[data])

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
       <table className="w-full text-[15px] text-white ">
            <tr className="font-bold ">
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
                </td>
                <td>Action</td>
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
                        
                    />
                )
            })}
       </table>
    )
}

export default TableProduct