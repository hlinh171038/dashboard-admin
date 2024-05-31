"use client"

import { Product, Transaction } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TransactionCategoryProps {
    amount: number;
    productId: string[];
    product: Product[] | any;
    transaction: Transaction[] | any;
}

const TransactionCategory:React.FC<TransactionCategoryProps> = ({
    amount,
    productId = [],
    product= [],
    transaction = []
}) =>{
    const router = useRouter()
    const [itemProduct,setItemProduct] = useState<any>([])
    const [total,setTotal] = useState<number>(0)
    const [totalQuantity,setTotalQuantity] = useState<number>(0)
    useEffect(()=>{
        const result:any[] = []
        product && product.forEach((item:any)=>{
            console.log(item)
            productId && productId.forEach((it:any)=>{
                if(item?.id === it) {
                    console.log('try');
                    result.push(item)
                }
            })
        });
        console.log(result);
        setItemProduct(result)
    },[])

    useEffect(()=>{
        const priceArr = [...transaction?.price];
        const quantityArr = [...transaction?.quantity];
        let result = 0;
        priceArr.forEach((item:any,index:number)=>{
            result +=(item * quantityArr[index])
        });
        console.log(result);
        setTotal(result)
    },[transaction])

    useEffect(()=>{
        const quantityArr = [...transaction?.quantity];
        let result = 0;
        quantityArr.forEach((item:any)=>{
            result +=item
        });
        console.log(result);
        setTotalQuantity(result)
    },[transaction?.quantity])
    return (
        <div className="text-neutral-200 text-[14px] px-2">
            <div className="text-[16px] capitalize  mt-2">Product Information</div>
            <hr/>
            
            <div className=" mt-2 ">
                    
                    <table className=" text-neutral-400 text-thin text-[14px] w-full ">
                        <tr className="text-neutral-100 text-[15px]">
                            <td>Name</td>
                            <td>Price</td>
                            <td className="text-center">Quantity</td>
                            <td className="pl-8">Total</td>
                        </tr>
                       
                        {transaction?.productId?.map((item:any,index:number)=>{
                        return <tr 
                                    key={item}
                                    className=" cursor-pointer border-b border-neutral-400 "
                                    onClick={()=>router.push(`/dashboards/product/${item}`)}
                                    
                                >   
                                    <td>
                                        <div className="flex items-center justify-start gap-2 py-0.5">
                                            <Image 
                                                src={transaction?.image[index]}
                                                width={55}
                                                height={55}
                                                alt="porduct  "
                                                className="aspect-square object-cover"
                                            />
                                            <div className="">
                                                <div className="text-neutral-100 capitalize ">{transaction?.title[index]}</div>
                                                <div className="flex items-center justify-start gap-0.5">
                                                    <div>Size:</div>
                                                    <div>{transaction?.size[index]}</div>
                                                </div>
                                                <div className="flex items-center justify-start gap-0.5">
                                                    <div>Color:</div>
                                                    <div>{transaction?.color[index]}</div>
                                                </div>
                                               
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    {transaction?.price[index].toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                                    </td>
                                    <td className="text-center">{transaction?.quantity[index] >0 && transaction?.quantity[index]<10 ?`0${transaction?.quantity[index]}` : transaction?.quantity[index]}</td>
                                    <td  className="pl-8">{(transaction?.price[index] * transaction?.quantity[index]).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                                </tr>
                              
                    })}
                            <tr>
                                <td></td>
                                <td className="text-[15px] text-neutral-100 text-semibold">Overall :</td>
                                <td className="text-[15px] text-neutral-100 text-semibold text-center">{totalQuantity >0 && totalQuantity < 10 ?`0${totalQuantity}`: totalQuantity }</td>
                                <td className="text-[15px] text-neutral-100 text-semibold pl-8">{total.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</td>
                            </tr>
                    </table>
                </div>
           
        </div>
    )
}

export default TransactionCategory