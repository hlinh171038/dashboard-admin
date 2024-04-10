"use client"

import { cn } from "@/lib/utils"
import { Product, Transaction } from "@prisma/client";
import { useCallback, useEffect, useState } from "react"
import { any } from "zod";
import ItemHostestProduct from "./item-hotest-product";

interface HotestProductProps {
    thisWeek:any;
    lastWeek:any;
    product: Product[] | any;
    transaction: Transaction[] | any;
}

const HotestProduct:React.FC<HotestProductProps> = ({
    thisWeek,
    lastWeek,
    product =[],
    transaction = []
}) =>{

    const [totalTransactionThisWeek,setTotalTransactionThisWeek] = useState<any>([])
    const [totalTransactionLastWeek,setTotalTransactionLastWeek] = useState<any>([])
    const [openBrand,setOpenBrand] = useState(true)
    const [openHot,setOpenHot] = useState(false)
    const [openCurrent,setOpenCurrent] = useState(false)
    const [openAll,setOpenAll] = useState(true)
    const [openLastWeek,setOpenLastWeek] = useState(false)
    const [array,setArray] = useState<any>([])
    // handle open
    const handleOpenBrand = useCallback(()=>{
        setOpenBrand(!openBrand);
        setOpenHot(!openHot);
       
    },[openBrand,openHot])

     // handle open hotest product
     const handleOpenHot = useCallback(()=>{
        setOpenBrand(!openBrand);
        setOpenHot(!openHot);
    },[openBrand,openHot])

    // handle all
    const handleAll = useCallback(()=>{
        setOpenAll(true);
        setOpenCurrent(false);
        setOpenLastWeek(false);
    },[])
    //handle current
    const handleCurrent = useCallback(()=>{
        setOpenAll(false);
        setOpenCurrent(true);
        setOpenLastWeek(false);
    },[])
    //handle last week
    const handleLastWeek = useCallback(()=>{
        setOpenAll(false);
        setOpenCurrent(false);
        setOpenLastWeek(true);
    },[])

   // totalTransaction this Week
   useEffect(()=>{
    const array = [...transaction]
        const result:any[] = []
        array && array.forEach((item:any)=>{
            const day = new Date(item.date);
            if(day >=thisWeek[0] && day <= thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
   
        setTotalTransactionThisWeek(result);
   },[transaction,thisWeek])
   // totalTransaction last week
   useEffect(()=>{
    const array = [...transaction]
    const result:any[] = []
    array && array.forEach((item:any)=>{
        const day = new Date(item.date);
        if(day <=lastWeek[0] && day >= lastWeek[lastWeek.length -1]) {
            result.push(item)
        }
    });
  
    setTotalTransactionLastWeek(result)
},[transaction,lastWeek])

   
    useEffect(()=>{
        const result:any[] =[]
        if(openAll === true && openBrand === true) {
            transaction && transaction.forEach((item:any)=>{
                if(item.productId.length >0) {
                    item.productId.forEach((ele:any)=>{
                        product && product.forEach((it:any)=>{
                            if(ele === it.id) {
                                 // check brand
                            const index = result.findIndex((item:any)=>item.brand === it.brand)
                           
                            if(index ===-1){
                                const obj = {brand:it.brand,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                            }
                        })
                    })
                }
            })
        }
        // brand && lastWeek
        if(openLastWeek === true && openBrand === true) {
            totalTransactionLastWeek && totalTransactionLastWeek.forEach((item:any)=>{
                if( item.productId.length >0) {
                    item.productId.forEach((ele:any)=>{
                        product && product.forEach((it:any)=>{
                            if(ele === it.id) {
                                 // check brand
                            const index = result.findIndex((item:any)=>item.brand === it.brand)
                      
                            if(index ===-1){
                                const obj = {brand:it.brand,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                            }
                        })
                    })
                }
            })
        }
        // brand && current
        if(openCurrent === true && openBrand === true) {
            totalTransactionThisWeek && totalTransactionThisWeek.forEach((item:any)=>{
                if( item.productId.length >0) {
                    item.productId.forEach((ele:any)=>{
                        product && product.forEach((it:any)=>{
                            if(ele === it.id) {
                                 // check brand
                            const index = result.findIndex((item:any)=>item.brand === it.brand)
                     
                            if(index ===-1){
                                const obj = {brand:it.brand,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                            }
                        })
                    })
                }
            })
        }
        // hotest && all
        if(openAll === true && openHot === true) {
            transaction && transaction.forEach((item:any)=>{
                if( item.productId.length >0) {
                    item.productId.forEach((ele:any)=>{
                        product && product.forEach((it:any)=>{
                            if(ele === it.id) {
                                 // check brand
                            const index = result.findIndex((item:any)=>item.id === it.id)
                     
                            if(index ===-1){
                                const obj = {id:it.id,name:it.title,image:it.image,brand2:it.brand,category:it.category,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                            }
                        })
                    })
                }
            })
        }
        // hotest && current
        if(openCurrent === true && openHot === true) {
            totalTransactionThisWeek && totalTransactionThisWeek.forEach((item:any)=>{
                if( item.productId.length >0) {
                    item.productId.forEach((ele:any)=>{
                        product && product.forEach((it:any)=>{
                            if(ele === it.id) {
                                 // check brand
                            const index = result.findIndex((item:any)=>item.id === it.id)
                  
                            if(index ===-1){
                                const obj = {id:it.id,name:it.title,image:it.image,brand2:it.brand,category:it.category,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                            }
                        })
                    })
                }
            })
        }

        // hotest && last week
        if(openLastWeek === true && openHot === true) {
            totalTransactionLastWeek && totalTransactionLastWeek.forEach((item:any)=>{
                if( item.productId.length >0) {
                    item.productId.forEach((ele:any)=>{
                        product && product.forEach((it:any)=>{
                            if(ele === it.id) {
                                 // check brand
                            const index = result.findIndex((item:any)=>item.id === it.id)
                         
                            if(index ===-1){
                                const obj = {id:it.id,name:it.title,image:it.image,brand2:it.brand,category:it.category,count:1}
                                result.push(obj)
                            } else {
                                
                                    result[index].count +=1;
                            }
                            }
                        })
                    })
                }
            })
        }

        //const resultSort = handleSort(result,'count')
       const resultSort =  result && result.sort((a:any,b:any)=>{
            if(a.count >b.count) return -1;
            if(a.count < b.count) return 1;
            return 0;
        })
        setArray(resultSort);
    },[openBrand,openHot,openAll,product,transaction,totalTransactionLastWeek,openLastWeek,openCurrent,totalTransactionThisWeek])
 
    return (
        <div>
            <div className="w-full pb-2 flex items-center justify-between text-neutral-100 text-[14px]">
                <div className="flex items-center justify-start gap-2">
                    <div onClick={handleOpenBrand} 
                         className={cn('cursor-pointer px-2 py-1 transition-all duration-300',
                                        openBrand ? 'bg-[#4FA29E] rounded-md' :'bg-none'
                                    )}  
                    >
                        Top Brand
                    </div>
                    <div 
                        onClick={handleOpenHot}
                        className={cn('cursor-pointer px-2 py-1 transition-all duration-300',
                                        openHot ? 'bg-[#4FA29E] rounded-md' :'bg-none'
                                    )} 
                    >
                        Hotest Product
                    </div>
                </div>
                <div className="flex items-center justify-end gap-1">
                    <div 
                            onClick={handleAll}
                            className={cn('text-[12px] text-neutral-400 cursor-pointer px-1 py-[0.2] pt-[1px] transition-all duration-300 rounded-md border border-slate-600',
                                openAll ? 'border border-[#4FA29E]' :'bg-none'
                            )}
                            > 
                            All 
                    </div>
                   
                    <div 
                        onClick={handleCurrent}
                        className={cn('text-[12px] text-neutral-400 cursor-pointer px-1 py-[0.2] transition-all duration-300 rounded-md border border-slate-600',
                                        openCurrent ? 'border border-[#4FA29E] ' :'bg-none'
                                    )} 
                        >
                            Current
                        </div>
                    <div 
                        onClick={handleLastWeek}
                        className={cn('text-[12px] text-neutral-400 cursor-pointer px-1 py-[0.2] transition-all duration-300 rounded-md border border-slate-600',
                            openLastWeek ? 'border border-[#4FA29E] ' :'bg-none'
                        )}
                        > 
                        Last Week
                        </div>
                 </div>   
            </div>
            <div>
                <table id="trend-sale-table" className="w-full text-start text-[14px] gap-2 ">
                    {openBrand && (
                        <tr className="font-bold text-[15px]">
                            <td className="text-neutral-100 px-2">Brand Name</td>
                            <td className="text-neutral-100 px-2">Quanity</td>
                            <td className="text-neutral-100 px-2">Stock</td>
                        </tr>
                    
                    )}
                    {openHot && (
                        <tr >
                        <td className="text-neutral-100 px-2"> Product</td>
                        <td className="text-neutral-100 px-2"> Category</td>
                        <td className="text-neutral-100 px-2">Quantity</td>
                    </tr>
                    )}
                    {array && openBrand && array.slice(0,8).map((item:any)=>{
                        return <ItemHostestProduct
                                    key={item.id}
                                    brand = {item.brand &&item.brand}
                                    count = {item.count}
                                    name = {item.name && item.name}
                                    image = {item.name && item.image}
                                    brand2 = {item.brand2 && item.brand2}
                                    category = {item.category && item.category}
                                />
                    })}
                    {array && openHot && array.slice(0,5).map((item:any)=>{
                        return <ItemHostestProduct
                                    key={item.id}
                                    brand = {item.brand &&item.brand}
                                    count = {item.count}
                                    name = {item.name && item.name}
                                    image = {item.name && item.image}
                                    brand2 = {item.brand2 && item.brand2}
                                    category = {item.category && item.category}
                                />
                    })}
                </table>
            </div>
        </div>
    )
}

export default HotestProduct