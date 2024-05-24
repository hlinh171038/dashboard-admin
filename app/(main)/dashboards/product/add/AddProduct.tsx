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
import { Category, Discount, User } from "@prisma/client";
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
import SelectProvince from "@/app/(main)/profile/selectProvince";
import SelectDistrict from "@/app/(main)/profile/selectDistrict";
import SelectCommune from "@/app/(main)/profile/selectCommune";
import { GoPlus } from "react-icons/go";

export const colorArr = ['red','orange','blue','brown','pink','yellow','purple','grey','white','black','green','beige','aqua','gold','silver']
export const sizeArr = [,'S','4XL','<25','M',"25-30",'35-40','L','>50','45-50','XL','30-35','40-45','3XL',]
export const personArr = ['men','women','party','kid','young','elder','sport','office','student','luxury']

type formData = {
  userId: string,
  title: string,
  brand: string,
   //stock: number,
  weight: number,
  location: string,
  description: string,
  defaultPrice: number,
  margin: number,
 transaction: string[],
  salePrice: number,
  color: string[],
  size: string[],
  // person: string[],
  tag: string[],
  image: string,
  category: string,
  unit: string,
  discountId: string[],
  stock: number[],
  province: string,
  district: string,
  commune: string
}

interface AddNewProductProps {
    user: User | any;
    currentUser: any;
    discount: Discount[] | any
    users: User[] | any;
    categorys: Category[] | any;
}


const AddNewProduct:React.FC<AddNewProductProps>= ({
    user,
    users = [],
    discount,
    currentUser,
    categorys = []
}) => {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [currentUserInfo,setCurrentUserInfo] = useState<any>([])
 
  const [cate,setCate] = useState('')

  // bien the
  const [addVariant,setAddVariant] = useState<any>([])
  const [colorVariant,setColorVariant] = useState<any>('') ;
  const [sizeVariant,setSizeVariant] = useState<any>('') ;
  const [stockVariant,setStockVariant] = useState<any>('') ;

  //dia chi
  const [provinces,setProvinces] = useState<any>([])
    const [districts,setDistricts] = useState<any>([])
    const [communes,setCommunes] = useState<any>([])
    const [provinceSelected,setProvinceSelected] = useState<any>(null)
    const [districtSelected,setDistrictSelected] = useState<any>(null)

  const schema: ZodType<formData> = z.object({
      userId: z.string(),
      title: z.string().min(3).max(20),
      brand: z.string().min(3).max(50),
      // stock: z.coerce.number().lte(10000).gte(1),
      weight: z.coerce.number().lte(100).gte(0.001),
      location: z.string().min(3).max(200),
      description: z.string().min(3).max(200),
      defaultPrice: z.coerce.number().lte(100000000).gte(1),
      margin: z.coerce.number().lte(100).gte(1),
      transaction: z.array(z.string()).nonempty(),
      salePrice: z.coerce.number().lte(100000000).gte(1),
      color: z.array(z.string()).nonempty(),
      size: z.array(z.string()).nonempty(),
      // person: z.array(z.string()).nonempty(),
      tag: z.array(z.string()).nonempty(),
      image: z.string(),
      category: z.string().min(1,{
        message: "You havent chosen category yet !!!"
      }),
      unit: z.string(),
      discountId: z.array(z.string()),
      stock: z.array(z.coerce.number()),
      province: z.string(),
      district: z.string(),
      commune: z.string()
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
          // stock: 0,
          category: '', // ?
          tag:[],
          unit: 'vnd',
          transaction: [],
          defaultPrice: 0,
          margin: 0,
          tax: 0,
          salePrice: 0,
          color: [],
          size: [],
          // person:[],
          discountId: [],
          stock: [],
          province: '',
          district: '',
          commune: ''
        }
      })

      const image = watch('image')
      const title = watch('title')
      const category = watch('category')
      const tag = watch('tag')
      const transaction = watch('transaction')
      const unit = watch('unit')
      const defaultPrice = watch('defaultPrice')
   
      const salePrice = watch('salePrice')
      const color = watch('color')
      const size = watch('size')
      // const person = watch('person')
      const stock = watch('stock')
      const userId = watch('userId')
      const discountId = watch('discountId')
      const province = watch('province')
      const district = watch('district')
      const commune = watch('commune')
      const margin = watch('margin')

     console.log(userId)
     console.log(title)
     console.log(category)
     console.log(tag)
     console.log(transaction)
     console.log(typeof(unit))
     console.log(defaultPrice)
     console.log(margin)
     console.log(salePrice)
     console.log(color)
     console.log(size)
     console.log(stock)
     console.log(userId)
     console.log(discountId)
     console.log(province)
     console.log(district)
     console.log(commune)



      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
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
        console.log(id)
        const result = [...tag];
        console.log(result)
        const re = result.filter((item:any)=> item !== id)
        setCustomerValue('tag',re)
      },[setCustomerValue,tag])

      
      //handle add transaction
      // const handleAddTransaction = (transaction:any,value:string) =>{
       
      //     const index = transaction.find((val:string)=>val === value)
  
      //     if(index) {
      //       const newTra = transaction.splice(index,1)
      //       setCustomerValue('transaction',transaction);
      //       return
      //     }
      //     transaction.push(value)
      //     setCustomerValue('transaction',transaction)
      // }
      // auto updated price
    
      useEffect(()=>{
        
        if(defaultPrice !== 0 && margin !==0){
          const  price =Number(defaultPrice) - ((Number(defaultPrice) * Number(margin))/100);
          setCustomerValue('salePrice',price)
        }
      },[defaultPrice,margin,setCustomerValue])

      ///////////////////////////////////////////////////////////////////dia chi////////////////////////////////////////////////
       // province |||| district  ||| commune data
  // data provinces
  useEffect(()=>{
    axios.get('https://vietnam-administrative-division-json-server-swart.vercel.app/province')
        .then((res:any)=>{
            setProvinces(res?.data)
        })
        .catch((err:any)=>{
            console.log(err)
        })
  },[])

// data districts
useEffect(()=>{
    if(provinceSelected) {
        console.log(provinceSelected)
        console.log(provinceSelected?.idProvince)
        axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/district/?idProvince=${provinceSelected?.idProvince}`)
            .then((res:any)=>{
                setDistricts(res?.data)
            })
            .catch((err:any)=>{
                console.log(err)
            })
    } 
  },[provinceSelected])
    console.log(districts)
// data commune
useEffect(()=>{
    if(districtSelected) {
        axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/commune/?idDistrict=${districtSelected?.idDistrict}`)
        .then((res:any)=>{
            setCommunes(res?.data)
        })
        .catch((err:any)=>{
            console.log(err)
        })
    }
   
},[districtSelected])

     
      
      const addNewVariant = (colorInpit:string,sizeInput: string, stockInput:number) =>{
        console.log(colorVariant)
        console.log(sizeVariant)
        console.log(stockVariant)
        // check fill all
        if(!colorVariant ) {
          toast.warning("fill out color !!!");
          return;
        }
        if(!sizeVariant ) {
          toast.warning("fill out size !!!");
          return;
        }
        if(!stockVariant ) {
          toast.warning("fill out quantity in stock !!!");
          return;
        }
        
        //add to arrayVariant
        const array = [...addVariant]
        //check  same size,color
        console.log(array)
        let count = 0;
       const result =  array?.find((item:any) =>{
          
          if( item.color === colorVariant && item.size === sizeVariant) {
            count += 1;
          }
        });
        if(count >0) {
          toast.warning("The same size and color is existed !!!");
          return;
        }
        console.log(array)
        const id =array.length;
        const obj = {id,color:colorVariant, size:sizeVariant, stock:stockVariant}
        array.push(obj)
        setAddVariant(array)
        // set to data
        setCustomerValue('color',[...color ,colorVariant])
        setCustomerValue('size',[...size ,sizeVariant])
        setCustomerValue('stock',[...stock ,stockVariant])
        // set variant default
        setColorVariant('');
        setSizeVariant('');
        setStockVariant('');
        
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
                  <div className="col-span-1 relative">
                    <CategoryRadio 
                      id="category"
                      register={register}
                      errors={errors}
                      category={category}
                      categorys = {categorys}
                      setCustomerValue = {setCustomerValue}
                    />
                    {errors.category && <span className="absolute top-12 left-0 text-[13px] text-red-600">{errors.category.message as string}</span>}
                  </div>
                  
                 

                </div>
                 {/* stock , weight */}
                 <div className="row-span-1 grid grid-cols-2 w-full gap-2 ">
                    {/* <div className="col-span-1 relative">
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
                    </div> */}
                    <div className=" relative col-span-2">
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
                 {/*  description */}
                 <div className="row-span-2 grid grid-cols-2 w-full gap-2 ">

                    
                    {/* description */}
                    <div className="col-span-2 relative h-full">
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
                                      focus:bg-white 
                                      transition-all 
                                      focus:text-slate-900
                                      text-neutral-200
                                      focus:outline-none
                                      w-full
                                      rounded-md
                                      px-2 
                                      placeholder:capitalize
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
           
            {/* <div className="col-span-3 grid grid-cols-3 gap-2 mb-2">
                 
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
         

            </div> */}
            {/* bien the */}
            <div className="text-neutral-100 text-[15px] mb-[-4px]">Variant {`(${addVariant && addVariant.length <9 && addVariant.length >0 ? `0${addVariant.length}`: addVariant.length})`}</div>
            <div className="col-span-3 w-full flex flex-col gap-2">
             
            <div className="flex flex-col gap-2">
            
              {addVariant && addVariant.map((item:any)=>{
                return <div key={item?.id} className="grid grid-cols-3 gap-2 w-full">
                            <input 
                                type="text" 
                                onChange={(e:any)=>setColorVariant(e.target.value)} 
                                value={item?.color} 
                                placeholder="color" 
                                className="rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize" 
                                />
                                
                            <input 
                                type="text" 
                                onChange={(e:any)=>setSizeVariant(e.target.value)} 
                                value={item?.size} 
                                placeholder="size"
                                className="rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize" 
                                />
                            <input 
                                type="number" 
                                onChange={(e:any)=>setStockVariant(e.target.value)} 
                                value={item?.stock} 
                                placeholder="stock"
                                className="rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize" 
                                />
                      </div>
              })}
              </div>
              <div className="grid grid-cols-3 gap-2 w-full">
                
                <input 
                    type="text" 
                    onChange={(e:any)=>setColorVariant(e.target.value)} 
                    value={colorVariant} 
                    placeholder="color" 
                    className="rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize" 
                />
                <input 
                    type="text" 
                    onChange={(e:any)=>setSizeVariant(e.target.value)} 
                    value={sizeVariant} 
                    placeholder="size"
                    className="rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize" 
                    />
                <input 
                    type="number" 
                    onChange={(e:any)=>setStockVariant(e.target.value)} 
                    value={stockVariant} 
                    placeholder="stock"
                    className="rounded-md px-2 py-1 w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 text-neutral-200 placeholder:capitalize" 
                    />
              </div>
              <div className="flex items-center justify-end ">
                <button 
                    onClick={()=>addNewVariant(colorVariant,sizeVariant,stockVariant)}
                    className="bg-[#4fa29e] rounded-md px-2 py-1 text-[14px] text-neutral-100 hover:opacity-[0.7] hover:text-white flex items-center justify-start gap-2"
                  >
                    <GoPlus className="w-4 h-4 text-neutral-100 "/>
                    Variant 
                </button>
              </div>
              
            </div>
            
            {/* unit */}
            <div className="col-span-3 grid grid-cols-3 gap-2">
                <div className="relative">
                  <CategoryRadioUnit
                    id="unit"
                    unit={unit}
                    register={register}
                    errors={errors}
                    setCustomerValue={setCustomerValue}
                  />
                   {errors.unit && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.unit.message as string}</span>}
                </div>
            {/* transportation */}
                <div className="relative">
                  <Transaction
                      id="transaction"
                      
                      transaction = {transaction}
                      setCustomerValue={setCustomerValue}
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
                      id= "margin"
                      title="Sale Percent"
                      placeholder="percent"
                      type="number"
                      register={register}
                      errors={errors}
                    
                      unit="%"
                    />
                    {errors.margin && <span className="absolute top-[75%] left-0 text-[13px] text-red-600">{errors.margin.message as string}</span>}
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
                      disabled
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
                              className="bg-[#4FA29E] text-white text-[12px] rounded-md flex items-center justify-center gap-2 px-1 py-0.5"
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
            {/* dia chi */}
            <div className=" col-span-2 grid grid-cols-3 gap-2 mb-4">
                <SelectProvince data={provinces} id={'province'} setCustomValue = {setCustomerValue}  province = {province} setProvinceSelected = {setProvinceSelected}/>
                <SelectDistrict data={districts} id={'district'} setCustomValue = {setCustomerValue}   district = {district} setDistrictSelected = {setDistrictSelected}/> 
                <SelectCommune data={communes} id={'commune'} setCustomValue = {setCustomerValue}   commune = {commune}/> 
            </div>
            <div className="col-span-2 relative h-full">
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
                            
                              h-32
                              focus:bg-neutral-100 
                              focus:text-slate-900
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
          </div>

            </div>
            
          <button 
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className={cn("px-2 py-1 rounded-md bg-[#4fa29e] hover:opacity-[0.7] flex items-center justify-center gap-2 text-neutral-200 w-full text-[15px] ",
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