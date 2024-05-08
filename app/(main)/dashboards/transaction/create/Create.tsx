"use client"

import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Discount, Product, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import { toast } from "sonner"
import { ZodType, z } from "zod"


interface CreateProps {
    product: Product[] | any
    user: User[] | any
    discount: Discount[] | any
}

type dataForm ={
    userId: string,
    productId: string[],
    discountId: string,
    status: string,
    amount: number,
    totalPrice: number,
    transportation: string,
    type: string,
    bank: string
}

const Create:React.FC<CreateProps> = ({
    product = [],
    user = [],
    discount = []
}) =>{

    const router = useRouter()

    const [productItem,setProductItem] = useState<any>([])
    const [userItem,setUserItem] = useState('Add User')
    const [openProduct,setOpenProduct] = useState(false)
    const [openUser,setOpenUser] = useState(false)
    const [openCard,setOpenCard] = useState(false)
    const [amount,setAmount] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [isLoading,setIsLoading] = useState(false)
    const [discountItem,setDiscountItem] = useState("Add Discount")
    const [openDiscount,setOpenDiscount] = useState(false)


  
    const schema : ZodType<dataForm>= z.object({
        userId: z.string(),
        discountId: z.string(),
        productId: z.array(z.string()).nonempty(),
        status: z.string(),
        amount: z.number().gte(1),
        totalPrice: z.number().gte(10000),
        transportation: z.string(),
        type: z.string(),
        bank: z.string()
    })
   

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
            discountId: '',
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
      const disocuntId = watch('discountId')
      const productId = watch('productId')
      const transportation = watch('transportation');
      const status = watch('status')

      const type = watch('type');
      const bank = watch('bank')

 
      const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)
        axios.post('/api/add-new-transaction', data)
                .then((res)=>{
                   // toast.success('Add New Transaction.')
                    router.refresh()
                })
                .catch((err:any)=>{
                    toast.error('Something went wrong!!')
                })
                .finally(()=>{
                    setIsLoading(false)
                })
         // create history
         axios.post('/api/create-new-history',{
            userId,
            title:``,
            type: 'transaction',
        })
        .then((res)=>{
            
            toast.success('add new');
            router.refresh();
        })
        .catch((err:any)=>{
            toast.error("Something went wrong !!!")
        }).
        finally(()=>{
            setIsLoading(false)
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
       
            const arrayId = [...array];
   
            const empty: string[]= [];
            arrayId.forEach((item)=>{
                empty.push(item.id)
            })
            setCustomerValue('productId',empty)
      },[productItem,setCustomerValue])
   

      //handleAdduser 
      const handleAddUser = useCallback((value:any)=>{
        const obj = value.name + ' | ' + value.email
        setUserItem(obj)
        setOpenUser(false)
        setCustomerValue('userId',value.id)
      },[setCustomerValue])


        //handle add disocunt
    const handleAddDiscount = useCallback((value:any)=>{
        const obj = value.title
        setDiscountItem(obj)
        setOpenDiscount(false)
        setCustomerValue('discountId',value.id)
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
                                        openProduct ? 'block z-20' : "hidden"
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
               {/* discount */}
               <div
               
                    className="relative "
                >

                    <div className="text-[14px] text-neutral-100 ">Add Discount</div>
                    <div
                        onClick={()=>setOpenDiscount(!openDiscount)}
                        className="px-2 py-1 rounded-md w-full bg-slate-500/60 text-neutral-200 text-[15px]"
                     >{discountItem}</div>
                    <div
                        className={cn("absolute top-14 left-0 bg-slate-600 rounded-md w-full text-neutral-300 text-[14px] z-20 h-auto max-h-44 overflow-y-auto",
                                openDiscount ? 'block' : "hidden"
                                    )}
                    >
                        {discount.map((item:any)=>{
                            return <div
                                        key={item.id}
                                        onClick={()=>handleAddDiscount(item)}
                                    >
                                        {item.title} 
                                    </div>
                        })}
                    </div>
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
               <input 
                type="submit" 
                value="Add Transaction" 
                disabled ={isLoading}
                className={cn("flex items-center justify-center py-1 bg-slate-500/40 rounded-md w-full text-[14px] text-neutral-100",
                    isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                )}
                />
            </form>
        </div>
    )
}

export default Create 