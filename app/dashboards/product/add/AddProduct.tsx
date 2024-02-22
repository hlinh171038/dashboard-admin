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
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Checkbox from "@/components/products/checkbox";
import { any, string } from "zod";
import CheckboxSize from "@/components/products/checkbox-size";
import CheckboxPerson from "@/components/products/checkbox-person";

const colorArr = ['red','orange','blue','brown','pink','yellow','purple','grey','white','black','green','beige','aqua','lime','silver']
const sizeArr = ['SX','S','KL','M','L','XL','XXL','3XL','4XL',]
const personArr = ['men','women','both','kid','young','elder','sport','office','student']

interface AddNewProductProps {
    user: User | any
}


const AddNewProduct:React.FC<AddNewProductProps>= ({
    user
}) => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [userId,setUserId] = useState(user?.id || '')
  const [cate,setCate] = useState('')

  console.log(user)
  const modal = useCategoryModal()
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
          userId,
          title: '',
          brand: '',
          image: '',
          weight: '0',
          location: '',
          description: '',
          stock: '0',
          category: 'cloth',
          tag:[],
          unit: 'vnd',
          transaction: [],
          defaultPrice: '0',
          margin: '0',
          tax: '0',
          salePrice: 0,
          color: [],
          size: [],
          person:[]
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

      console.log(size)
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/add-new-product',data)
              .then((res)=>{
                toast.success('Created new product.')
                router.refresh()
              })
              .catch((err:any)=>{
                toast.error('Some thing went wrong')
              })
              .finally(()=>{
                setIsLoading(false)
              })
      }

      const setCustomerValue = (id:string, value:any) => {
        setValue(id,value,{
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      }

      //handle open categories
      const handleOpenCategory = useCallback(() =>{
        console.log(modal.isOpen)
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
        console.log(tag)
        setCustomerValue('tag',tag)
        setCate('')
      }

      //handle add transaction
      const handleAddTransaction = (transaction:any,value:string) =>{
        console.log(transaction)
          console.log(value)
          const index = transaction.find((val:string)=>val === value)
            console.log(index)
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
        
        if(defaultPrice !== '0' && margin !=='0'){
          const  price =Number(defaultPrice) - ((Number(defaultPrice) * Number(margin))/100);
          setCustomerValue('salePrice',price)
        }
      },[defaultPrice,margin])

      //handle add checkbox
      const handleCheckbox = (check:any,value:any) =>{
        
       
        const index = check.find((val:string)=>val === value)
        if(index){
          const deleteColor = check.splice(index,1);
         setCustomerValue('color',check);
         return;
        }
       check.push(value)
        setCustomerValue('color',check);
       
      }
      //handleCheckSize
      const handleCheckSize = (check:any,value:any)=>{
        const index = check.find((val:string)=>val === value)
        if(index){
           check.splice(index,1);
         setCustomerValue('size',check);
         return;
        }
       check.push(value)
        setCustomerValue('size',check);
       
      }
      //handle check person
      const handleCheckPerson = (check:any,value:any)=>{
        const index = check.find((val:string)=>val === value)
        if(index){
           check.splice(index,1);
         setCustomerValue('person',check);
         return;
        }
       check.push(value)
        setCustomerValue('person',check);
       
      }
    return (
        <div className="flex flex-col justify-start items-start gap-2 w-full px-2">
          <div className="grid grid-cols-3 w-full rounded-md  gap-2 ">
           <div className="col-span-1  w-full h-auto rounded-md  flex flex-col gap-2">
                  <UploadImage 
                      value={image}
                      onChange={(value)=>setCustomerValue("image",value)}
                  />
            </div>
            <div className="col-span-2 bg-slate-600 rounded-md p-2">
                <InputCustomerId 
                  id="title"
                  title="Product Name"
                  register={register}
                  placeholder="product name"
                  type="text"
                  errors={errors}
                />
                <div className="grid grid-cols-2 w-full gap-2 ">
                  <div className="col-span-1">
                    <InputCustomerId 
                      id="brand"
                      title="Brand"
                      register={register}
                      placeholder="brand"
                      type="text"
                      errors={errors}
                  />
                  </div>
                  <CategoryRadio 
                    id="category"
                    register={register}
                    errors={errors}
                    category={category}
                  />
                 

                </div>
                 {/* stock */}
                 <div className="grid grid-cols-2 w-full gap-2 ">
                    <div className="col-span-1">
                      <InputNumber 
                        id="stock"
                        title="Stock"
                        register={register}
                        placeholder="manager stock"
                        type="number"
                        errors={errors}
                        unit="#"
                      />
                    </div>
                    <div className="col-span-1">
                      <InputNumber 
                          id="weight"
                          title="Weight"
                          register={register}
                          placeholder="product weight"
                          type="number"
                          errors={errors}
                          unit="kg"
                        />
                    </div>
                 </div>
                 {/* location + description */}
                 <div className="grid grid-cols-2 w-full gap-2 ">

                    <div className="col-span-1 ">
                      <div className="">
                              <div className="flex flex-col items-start justify-start  relative ">
                                  <label htmlFor="address" className="text-neutral-200 text-[15px] ">Location</label>
                                  <Textarea
                                      {...register("location")} 
                                      className="
                                      outline-none 
                                      bg-slate-500/60 
                                      border-0 
                                      focus:bg-white 
                                      focus:border-0 
                                      h-full 
                                      mb-4" 

                                      placeholder="Bussiness's location"
                                  />
                              </div>
                              {errors.location && <span className="absolute top-[90%] left-0 text-[13px] text-red-600">{errors.location.message as string}</span>}
                          </div>
                    </div>
                    <div className="col-span-1">
                    <div className="">
                              <div className="flex flex-col items-start justify-start  relative ">
                                  <label htmlFor="address" className="text-neutral-200 text-[15px] ">Description</label>
                                  <Textarea
                                      {...register("description")} 
                                      className="
                                      outline-none 
                                      bg-slate-500/60 
                                      border-0 
                                      focus:bg-white 
                                      focus:border-0 
                                      h-full 
                                      mb-4" 

                                      placeholder="product's description"
                                  />
                              </div>
                              {errors.description && <span className="absolute top-[90%] left-0 text-[13px] text-red-600">{errors.description.message as string}</span>}
                          </div>
                    </div>
                 </div>
            </div>
          </div>
          <div className="bg-slate-600 rounded-md w-full grid grid-cols-3 gap-2 h-full p-2">
           
            <div className="col-span-3 grid grid-cols-3 gap-2">
                 {/* color  array checkbox*/}
                 <div>
                  <Checkbox 
                    handleCheck ={ handleCheckbox}
                    array={colorArr}
                    column= {3}
                    title="Color"
                  />
                 </div>
                  <div>
                    <CheckboxSize 
                      handleCheck={handleCheckSize}
                      array={sizeArr}
                      column={2}
                      title="Size"
                    />
                  </div>
                  <div>
                    <CheckboxPerson 
                      handleCheck={handleCheckPerson}
                      array={personArr}
                      column={2}
                      title="Design for"
                    />
                  </div>
            {/* size array checkbox*/}
            </div>
            {/* unit */}
            <div className="col-span-3 grid grid-cols-3 gap-2">
                <CategoryRadioUnit
                  id="unit"
                  unit={unit}
                  register={register}
                  errors={errors}
                />
            {/* transportation */}
                <Transaction 
                    handleAddTransaction = {handleAddTransaction}
                    transaction = {transaction}
                />
            {/* defualt price */}
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
            {/* tax */}
            <InputNumber
                  id= "tax"
                  title="Tax"
                  placeholder="tax"
                  type="number"
                  register={register}
                  errors={errors}
                  unit="%"
                />
            {/* discount */}
            <InputNumber 
                  id= "margin"
                  title="Discount"
                  placeholder="discount"
                  type="number"
                  register={register}
                  errors={errors}
                  unit='%'
                />
              {/* price sale */}
              <InputNumber 
                  id= "salePrice"
                  title="Sale's Price"
                  placeholder="sale of price"
                  type="number"
                  value={salePrice}
                  register={register}
                  errors={errors}
                  unit={unit ? unit:'vnd'}
                />
            </div>
            <div className="col-span-3">
               {/*  tag */}
            <div className="flex flex-col items-start justify-start gap-2 relative h-[55px]">
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
                  className="absolute right-1 top-[55%]  cursor-pointer text-slate-500/60 peer-focus:text-slate-900" />

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
                <div className="absolute top-0 right-2">
                  <QuestionNotified 
                    title="?"
                    content="How to tag. 1.typing some tag 2.click + to add new tag"
                   
                />
                </div>
              
            </div>
            <div className="flex items-start justify-start gap-0.5 flex-wrap w-full h-auto min-h-20 bg-slate-500/80 rounded-md p-2">
                {tag.length >0 && tag.map((item:any)=>{
                  return (<div 
                            key={item}
                            className="bg-slate-900 text-white text-[12px] rounded-md flex items-center justify-center px-1 py-0.5"
                          >
                            {item}
                        </div>
                  )
                })}
              </div>
            </div>
          </div>
          <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className={cn("px-2 py-1 rounded-md bg-slate-900 hover:bg-slate-800/80 flex items-center justify-center text-neutral-200 w-full text-[15px] ",
                            isLoading ?'cursor-not-allowed': 'cursor-pointer'
              )}
            > 
            Add New Product
          </button>
        </div>
    )
}

export default AddNewProduct