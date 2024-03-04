
'use client'

import HeaderDetail from "@/components/transactions/header-detail"
import HeaderInfor from "@/components/transactions/header-infor"
import History from "@/components/transactions/history"
import TransactionCategory from "@/components/transactions/transaction-category"
import TransactionDate from "@/components/transactions/transaction-date"
import TransactionDetail from "@/components/transactions/transaction-detail"
import { Product, Transaction, User } from "@prisma/client"
import { useEffect, useState } from "react"

interface TransactionByIdProps {
    transaction: Transaction| any
    product: Product[] | any
    user: User[] | any
}

const TransactionById:React.FC<TransactionByIdProps> = ({
    transaction ,
    product = [],
    user = []
}) =>{
    const [productInfo,setProductInfo] = useState<any>([])
  console.log(product)
  console.log(user)
  useEffect(()=>{
    const result:any[] = [];
    for(let i=0;i<product.length;i++){
        for(let j=0;j<transaction.productId.length;j++){
            if(product[i].id ===transaction.productId[j]){
                result.push(product[i])
            }
        }
    }
    console.log(result)
    setProductInfo(result)
  },[product,transaction])
    return (
        <div className="grid grid-cols-3 gap-2 px-2 ">
            <div className="col-span-2 bg-slate-600 rounded-md flex flex-col gap-4 py-4">
                <HeaderDetail 
                    totalPrice={transaction.totalPrice}
                    status= {transaction.status}
                />
                {/* <div className="px-2">
                    <hr className="bg-neutral-400 "/>
                </div> */}
                <TransactionDate
                    time = {transaction.date}
                />
                <TransactionDetail
                    amount = {transaction.amount}
                    transportation ={transaction.transportation}
                    type = {transaction.type}
                    bank = {transaction.bank}
                    status ={transaction.status}
                    id={transaction.id}
                    idUser={transaction.userId}
                />
                <TransactionCategory 
                    amount={transaction.amount}
                    productId={transaction.productId}
                />
            </div>
            <div className="col-span-1 flex flex-col ">
                <div className="bg-slate-600 rounded-md py-4 flex flex-col gap-4 ">
                    <HeaderInfor
                        name = {transaction.user.name}
                        email = {transaction.user.email}
                        sdt = {transaction.user.phone}
                        image = {transaction.user.image}
                        id = {transaction.user.id}
                    />
                    <History 
                        product={productInfo}
                        history = {user.transaction}
                    />
                </div>
                
            </div>
        </div>
    )
}

export default TransactionById