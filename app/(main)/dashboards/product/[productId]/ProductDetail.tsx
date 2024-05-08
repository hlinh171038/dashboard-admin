'use client'

import InputCustomerId from "@/components/customers/input"
import UploadImage from "@/components/customers/upload-img"
import InputNumber from "@/components/products/Input-number"
import CategoryRadio from "@/components/products/category-radio"
import CategoryRadioUnit from "@/components/products/category-radio-unit"
import Transaction from "@/components/products/category-transaction"
import Checkbox from "@/components/products/checkbox"
import CheckboxPerson from "@/components/products/checkbox-person"
import CheckboxSize from "@/components/products/checkbox-size"
import InputPrice from "@/components/products/input-price"
import QuestionNotified from "@/components/question-notified"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Discount, Product, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { FaPlus } from "react-icons/fa"
import { ZodType, z } from "zod"
import { colorArr } from "../add/AddProduct"
import { sizeArr } from "../add/AddProduct"
import { personArr } from "../add/AddProduct"
import { toast } from "sonner"
import { RxCross2 } from "react-icons/rx"
import DiscountSearch from "@/components/products/discount-search"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { truncate } from "fs"

type formData = {
    productId: string,
    discountId:string[],
    title: string,
    brand: string,
    stock: number,
    weight: number,
    location: string,
    description: string,
    defaultPrice: number,
    //margin: number,
    tax: number,
    transaction: string[],
    salePrice: number,
    color: string[],
    size: string[],
    person: string[],
    tag: string[],
    image: string,
    category: string,
    unit: string
  }

interface ProductDetailProps {
    product: Product[] | undefined | any;
    discount: Discount[] | any;
    currentUser: any;
    users: User[] | any;
}


const ProductDetail:React.FC<ProductDetailProps> = ({
    product,
    discount,
    currentUser,
    users = []
}) =>{
    const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [exercute,setExercute] = useState(true)
  //const [userId,setUserId] = useState(user?.id )
  const [cate,setCate] = useState('')


  const schema: ZodType<formData> = z.object({
    productId: z.string(),
    discountId: z.array(z.string()).nonempty(),
      title: z.string().min(3).max(20),
      brand: z.string().min(3).max(50),
      stock: z.coerce.number().lte(10000).gte(1),
      weight: z.coerce.number().lte(100).gte(0),
      location: z.string().min(3).max(200),
      description: z.string().min(3).max(200),
      defaultPrice: z.coerce.number().lte(100000000).gte(1),
      //margin: z.coerce.number().lte(100).gte(1),
      tax: z.coerce.number().lte(100).gte(1),
      transaction: z.array(z.string()).nonempty(),
      salePrice: z.coerce.number().lte(100000000).gte(1),
      color: z.array(z.string()).nonempty(),
      size: z.array(z.string()).nonempty(),
      person: z.array(z.string()).nonempty(),
      tag: z.array(z.string()).nonempty(),
      image: z.string(),
      category: z.string(),
      unit: z.string()
  })

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver:zodResolver(schema),
        defaultValues: {
          productId: product.id ,
          discountId: product.discountId,
          title: product.title,
          brand: product.brand,
          image: product.image,
          weight: product.weight ,
          location: product.location,
          description: product.description,
          stock: product.stock,
          category: product.category,
          tag: product.tag,
          unit: product.unit,
          transaction: product.transportation,
          defaultPrice: product.defaultPrice,
          //margin: product.margin,
          tax: product.tax,
          salePrice: product.salePrice,
          color: product.color,
          size: product.size,
          person: product.designFor
        }
      })

      const image = watch('image')
      const title = watch('title')
      const category = watch('category')
      const tag = watch('tag')
      const transaction = watch('transaction')
      const unit = watch('unit')
      const defaultPrice = watch('defaultPrice')
      const margin = watch('margin')
      const salePrice = watch('salePrice')
      const color = watch('color')
      const size = watch('size')
      const person = watch('person')
      const stock = watch('stock')
      const userId = watch('userId')
      const discountId = watch('discountId')

      console.log(transaction)

   
      const onSubmit: SubmitHandler<FieldValues> = (data) => {  
        if(!exercute) {
          setIsLoading(true)
          axios.post('/api/update-product',data)
                .then((res)=>{
                  toast.success('Product is updated.')
                  router.push('/dashboards/product')
                  router.refresh()
                })
                .catch((err:any)=>{
                  toast.error('Something went wrong')
                })
                .finally(()=>{
                  setIsLoading(false)
                })
        }
       
      }

      const setCustomerValue = useCallback((id:string, value:any) => {
        setValue(id,value,{
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      },[setValue])

      const handleAdd = (item:string) =>{
        if(item === ''){
          return;
        }
        const exist = tag.find((it:string)=>it ===item);
        if(exist){
          toast.warning(`Tag ${item} is existed.`)
          setCate('')
          return
        }
        tag.push(item)
      
        setCustomerValue('tag',tag)
        setCate('')
      }

      //handle add transaction
      const handleAddTransaction = (transaction:any,value:string) =>{
          
          const index = transaction.find((val:string)=>val === value)
 
          if(index) {
            const newTra = transaction.splice(index,1)
            setCustomerValue('transaction',transaction);
            return
          }
          transaction.push(value)
          setCustomerValue('transaction',transaction)
      }


   
      const handleCheckbox = (check:any,value:any) =>{
       
       
        const index = check.findIndex((val:string)=>val === value)

        if(index!== -1){
          const deleteColor = check.splice(index,1);
         setCustomerValue('color',check);
         return;
        }
       check.push(value)
        setCustomerValue('color',check);
       
      }
      //handleCheckSize
      const handleCheckSize = (check:any,value:any)=>{
        const index = check.findIndex((val:string)=>val === value)
        if(index !== -1){
           check.splice(index,1);
         setCustomerValue('size',check);
         return;
        }
       check.push(value)
        setCustomerValue('size',check);
       
      }
      //handle check person
      const handleCheckPerson = (check:any,value:any)=>{
        const index = check.findIndex((val:string)=>val === value)
        if(index !== -1){
           check.splice(index,1);
         setCustomerValue('person',check);
         return;
        }
       check.push(value)
        setCustomerValue('person',check);
       

      }
      //handle addd discount id
      const handleAddDiscountId = useCallback((value:string)=>{

        const result = [...discountId,value]

        setCustomerValue('discountId',result)
      },[discountId,setCustomerValue])

      //handle delete discount
      const handleDeleteDiscount = useCallback((id:string)=>{
     
        const array = [...discountId]
    
        const result = array.filter((item) =>item !== id);
   
        setCustomerValue('discountId',result)
      },[discountId,setCustomerValue])

       // handle delete tag
       const handleDeleteTagItem = useCallback((id:string)=>{
        if(!exercute) {

          const result = [...tag];
     
          const re = result.filter((item:any)=> item !== id)
    
          setCustomerValue('tag',re)
        }
      },[setCustomerValue,tag,exercute])

  

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
    const result = users && users.find((item:any)=>item.email === currentUser.user.email);
    if(!result) {
      toast.warning("login !!!");
    }
    if(result && result.role === 'yes' && result.permission !== 'read') {
      setExercute(false)
    }
},[currentUser,users])
    return (
        
        <div className="flex flex-col justify-start items-start gap-2 w-full px-2">
          <div className="grid grid-cols-3 w-full rounded-md  gap-2 ">
           <div className="col-span-1  w-full h-auto rounded-md  flex flex-col gap-2">
                  <div className="flex items-center justify-between text-neutral-100 text-[15px] ">
                    <div>Add new image for your product.</div>
                      <QuestionNotified 
                      title="image"
                      content="1. Add product's image from your computer."
                      content2="2. Add product's image from internet."
                      content3="3. Add product's image from camara."
                    />
                  </div>
                  <UploadImage 
                      value={image}
                      onChange={(value)=>setCustomerValue("image",value)}
                      
                  />
            </div>
            <div className="col-span-2 bg-slate-600 rounded-md p-2">
              {exercute && <div className="text-red-600 text-[14px] text-end">Only update product with exercute permission</div> }
              
                <div className="relative">
                  <InputCustomerId 
                    id="title"
                    title="Product Name"
                    register={register}
                    placeholder="product name"
                    type="text"
                    errors={errors}
                    disabled ={exercute}
                  />
                  {errors.title && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.title.message as string}</span>}
                </div>

                <div className="grid grid-cols-2 w-full gap-2 ">
                  <div className="col-span-1 relative">
                      <InputCustomerId
                        id="brand"
                        title="Brand"
                        register={register}
                        placeholder="brand"
                        type="text"
                        errors={errors}
                        disabled ={exercute}
                    />
                    {errors.brand && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.brand.message as string}</span>}
                  </div>
                  <CategoryRadio 
                    id="category"
                    register={register}
                    errors={errors}
                    category={category}
                    exercute = {exercute}
                  />
                 

                </div>
                 {/* stock */}
                 <div className="grid grid-cols-2 w-full gap-2 ">
                    <div className="col-span-1 relative">
                      <InputNumber 
                        id="stock"
                        title="Stock"
                        register={register}
                        placeholder="manager stock"
                        type="number"
                        errors={errors}
                        unit="#"
                        exercute ={exercute}
                      />
                      {errors.stock && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.stock.message as string}</span>}
                    </div>
                    <div className=" relative col-span-1">
                      <InputNumber 
                          id="weight"
                          title="Weight"
                          register={register}
                          placeholder="product weight"
                          type="number"
                          errors={errors}
                          unit="kg"
                          exercute ={exercute}
                        />
                         {errors.weight && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.weight.message as string}</span>}
                    </div>
                 </div>
                 {/* location + description */}
                 <div className="grid grid-cols-2 w-full gap-2 ">

                    <div className="col-span-1 relative h-full">
                      <div className="h-full">
                              <div className="flex flex-col items-start justify-start  relative h-full">
                                  <label htmlFor="address" className="text-neutral-200 text-[15px] ">Location</label>
                                  <textarea
                                      disabled ={exercute}
                                      {...register("location")} 
                                      className="
                                      outline-none 
                                      bg-slate-500/60 
                                      border-0 
                                       
                                      focus:border-0 
                                      h-[75px]
                                      mb-4
                                      text-neutral-200
                                      focus:outline-none
                                      w-full
                                      rounded-md
                                      px-2 
                                      py-1
                                      text-[14px]
                                      " 

                                      placeholder="Bussiness's location"
                                  />
                              </div>
                             
                          </div>
                          {errors.location && <span className="absolute top-[85%] left-0 text-[13px] text-red-600">{errors.location.message as string}</span>}
                    </div>
                    <div className="col-span-1 relative">
                    <div className="">
                              <div className="flex flex-col items-start justify-start  relative ">
                                  <label htmlFor="address" className="text-neutral-200 text-[15px] ">Description</label>
                                  <textarea
                                      disabled ={exercute}
                                      {...register("description")} 
                                      className="
                                      outline-none 
                                      bg-slate-500/60 
                                      border-0 
                                       
                                      focus:border-0 
                                      h-[75px]
                                      mb-4
                                      text-neutral-200
                                      focus:outline-none
                                      w-full
                                      rounded-md
                                      px-2 
                                      py-1
                                      text-[14px]
                                      " 

                                      placeholder="product's description"
                                  />
                              </div>
                              
                          </div>
                          {errors.description && <span className="absolute top-[85%] left-0 text-[13px] text-red-600">{errors.description.message as string}</span>}
                    </div>
                 </div>
            </div>
          </div>
          <div className="bg-slate-600 rounded-md w-full grid grid-cols-3 gap-2 h-full p-2">
           
            <div className="col-span-3 grid grid-cols-3 gap-2 mb-2">
                 {/* color  array checkbox*/}
                 <div className="relative">
                  <Checkbox 
                    handleCheck ={ handleCheckbox}
                    array={colorArr}
                    column= {3}
                    title="Color"
                    colorValue ={color}
                    exercute = {exercute}
                  />
                   {errors.color && <span className="absolute top-[100%] left-0 text-[13px] text-red-600">{errors.color.message as string}</span>}
                 </div>
                  <div className="relative">
                    <CheckboxSize 
                      handleCheck={handleCheckSize}
                      array={sizeArr}
                      column={3}
                      title="Size"
                      sizeValue = {size}
                      exercute = {exercute}
                    />
                     {errors.size && <span className="absolute top-[100%] left-0 text-[13px] text-red-600">{errors.size.message as string}</span>}
                  </div>
                  <div className="relative">
                    <CheckboxPerson
                      handleCheck={handleCheckPerson}
                      array={personArr}
                      column={2}
                      title="Design for"
                      personValue ={person}
                      exercute = {exercute}
                    />
                    {errors.person && <span className="absolute top-[100%] left-0 text-[13px] text-red-600">{errors.person.message as string}</span>}
                  </div>
            {/* size array checkbox*/}
            </div>
            {/* unit */}
            <div className="col-span-3 grid grid-cols-3 gap-2">
                <div className="relative">
                  <CategoryRadioUnit
                    id="unit"
                    unit={unit}
                    register={register}
                    errors={errors}
                    exercute ={exercute}
                  />
                   {errors.unit && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.unit.message as string}</span>}
                </div>
            {/* transportation */}
                <div className="relative">
                  <Transaction 
                      handleAddTransaction = {handleAddTransaction}
                      transaction = {transaction}
                      exercute ={exercute}
                  />
                  {errors.transaction && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.transaction.message as string}</span>}
                </div>
                
            {/* defualt price */}
                <div className="relative">
                  <InputPrice 
                    id= "defaultPrice"
                    title="Price"
                    placeholder="price"
                    type="number"
                    register={register}
                    errors={errors}
                    unit={unit ? unit:'vnd'}
                    exercute={exercute}
                    value={defaultPrice}
                  />
                   {errors.defaultPrice && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.defaultPrice.message as string}</span>}
                </div>
            
            </div>
            <div className="col-span-3 grid-cols-2 gap-2 ">
                {/* tax */}
                <div className="relative col-span-1">
                  <InputNumber
                    id= "tax"
                    title="Tax"
                    placeholder="tax"
                    type="number"
                    register={register}
                    errors={errors}
                    unit="%"
                    exercute ={exercute}
                  />
                  {errors.tax && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.tax.message as string}</span>}
                </div>
      
              {/* price sale */}
              <div className="relative col-span-1">
                <InputNumber
                    id= "salePrice"
                    title="Sale's Price"
                    placeholder="sale of price"
                    type="number"
                    //value={salePrice}
                    register={register}
                    errors={errors}
                    unit={unit ? unit:'vnd'}
                    exercute ={exercute}
                  />
                  {errors.salePrice && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.salePrice.message as string}</span>}
              </div>
            </div>
            <div className="col-span-3 grid grid-cols-2 gap-2 rounded-md ">
              <div className="col-span-1  ">
                <div className="text-neutral-100 text-[15px] mt-1">Coupon & voucher</div>
                  <DiscountSearch
                    discount ={discount}
                    handleAddDiscountId = {handleAddDiscountId}
                    hadleDeleteDiscount = {handleDeleteDiscount}
                    detailId = {discountId}
                    exercute ={exercute}
                  />
              </div>
              <div className="col-span-1  py-1 relative mb-2">
               {/*  tag */}
            <div className="flex flex-col items-start justify-start gap-2 relative h-[55px] ">
              <div className=" group flex gap-2 items-center justify-center  ">
                <input 
                  type='text' 
                  disabled={exercute}
                  placeholder="tag ..."
                  value={cate}
                  onChange={(e)=>setCate(e.target.value)}
                  className="peer absolute  top-5 left-0 rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 "
                />
               
                 <FaPlus
                  onClick={() =>handleAdd(cate)}
                  className="absolute right-1 top-[50%]  cursor-pointer text-slate-500/60 peer-focus:text-slate-900" />

              </div>
              <label 
                    className="
   
                    absolute 
                    top-0 
                    left-0 
                    text-neutral-200 
                    text-[15px]
                    flex
                    items-center
                    justify-between
                    w-full
                    "
                    
                >Tag</label>
                <div className="absolute top-0 right-0 text-neutral-100">
                  <QuestionNotified 
                    title="?"
                    content="How to tag:"
                    content2=" 1.Typing some tag"
                    content3=" 2.Click + to add new tag"
                />
                </div>
                
            </div>
              {tag.length >0 && (
                  <div className="flex items-start justify-start gap-0.5 flex-wrap w-full h-auto min-h-14 bg-slate-500/80 rounded-md p-2">
                  {tag.length >0 && tag.map((item:any)=>{
                    return (<div 
                              key={item}
                              className="bg-[#5EC0B5] text-white text-[12px] rounded-md flex items-center justify-center gap-2 px-1 py-0.5"
                            >
                              <span>{item}</span>
                              <span
                                onClick={() =>handleDeleteTagItem(item)}
                                className="text-[14px] text-red-600 cursor-pointer"
                              >
                                <RxCross2 />
                              </span>
                          </div>
                    )
                  })}
                </div>
              )}
              {errors.tag && <span className="absolute top-[90%] left-2 text-[13px] text-red-600">{errors.tag.message as string}</span>}
            </div>
          </div>
          </div>
          <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className={cn("px-2 py-1 rounded-md bg-[#5EC0B5] hover:opacity-[0.7] flex items-center justify-center gap-2 text-neutral-200 w-full text-[15px] ",
                            isLoading ?'cursor-not-allowed': 'cursor-pointer'
              )}
            > 
              Update Product
              {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
          </button>
        
        </div>
    )
}

export default ProductDetail