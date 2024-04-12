
'use client'

import HeaderDetail from "@/components/transactions/header-detail"
import HeaderInfor from "@/components/transactions/header-infor"
import History from "@/components/transactions/history"
import TransactionCategory from "@/components/transactions/transaction-category"
import TransactionDate from "@/components/transactions/transaction-date"
import TransactionDetail from "@/components/transactions/transaction-detail"
import { Product, Transaction, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdCopyAll } from "react-icons/md";
import { toast } from "sonner"

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
    const router = useRouter()

    //handle coppy id

  const handleCoppy =(id:string) =>{
    navigator.clipboard.writeText(id)
    toast.success("coppied to clipboard")
  }
  useEffect(()=>{
    const result:any[] = [];
    for(let i=0;i<product.length;i++){
        for(let j=0;j<transaction.productId.length;j++){
            if(product[i].id ===transaction.productId[j]){
                result.push(product[i])
            }
        }
    }
 
    setProductInfo(result)
  },[product,transaction])
  //handle ctr + z
  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);
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
            <div className="col-span-1 flex flex-col gap-2 ">
                <div className="flex items-center justify-between rounded-md bg-slate-500/60 text-white hover:bg-slate-500/40 hover:text-white px-2">
                    <div 
                        className=" hover:text-white flex items-center justify-start  py-1 text-[15px] text-thin">
                            {transaction.id}
                    </div>
                    <div>
                        <MdCopyAll 
                            onClick={()=>handleCoppy(transaction.id)}
                            className="w-4 h-4 text-white" />
                    </div>
                </div>
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