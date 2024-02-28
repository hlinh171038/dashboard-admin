"use client"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Product, User } from "@prisma/client"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { ZodType, z } from "zod"


interface CreateProps {
    product: Product[] | any
    user: User[] | any
}

type dataForm ={
    userId: string,
    productId: string[],
    status: string,
    amount: number,
    totalPrice: number,
    transportation: string,
    type: string,
    bank: string
}

const Create:React.FC<CreateProps> = ({
    product = [],
    user = []
}) =>{

    const [productItem,setProductItem] = useState<any>([])
    const [userItem,setUserItem] = useState('Add User')
    const [openProduct,setOpenProduct] = useState(false)
    const [openUser,setOpenUser] = useState(false)
    const [openCard,setOpenCard] = useState(false)
    const [amount,setAmount] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)

    const schema : ZodType<dataForm>= z.object({
        userId: z.string(),
        productId: z.array(z.string()).nonempty(),
        status: z.string(),
        amount: z.number().gte(1),
        totalPrice: z.number().gte(10000),
        transportation: z.string(),
        type: z.string(),
        bank: z.string()
    })
   
console.log(product)
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            userId:'',
            productId: [],
            status: 'cancel', // cancel,pending,done
            amount: 0,
            totalPrice: 0,
            transportation: '',
            type: '',
            bank: ''
        }
      })
      const userId = watch('userId')
      const productId = watch('productId')
      const transportation = watch('transportation');
      const status = watch('status')

      const type = watch('type');
      const bank = watch('bank')

      console.log(productId)
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
        axios.post('/api/add-new-transaction', data)
                .then((res)=>{
                    console.log(res.data)
                })
                .catch((err:any)=>{
                    console.log(err)
                })
      }

      const setCustomerValue = useCallback((id:string, value:any) => {
        setValue(id,value,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
      },[setValue])
      //handle add product
      const handleAddProduct = useCallback((value:any)=>{
            
            let array = productItem;
            const checkExist = array.findIndex((item:any) => item.id === value.id)

            if(checkExist === -1) {
                const result = [...array,{...value,count:1}]
                array = result;
                setProductItem(result)
            } else {
                let result = array[checkExist].count ++;
                if(array[checkExist].stock <= result) {
                     result = array[checkExist].count --;
                     return ;
                }
                setProductItem(array)
                setOpenProduct(false)
            }
            console.log(array)
            const arrayId = [...array];
            console.log(arrayId)
            const empty: string[]= [];
            arrayId.forEach((item)=>{
                empty.push(item.id)
            })
            setCustomerValue('productId',empty)
      },[productItem,setCustomerValue])
      console.log(productItem)
      //handleAdduser 
      const handleAddUser = useCallback((value:any)=>{
        const obj = value.name + ' | ' + value.email
        setUserItem(obj)
        setOpenUser(false)
        setCustomerValue('userId',value.id)
      },[setCustomerValue])
      // amount
      useEffect(()=>{
        const initialValue = 0;
        const sumWithInitial = productItem.reduce(
        (accumulator:number, currentValue:any) => accumulator + currentValue.count,
        initialValue,
        );
        setAmount(sumWithInitial)
        setCustomerValue('amount',sumWithInitial)
    },[productItem,setCustomerValue])

    //total price
    useEffect(()=>{
        const total = productItem.reduce(
            (accumulator:number,currentValue:any) => accumulator + currentValue.salePrice,
            0
        )
        setTotalPrice(total)
        setCustomerValue('totalPrice',total)
    },[productItem,setCustomerValue])
    //card trigger
    useEffect(()=>{
        if(transportation === 'card'){
            setOpenCard(true)
            setCustomerValue('type','')
            setCustomerValue('bank','')
        } else {
            setOpenCard(false)

        }
    },[transportation,setCustomerValue])
console.log(user)
    return (
        <div className="bg-slate-600 rounded-md px-2 py-4">
            <form  

                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
            >
                {/* userId */}
                
                <div
               
                    className="relative "
                >

                    <div className="text-[14px] text-neutral-100 ">Add user</div>
                    <div
                        onClick={()=>setOpenUser(!openUser)}
                        className="px-2 py-1 rounded-md w-full bg-slate-500/60 text-neutral-200 text-[15px]"
                     >{userItem}</div>
                    <div
                        className={cn("absolute top-14 left-0 bg-slate-600 rounded-md w-full text-neutral-300 text-[14px] z-20 h-auto max-h-44 overflow-y-auto",
                                openUser ? 'block' : "hidden"
                                    )}
                    >
                        {user.map((item:any)=>{
                            return <div
                                        key={item.id}
                                        onClick={()=>handleAddUser(item)}
                                        
                                    >
                                        {item.name+ ' | '+ item.email} 
                                    </div>
                        })}
                    </div>
                </div>
                
               {/* add product */}
                <div
               
                    className="relative "
                >
                    <div className="text-[14px] text-neutral-100 ">Add Product</div>

                    <div
                        onClick={()=>setOpenProduct(!openProduct)}
                        className="px-2 py-1 rounded-md w-full bg-slate-500/60 text-neutral-200 text-[15px]"
                     >add product</div>
                    <div
                        className={cn("absolute top-14 left-0 bg-slate-600 rounded-md w-full text-neutral-300 text-[14px] h-auto max-h-44 overflow-y-auto" ,
                                        openProduct ? 'block' : "hidden"
                                    )}
                    >
                        {product.map((item:any)=>{
                            return <div
                                        key={item.id}
                                        onClick={()=>handleAddProduct(item)}
                                        className="cursor-pointer"
                                    >
                                        {item.title}
                                    </div>
                        })}
                    </div>
                </div>
               <div className={cn("bg-slate-500/60 rounded-md w-full  overflow-hidden px-2",
                                    
                                !openProduct && productItem.length>0 ? 'block min-h-9 h-auto px-2 py-1 mt-2' : 'h-0 hidden'
                                )}>
                    {productItem.map((item:any)=>{
                        return (
                            <div 
                                key={item.id}
                                className="flex items-center justify-between text-neutral-200 text-[14px] cursor-pointer"
                            >
                                    <div>{item.title}</div>
                                    <div>{item.count}</div>
                            </div>
                        )
                    },[])}
               </div>
               {/* status */}
               <div>
                    <div className="text-[14px] text-neutral-100">Status</div>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            {...register("status")}
                            value="cancel"
                            type="radio" 
                            className="text-neutral-200 text-[14px]"
                         />
                        Cancel
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("status")}
                            value="pending"
                            className="text-neutral-200 text-[14px]"
                         />
                        Pending
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("status")}
                            value="done"
                            className="text-neutral-200 text-[14px]"
                         />
                        Done
                    </label>
               </div>
               {/* transportation */}
               <div>
                <div className="text-[14px] text-neutral-100">Transportation</div>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                        type="radio" 
                        {...register("transportation")}
                        value="payment"
                        className="text-neutral-200 text-[14px]"
                        />
                        payment when recive product
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                        type="radio" 
                        {...register("transportation")}
                        value='card'
                        className="text-neutral-200 text-[14px]"
                        />
                        payment by card
                    </label>
                
               </div>
               {/*  */}
               <div className={cn("",
                                openCard ? 'block' : 'hidden'
                            )}>
                    {/* card type */}
               <div className="flex flex-col gap-2">
                    <div className="text-[14px] text-neutral-100 ">Card Type</div>
                    <div className="grid grid-cols-4">
                        <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                    <input 
                        type="radio" 
                        {...register("type")}
                        value="meastro"
                        className="text-neutral-200 text-[14px]"
                        />
                        Meastro
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                    <input 
                        type="radio" 
                        {...register("type")}
                        value="solo"
                        className="text-neutral-200 text-[14px]"
                        />
                        Solo
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                    <input 
                        type="radio" 
                        {...register("type")}
                        value="express"
                        className="text-neutral-200 text-[14px]"
                        />
                        Express
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                    <input 
                        type="radio" 
                        {...register("type")}
                        value="discover"
                        className="text-neutral-200 text-[14px]"
                        />
                        Discover
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                    <input 
                        type="radio" 
                        {...register("type")}
                        value="masterCard"
                        className="text-neutral-200 text-[14px]"
                        />
                        MasterCard
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                    <input 
                        type="radio" 
                        {...register("type")}
                        value="visa"
                        className="text-neutral-200 text-[14px]"
                        />
                        Visa
                    </label>
                    </div>
               </div>
               {/* bank */}
                <div>
                    <div className="text-[14px] text-neutral-100">Payment</div>
                    <div className="grid grid-cols-4">
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="TPbank"
                            className="text-neutral-200 text-[14px]"
                            />
                            Tp bank
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="Oceanbank"
                            className="text-neutral-200 text-[14px]"
                            />
                            Oceanbank
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="VPBank"
                            className="text-neutral-200 text-[14px]"
                            />
                            VPBank
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="BIDV"
                            className="text-neutral-200 text-[14px]"
                            />
                            BIDV
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="VietinBank"
                            className="text-neutral-200 text-[14px]"
                            />
                            VietinBank
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="MBBank"
                            className="text-neutral-200 text-[14px]"
                            />
                            MBBank
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="ACB"
                            className="text-neutral-200 text-[14px]"
                            />
                            ACB
                    </label>
                    <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                        <input 
                            type="radio" 
                            {...register("bank")}
                            value="Techcombank"
                            className="text-neutral-200 text-[14px]"
                                />
                                Techcombank
                        </label>
                        <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                            <input 
                                type="radio" 
                                {...register("bank")}
                                value="Sacombank"
                                className="text-neutral-200 text-[14px]"
                                />
                                Sacombank
                        </label>
                        <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                            <input 
                                type="radio" 
                                {...register("bank")}
                                value="NamABank"
                                className="text-neutral-200 text-[14px]"
                                />
                                Nam A Bank
                        </label>
                    </div>
                </div>
               </div>
               {/* amount */}
               <div className="flex items-center justify-start gap-2 text-[14px] text-neutral-100">
                    <div>Amount</div>
                    <div>{amount}</div>
               </div>
               <div className="flex items-center justify-start gap-2 text-[14px] text-neutral-100">
                    <div>Total Price</div>
                    <div>{totalPrice}</div>
               </div>
               <input type="submit" value="Add Transaction" className="flex items-center justify-center py-1 bg-slate-500/40 rounded-md w-full text-[14px] text-neutral-100"/>
            </form>
        </div>
    )
}

export default Create 