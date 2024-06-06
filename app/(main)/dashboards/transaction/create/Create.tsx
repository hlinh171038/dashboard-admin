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
    image: string[],
    transportation: string,
    type: string,
    bank: string,
    title: string[],
     price: number[],
     quantity: number[],
    size:string[],
    color: string[],
    totalPrice: number,
    //totalDefaultPrice: number,
    amount: number
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
    // product
    const [openCustome,setOpenCustome] = useState(false)
    const [size,setSize] = useState<any>([]);
    const [color,setColor] = useState<any>([]);
    const [chooseId,setChooseId] = useState('');
    const [chooseSize,setChooseSize] = useState('');
    const [chooseColor,setChooseColor] = useState('');
    const [chooseTitle,setChooseTitle] = useState('');
    const [chooseImage,setChooseImage] = useState('');
    const [choosePrice,setChoosePrice] = useState(0);
    const [chooseDefaultPrice,setChooseDefaultPrice] = useState(0);
    const [defaultPrice,setDefaultPrice] = useState(0)
    const [chooseQuantity,setChooseQuantity] = useState(0);

    //total product
    const [totalProduct,setTotalProduct] = useState<any>([]);


  
    const schema : ZodType<dataForm>= z.object({
        userId: z.string(),
        discountId: z.string(),
        productId: z.array(z.string()).nonempty(),
        status: z.string(),
        image: z.array(z.string()).nonempty(),
        title: z.array(z.string()).nonempty(),
        size: z.array(z.string()).nonempty(),
        color: z.array(z.string()).nonempty(),
         quantity: z.array(z.coerce.number()),
         price: z.array(z.coerce.number()),
        transportation: z.string(),
        type: z.string(),
        bank: z.string(),
        totalPrice: z.coerce.number(),
        //totalDefaultPrice: z.coerce.number(),
        amount: z.coerce.number()
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
            status: 'watting for confirmation', 
            amount: 0,
            totalPrice: 0,
            //toalDefaultPrice: 0,
            transportation: '',
            type: '',
            bank: '',
            image: [],
            title: [],
            size: [],
            color: [],
            price: [],
            //defaultPrice: [],
            quantity: []
        }
      })
      const userId = watch('userId')
      const disocuntId = watch('discountId')
      const productId = watch('productId')
      const transportation = watch('transportation');
      const status = watch('status')

      const type = watch('type');
      const bank = watch('bank')
      const size1 = watch('size')
      const color1 = watch('color')
      const title = watch('title')
      const price = watch('price')
      //const defaultPrice = watch('defaultPrice')
      const quantity = watch('quantity')
      const image = watch('image')
      const totalPrice1 = watch('totalPrice')
      const amount1 = watch('amount');
      console.log(size1);
      console.log(color1);
      console.log(productId)
      console.log(price)
      console.log(quantity)
      console.log(totalPrice1)
      console.log(amount1)
     

 
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
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

  

    //total price
    useEffect(()=>{
        console.log(quantity)
        console.log(price)
        let count = 0;
       price && price.forEach((item:any,index:number) => {
            count += item * quantity[index];
        })
        console.log(count)//3745000
         setCustomerValue('totalPrice',count)
    },[price,quantity,setCustomerValue])

     //total default price
     useEffect(()=>{
        console.log(quantity)
        console.log(price)
        let count = 0;
       price && price.forEach((item:any,index:number) => {
            count += item * quantity[index];
        })
        console.log(count) //3745000
         setCustomerValue('totalPrice',count)
    },[price,quantity,setCustomerValue])

    //card trigger
    useEffect(()=>{
        if(transportation === 'E-wallet' || transportation === 'Payment' || transportation === 'Card'){
            setOpenCard(true)
            setCustomerValue('type','')
            setCustomerValue('bank','')
        } else {
            setOpenCard(false)

        }
    },[transportation,setCustomerValue])

    // product

    const handleOpenCustome = (item:any) =>{
        console.log(item)
     
        console.log(item)
        console.log(item?.size)
        setSize(item?.size)
        setColor(item?.color)
        setOpenCustome(true)
        setChooseSize('')
        setChooseColor('')
        setChooseId(item?.id)
        setChooseDefaultPrice(item?.defaultPrice)
        setChoosePrice(item?.salePrice);
        setChooseImage(item?.image);
        setChooseTitle(item?.title)
        setChooseQuantity(0)
    }
    // handle choose size
    const handleChooseSize =  (item:string) =>{
        setChooseSize(item);
        //setCustomerValue('size',array)
    }
      // handle choose color
      const handleChooseColor =  (item:string) =>{
        setChooseColor(item);
        //setCustomerValue('size',array)
    }
 console.log(chooseSize)
 console.log(chooseColor)

 //handle add new
 const handleAddNew = () =>{
    if(chooseColor === '' || chooseColor === '') {
        toast.warning('choose size and color');
        return;
    }
    const array1 = [...productId,chooseId]
    const array2 = [...color1,chooseColor]
    const array3 = [...size1,chooseSize]
    const array4 = [...title,chooseTitle]
    const array5 = [...price,choosePrice]
    const array6 = [...quantity,chooseQuantity]
    const array7 = [...image,chooseImage]
    
    //const array8 = [...amount,chooseDefaultPrice]
    setCustomerValue('productId',array1)
    setCustomerValue('color',array2)
    setCustomerValue('size',array3)
    setCustomerValue('title',array4)
    setCustomerValue('price',array5)
    setCustomerValue('quantity',array6)
    setCustomerValue('image',array7)
    //setCustomerValue('defaultPrice',array8)
    console.log(chooseDefaultPrice)
    console.log(chooseQuantity)
    setDefaultPrice(defaultPrice + (chooseDefaultPrice * chooseQuantity));
    let re = defaultPrice + (chooseDefaultPrice * chooseQuantity)
    setCustomerValue('amount', re)
 
    setChooseColor('');
    setChooseSize('');
    setChooseId('');
    setChooseTitle('');
    setChoosePrice(0);
    setChooseQuantity(0)
    setChooseImage('')
    setChooseDefaultPrice(0)

    const total = [...totalProduct]

    const obj = {
        id:chooseId,
        image:chooseImage,
        title:chooseTitle,
        color:chooseColor,
        size:chooseSize,
        quantity:chooseQuantity,
        price:choosePrice
    }
    const result = total.push(obj)
    console.log(result)
    setTotalProduct(total)
 }
    const transactions = [
        {
            id:1,
            title:'1. Payment (Online Payment, Cash on Delivery, Installment)',
            value: 'Payment'
        },
        {
            id:2,
            title:'2. E-wallet (MoMo Wallet, ZaloPay Wallet)',
            value: "E-wallet"
        },
        {
            id:3,
            title:'3. Credit/Debit Card',
            value: "Card"
        },
        {
            id:4,
            title:'4. Cash on Delivery (COD)',
            value: 'COD'
        }
    ]
   
    console.log(totalProduct)
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
                                        // onClick={()=>handleAddProduct(item)}
                                        onClick={()=>handleOpenCustome(item)}
                                        className="cursor-pointer"
                                    >
                                        {item.title}
                                    </div>
                        })}
                    </div>
                </div>
                {/* size and color */}
                <div>
                    {/* size */}
                    <div>
                        {size.length >0 ?(
                            size.map((item:any)=>{
                                return <div key={item} onClick={()=>handleChooseSize(item)}>{item}</div>
                            })
                        ) : 'loading'}
                    </div>
                     {/* color */}
                     <div>
                        {color.length >0 ?(
                            color.map((item:any)=>{
                                return <div key={item} onClick={()=>handleChooseColor(item)}>{item}</div>
                            })
                        ) : 'loading'}
                    </div>
                    <input type="number" name="quantity" value={chooseQuantity} onChange={(e:any)=>setChooseQuantity(e.target.value)}/>
                </div>
                {/* add product */}
                {chooseColor !=='' && chooseSize !=='' && chooseQuantity > 0  && (
                    <div onClick={handleAddNew}>Add + </div>
                )}

                {/* total product */}
                <div>
                    {totalProduct && totalProduct.length > 0 && (
                        totalProduct.map((item:any)=>{
                            return (
                                <div key={item?.id}>
                                    {item?.title}
                                </div>
                            )
                        })
                    )}
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
                        {discount&& discount.filter((item:any)=> new Date(item?.endDate) > new Date()).map((item:any)=>{
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
               {/* <div>
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
               </div> */}
               {/* transportation */}
               <div>
                <div className="text-[14px] text-neutral-100">Transportation</div>
                 { transactions && transactions.map((item:any)=>{
                    return <label key={item?.id} className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
                                <input 
                                type="radio" 
                                {...register("transportation")}
                                value={item?.value}
                                className="text-neutral-200 text-[14px]"
                                />
                                {item?.title}
                            </label>
                 })}
                    {/* <label className="flex items-center justify-start gap-2 text-neutral-200 text-[14px]">
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
                    </label> */}
                
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