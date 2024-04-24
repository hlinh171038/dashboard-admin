"use client"
import useCategoryModal from "@/app/hooks/useCategoryModal";
import InputCustomerId from "@/components/customers/input"
import UploadImage from "@/components/customers/upload-img"
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { Textarea } from "@/components/ui/textarea";
import CategoryRadio from "@/components/products/category-radio";
import CategoryCheck from "@/components/products/category-check";
import QuestionNotified from "@/components/question-notified";
import CategoryRadioUnit from "@/components/products/category-radio-unit";
import { toast } from "sonner";
import Transaction from "@/components/products/category-transaction";
import InputNumber from "@/components/products/Input-number";

import { FaPlus } from "react-icons/fa6";
import InputPrice from "@/components/products/input-price";
import axios from "axios";
import { Discount, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Checkbox from "@/components/products/checkbox";
import { ZodType,string,z } from "zod";
import CheckboxSize from "@/components/products/checkbox-size";
import CheckboxPerson from "@/components/products/checkbox-person";
import { zodResolver } from "@hookform/resolvers/zod";
import DiscountSearch from "@/components/products/discount-search";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const colorArr = ['red','orange','blue','brown','pink','yellow','purple','grey','white','black','green','beige','aqua','gold','silver']
export const sizeArr = [,'S','4XL','<25','M',"25-30",'35-40','L','>50','45-50','XL','30-35','40-45','3XL',]
export const personArr = ['men','women','party','kid','young','elder','sport','office','student','luxury']

type formData = {
  userId: string,
  title: string,
  brand: string,
  stock: number,
  weight: number,
  location: string,
  description: string,
  defaultPrice: number,
  tax: number,
  transaction: string[],
  salePrice: number,
  color: string[],
  size: string[],
  person: string[],
  tag: string[],
  image: string,
  category: string,
  unit: string,
  discountId: string[]
}

interface AddNewProductProps {
    user: User | any;
    currentUser: any;
    discount: Discount[] | any
    users: User[] | any;
}


const AddNewProduct:React.FC<AddNewProductProps>= ({
    user,
    users = [],
    discount,
    currentUser
}) => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [currentUserInfo,setCurrentUserInfo] = useState<any>([])
 
  const [cate,setCate] = useState('')

  const schema: ZodType<formData> = z.object({
      userId: z.string(),
      title: z.string().min(3).max(20),
      brand: z.string().min(3).max(50),
      stock: z.coerce.number().lte(10000).gte(1),
      weight: z.coerce.number().lte(100).gte(0.1),
      location: z.string().min(3).max(200),
      description: z.string().min(3).max(200),
      defaultPrice: z.coerce.number().lte(100000000).gte(1),
      tax: z.coerce.number().lte(100).gte(1),
      transaction: z.array(z.string()).nonempty(),
      salePrice: z.coerce.number().lte(100000000).gte(1),
      color: z.array(z.string()).nonempty(),
      size: z.array(z.string()).nonempty(),
      person: z.array(z.string()).nonempty(),
      tag: z.array(z.string()).nonempty(),
      image: z.string(),
      category: z.string(),
      unit: z.string(),
      discountId: z.array(z.string())
  })

  
  const modal = useCategoryModal()
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver:zodResolver(schema),
        defaultValues: {
          userId: user.id ,
          title: '',
          brand: '',
          image: '',
          weight: 0,
          location: '',
          description: '',
          stock: 0,
          category: 'cloth',
          tag:[],
          unit: 'vnd',
          transaction: [],
          defaultPrice: 0,
          margin: 0,
          tax: 0,
          salePrice: 0,
          color: [],
          size: [],
          person:[],
          discountId: [],
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


      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/add-new-product',data)
              .then((res)=>{
                //toast.success('Created new product.')
                router.push('/dashboards/product')
                router.refresh()
              })
              .catch((err:any)=>{
                toast.error('Some thing went wrong')
              })
              .finally(()=>{
                setIsLoading(false)
              })

          axios.post('/api/create-new-history',{
                userId: currentUserInfo && currentUserInfo.id,
                title:`add new product`,
                type: 'add-new-product'
            })
            .then((res)=>{
                
                toast.success('add new product');
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

      //handle open categories
      const handleOpenCategory = useCallback(() =>{
        //console.log(modal.isOpen)
        modal.onOpen()
      },[modal])

      // handle add tag
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
        //console.log(tag)
        setCustomerValue('tag',tag)
        setCate('')
      }

      // handle delete tag
      const handleDeleteTagItem = useCallback((id:string)=>{
        const result = [...tag];
        const re = result.filter((item:any)=> item.id !== id)
        setCustomerValue('tag',re)
      },[setCustomerValue,tag])

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
      // auto updated price
    
      useEffect(()=>{
        
        if(defaultPrice !== 0 && margin !==0){
          const  price =Number(defaultPrice) - ((Number(defaultPrice) * Number(margin))/100);
          setCustomerValue('salePrice',price)
        }
      },[defaultPrice,margin,setCustomerValue])

      //handle add checkbox
      const handleCheckbox = (check:any,value:any) =>{
        
       
        const index = check.findIndex((val:string)=>val === value)
        //console.log(index)
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
        if(index!== -1){
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
        if(index!== -1){
           check.splice(index,1);
         setCustomerValue('person',check);
         return;
        }
       check.push(value)
        setCustomerValue('person',check);
       
      }

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

    if(currentUser) {
        const result = users && users.find((item:any)=>item.email === currentUser?.user.email);
        setCurrentUserInfo(result)
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
            <div className="col-span-2 bg-slate-600 rounded-md px-2 py-2 grid grid-flow-col grid-rows-5">
              {/* name */}
                <div className="row-span-1 relative">
                  <InputCustomerId 
                    id="title"
                    title="Product Name"
                    register={register}
                    placeholder="product name"
                    type="text"
                    errors={errors}
                  />
                  {errors.title && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.title.message as string}</span>}
                </div>
                {/* brand, category */}
                <div className="row-span-1 grid grid-cols-2 w-full gap-2 ">
                  <div className="col-span-1 relative">
                      <InputCustomerId 
                        id="brand"
                        title="Brand"
                        register={register}
                        placeholder="brand"
                        type="text"
                        errors={errors}
                    />
                    {errors.brand && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.brand.message as string}</span>}
                  </div>
                  <CategoryRadio 
                    id="category"
                    register={register}
                    errors={errors}
                    category={category}
                  />
                 

                </div>
                 {/* stock , weight */}
                 <div className="row-span-1 grid grid-cols-2 w-full gap-2 ">
                    <div className="col-span-1 relative">
                      <InputNumber 
                        id="stock"
                        title="Stock"
                        register={register}
                        placeholder="manager stock"
                        type="number"
                        errors={errors}
                        unit="#"
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
                        />
                         {errors.weight && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.weight.message as string}</span>}
                    </div>
                 </div>
                 {/* location + description */}
                 <div className="row-span-2 grid grid-cols-2 w-full gap-2 ">

                    <div className="col-span-1 relative h-full">
                      <div className="h-full">
                              <div className="flex flex-col items-start justify-start  relative h-full">
                                  <label htmlFor="address" className="text-neutral-200 text-[15px] ">Location</label>
                                  <textarea
                                      {...register("location")} 
                                      className="
                                      outline-none 
                                      bg-slate-500/60 
                                      border-0 
                                       
                                      focus:border-0 
                                   
                                      h-full
                                      
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
                    {/* description */}
                    <div className="col-span-1 relative h-full">
                    <div className="h-full">
                              <div className="flex flex-col items-start justify-start  relative h-full">
                                  <label htmlFor="address" className="text-neutral-200 text-[15px] ">Description</label>
                                  <textarea
                                      {...register("description")} 
                                      className="
                                      outline-none 
                                      bg-slate-500/60 
                                      border-0 
                                       
                                      focus:border-0 
                                      h-full
                                      
                                      text-neutral-200
                                      focus:outline-none
                                      w-full
                                      rounded-md
                                      px-2 
                                      
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
                  />
                   {errors.color && <span className="absolute top-[100%] left-0 text-[13px] text-red-600">{errors.color.message as string}</span>}
                 </div>
                  <div className="relative">
                    <CheckboxSize 
                      handleCheck={handleCheckSize}
                      array={sizeArr}
                      column={3}
                      title="Size"
                    />
                     {errors.size && <span className="absolute top-[100%] left-0 text-[13px] text-red-600">{errors.size.message as string}</span>}
                  </div>
                  <div className="relative">
                    <CheckboxPerson 
                      handleCheck={handleCheckPerson}
                      array={personArr}
                      column={2}
                      title="Design for"
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
                  />
                   {errors.unit && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.unit.message as string}</span>}
                </div>
            {/* transportation */}
                <div className="relative">
                  <Transaction 
                      handleAddTransaction = {handleAddTransaction}
                      transaction = {transaction}
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
                  
                    value={defaultPrice}
                  />
                   {errors.defaultPrice && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.defaultPrice.message as string}</span>}
                </div>
                
            </div>
            <div className="col-span-3 grid grid-cols-2 gap-2">
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
                    />
                    {errors.tax && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.tax.message as string}</span>}
                  </div>
              {/* discount */}
                {/* <div className="relative">
                  <InputNumber 
                      id= "margin"
                      title="Discount"
                      placeholder="discount"
                      type="number"
                      register={register}
                      errors={errors}
                      unit='%'
                    />
                    {errors.margin && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.margin.message as string}</span>}
                </div> */}
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
                  />
              </div>
              <div className="col-span-1  py-1 relative mb-2">
               {/*  tag */}
            <div className="flex flex-col items-start justify-start gap-2 relative h-[55px] ">
              <div className=" group flex gap-2 items-center justify-center  ">
                <input 
                  type='text' 
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
                              className="bg-slate-900 text-white text-[12px] rounded-md flex items-center justify-center gap-2 px-1 py-0.5"
                            >
                              <span>{item}</span>
                              <span
                                onClick={() =>handleDeleteTagItem(item.id)}
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
              className={cn("px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800/80 flex items-center justify-center gap-2 text-neutral-200 w-full text-[15px] ",
                            isLoading ?'cursor-not-allowed': 'cursor-pointer'
              )}
            > 
            <span>Add New Product</span>
            {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
          </button>
        </div>
    )
}

export default AddNewProduct