
'use client'

import ChangeStatusTransactioin from "@/components/transactions/change-status-transaction"
import HeaderDetail from "@/components/transactions/header-detail"
import HeaderInfor from "@/components/transactions/header-infor"
import History from "@/components/transactions/history"
import TransactionCategory from "@/components/transactions/transaction-category"
import TransactionDate from "@/components/transactions/transaction-date"
import TransactionDetail from "@/components/transactions/transaction-detail"
import { Product, Transaction, User } from "@prisma/client"
import axios from "axios"
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
    const [customeValue,setCustomerValue] = useState<string>('')
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const [total,setTotal] = useState<number>(0)

    console.log(transaction)

    const transactionStatus = [
        {
            name:'waitting for confirmation'  
        },
        {
            name:'confirmed'  
        },
        {
            name:'transporting'  
        },
        {
            name:'delivered'  
        },
        {
            name:'done'  
        },
        {
            name:'cancel'  
        },
    ]


    // handle Update transformation
    const handleUpdate = (value:string) =>{
        setIsLoading(true)
        console.log(value);
        axios.post('/api/update-transaction',{status: value,id:transaction?.id})
        .then((res:any)=>{
            toast.success('Updated.');
            router.refresh()
        })
        .catch((err:any)=>{
            toast.error('Something went wrong !!!')
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }
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
    return (
        <div className="grid grid-cols-3 gap-2 px-2 ">
            <div className="col-span-2 bg-slate-600 rounded-md flex flex-col gap-4 py-4">
                <HeaderDetail 
                    totalPrice={total}
                    status= {transaction.status}
                />
                {/* <div className="px-2">
                    <hr className="bg-neutral-400 "/>
                </div> */}
                 <div className="flex items-center justify-start px-2 w-full">
                    <ChangeStatusTransactioin data={transactionStatus} id={'status transaction'} handleUpdate ={handleUpdate} setCustomerValue = {setCustomerValue} status = {transaction && transaction?.status} />
                </div>
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
                    product = {product}
                    transaction = {transaction}
                />
            </div>
            <div className="col-span-1 flex flex-col gap-2 ">
                <div className="flex items-center justify-between rounded-md bg-slate-500/60 text-white hover:bg-slate-500/40 hover:text-white px-2">
                    <div 
                        className=" hover:text-white flex items-center justify-start  py-1 text-[14px] text-thin text-neutral-400">
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
                        province = {transaction.user.province}
                        district = {transaction.user.district}
                        commune = {transaction.user.commune}
                        location = {transaction.user.address}
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