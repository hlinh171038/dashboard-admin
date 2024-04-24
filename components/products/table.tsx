"use client"

import { Product, User } from "@prisma/client"
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
import { MdAutoDelete, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { IoBasketOutline } from "react-icons/io5";
import { IoReturnDownBackOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Skeleton } from "../ui/skeleton";

const array = [0,1,2,3,4,5,6,7,8,9]

interface TableProductProps {
    //data: Product[] | undefined;
    query: string
    category: string
    brand: string
    price: string
    stock: string
    location: string
    startDate: string
    endDate: string
    start: number
    end: number
    status: boolean
    currentUser:any
    users: User[] | any;
}

const TableProduct:React.FC<TableProductProps> = ({
    //data =[],
    query,
    category,
    brand,
    price,
    stock,
    location,
    startDate,
    endDate,
    start,
    end,
    status,
    currentUser,
    users =[]
}) =>{
    const router = useRouter()
    const [data,setData] = useState<any>([])
    const [categoryArr,setCategoryArr] = useState<any>([])
    const [brandArr,setBrandArr] = useState<any>([])
    const [checkId,setCheckId] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [currentUserInfo,setCurrentUserInfo] = useState<any>([])

    const updateData = data.slice(start,end)

    //handle orther check
    const handleOtherCheck = useCallback((id:string)=>{
        const tempArr = [...checkId];
        const index = tempArr.includes(id);
        console.log(index);
       if(!index) {
        tempArr.push(id)
       } else {
        const position = tempArr.indexOf(id)
        tempArr.splice(position,1)
       }
        console.log(tempArr);
        setCheckId(tempArr)
    },[checkId])

    //handle delete
    const handleDelete = useCallback((array:any[])=>{
        if(!currentUser) {
            toast.warning('have not login !!!');
            return;
        }
        setIsLoading(true)
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/delete-product',{checkId:array})
            .then((res)=>{
                console.log(res.data)
                setData(res?.data && res?.data)
                //toast.success('removed ');
                router.refresh()
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
                router.push('/dashboards/product?query=&category=&brand=&location=&price=&stock=&page=1&per_page=10')
            })
            axios.post('/api/create-new-history',{
                userId: currentUserInfo && currentUserInfo.id,
                title:`removed ${array && array.length} user`,
                type: 'removed-product'
            })
            .then((res)=>{
                
                toast.success('removed');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).
            finally(()=>{
                setIsLoading(false)
            })
    },[router,currentUserInfo,currentUser])


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

     // search + skelton
     useEffect( ()=>{
        setIsLoading(true)
       // console.log(array)
        axios.post('/api/filter-product',{query,category,brand,location,price,stock,startDate,endDate})
            .then((res)=>{
                console.log(res.data)
                setData(res.data && res.data)
                //toast.success('search ');
                router.refresh()
               
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).finally(()=>{
                setCheckId([]);
                setIsLoading(false)
               
            })
     },[query,category,brand,location,price,stock,startDate,endDate,router])
    console.log(data)

    useEffect(()=>{

        if(currentUser) {
            const result = users && users.find((item:any)=>item.email === currentUser?.user.email);
            setCurrentUserInfo(result)
        }
        
      },[currentUser,users])

    return (
       <div className="w-full h-full mt-2">
        {checkId.length >0 && (
                <button
                    disabled ={isLoading}
                    onClick={()=>handleDelete(checkId)}
                    className="absolute top-2 left-[30%] text-neutral-100 px-2 py-1 bg-red-600 rounded-md text-[14px] flex items-center justify-start gap-0.5">
                    Delete
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="flex items-center justify-end"><MdAutoDelete className="w-4 h-4"/></div>}
                </button>
                
            )}
        <table className="w-full text-[15px] text-neutral-400 ">
            <tr className="font-bold text-neutral-100">
                <td></td>
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
            {!status || isLoading ? (
                
                array.map((item:any)=>{
                        return (
                            <tr key={item} className="my-2">
                                <td className="w-6 h-6">
                                    <Skeleton className="h-4 w-4" />
                                </td>
                                <td className="w-40 flex items-center justify-start gap-1 py-2" >
                                    <Skeleton className="h-4 w-[140px]" />
                                </td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[50px]" /></td>
                                <td><Skeleton className="h-4 w-[70px]" /></td>
                                <td>
                                    <div className="flex items-center justify-center">
                                        <Skeleton className="h-4 w-[50px]" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center justify-end gap-2">
                                        <Skeleton className="h-6 w-[70px]" />
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                ):(updateData && updateData.map((item:any)=>{
                    return (<ItemProduct
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
                        check={checkId && checkId.includes(item.id)}
                        handleOtherCheck = {(id:string)=>handleOtherCheck(id)}
                    />
                    )
                }))}
            {/* {data.map((item:any)=>{
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
                        check={checkId && checkId.includes(item.id)}
                        handleOtherCheck = {(id:string)=>handleOtherCheck(id)}
                    />
                )
            })} */}
    
          
       </table>
         { !isLoading && data && data.length === 0 &&(
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