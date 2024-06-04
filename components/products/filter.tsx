"use client"

import { useCallback, useEffect, useState } from "react"
import { useForm, SubmitHandler, FieldValues } from "react-hook-form"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/navigation";
import { Category, Product, User } from "@prisma/client";
import { Slider } from "@/components/ui/slider"
import Categoryfilter from "./filter/category";
import axios from "axios";
import CategoryBrand from "./filter/category-brand";


interface FilterProps {
    product: Product[] | any;
    product2: Product[] | any;
    categorys: Category[] | any;
}

const Filter:React.FC<FilterProps> = ({
    product =[],
    product2 =[],
    categorys = []
}) => {

    const router = useRouter()
    const [brandArr,setBrandArr] = useState<any>([])
    const [categoryArr,setCategoryArr] = useState<any>([])
    const [smallPrice,setSmallPrice] = useState(0);
    const [bigPrice,setBigPrice] = useState(0);
    const [data,setData] =useState<any>([])
    const [dateRange,setDateRange] = useState({
        startDate: new Date(),
        endDate:new Date(),
        key: 'selection'
    })

    const [provinces,setProvinces] = useState<any>([])

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            brand: '',
            price: '',
            category: '',
            province: '',
            start: '',
            end: '',
            stock: '',
        
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {
    

        const start = data.start !=='' ? new Date(new Date(data.start).getTime() ).toISOString() : ''
        const end = data.end !=='' ? new Date(new Date(data.end).getTime() + 86400000).toISOString() : ''
        router.push(`/dashboards/product?search=&brand=${data.brand}&category=${data.category}&province=${data.province}&stock=${stock}&price=${price}&start=${start}&end=${end}&page=1&per_page=10`)
      }
    
      const brand = watch('brand')
      const category = watch('category')
      const province = watch('province')
      const start = watch('start')
      const end = watch('end')
      const stock = watch('stock')
      const price = watch('price')
  

    
     //handle customeValue
     const setCustomeValue = useCallback((id:string,value:any)=>{
            setValue(id,value,{
                shouldValidate: true,
                shouldTouch: true,
                shouldDirty: true
            })
     },[setValue])

      //handle selection
      const handleSelected = useCallback((ranges:any)=>{
         
            setDateRange(ranges.selection);
            const start = ranges.selection.startDate;
            const end = ranges.selection.endDate;
            setCustomeValue('start',start);
            setCustomeValue('end',end)
      },[setCustomeValue])


      const handleReset = useCallback(()=>{
        setCustomeValue('brand','');
        setCustomeValue('category','');
        setCustomeValue('stock','');
        setCustomeValue('province','');
        setCustomeValue('price','');
        setCustomeValue('start','');
        setCustomeValue('end','');
      
        router.push(`/dashboards/product?search=&brand=&category=&province=&stock=&price=&start=&end=&page=1&per_page=10`)
    },[setCustomeValue,router])


     //handle slider
     const handleSlider = (value:any) =>{
       
        setCustomeValue('price',value[0])
    }

    //brand 
    useEffect(()=>{
        //brand
        const array = [...product2]
        const result : any[] = [];
        for(let i=0;i<array.length;i++){
            if(!result.includes(array[i].brand)){
        
                result.push(array[i].brand)
            
            }
        }
       setBrandArr(result)

    },[product2])

    useEffect(()=>{
        const array = [...product2]
        const result : any[] = [];
        for(let i=0;i<array.length;i++){
            if(!result.includes(array[i].category)){
            
                result.push(array[i].category)
            }
        }
       setCategoryArr(result)
    },[product2])

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


    //find largest and smalleset price
    useEffect(()=>{
        const result = product2 && product2.sort((a:any,b:any)=> {
            if(a.salePrice >b.salePrice) return -1;
            if(a.salePrice <b.salePrice) return 1;
            return 0;
        });
 
        if(result !==undefined) {
            setSmallPrice(result && result[result.length -1].salePrice)
            setBigPrice(result && result[0].salePrice)
        }
        
    },[product2])
 
    return (
        <div className="w-full">
             {/* header filter */}
             <div className="flex items-center justify-between pr-2 py-1 text-[15px] ">
               
               <div >
                   <span>Filter </span>
                   <span>{product.length}  item</span>
               </div>
               <div className="flex items-center justify-start gap-2">
                   <button 
                       onClick={handleSubmit(onSubmit)}
                       className="flex items-center justify-center px-2 py-1 border border-[#4FA29E] bg-[#4FA29E] hover:opacity-[0.7] cursor-pointer text-neutral-200 test-[15px] w-full rounded-md"
                   >
                       {`show`}
                   </button>
                   <button
                       onClick={handleReset}
                       className="flex items-center justify-center px-2 py-1 bg-neutral-100 border border-[#4FA29E]  cursor-pointer test-[15px] w-full rounded-md"
                   >
                       Reset
                   </button>
               </div>
               
        </div>
          {/* brand */}
          <div>
       
       
            <CategoryBrand
                id="brand"
                register={register}
                errors={errors}
                category={brand}
                categorys = {brandArr && brandArr}
                setCustomerValue = {setCustomeValue}
            />

        </div>
        {/*  category */}
        <div>
     
            <Categoryfilter
                      id="category"
                      register={register}
                      errors={errors}
                      category={category}
                      categorys = {categorys}
                      setCustomerValue = {setCustomeValue}
                    />
        </div>
        <div className="grid grid-cols-2">
                {/* location */}
          
            <Categoryfilter
                      id="province"
                      register={register}
                      errors={errors}
                      category={province}
                      categorys = {provinces}
                      setCustomerValue = {setCustomeValue}
                    />
            {/* stock */}
           
        </div>
        {/* price */}
        <div className="font-bold text-[14px] mb-[-6px]">
                    Price
            </div>
            <div className="text-neutral-400 text-[13px] mb-[-8px]">Chose your price range</div>
        <div className="flex items-center justify-end pr-2 ">
            <div>
                {price ? price : (smallPrice ? smallPrice : 0)} 
            </div>
        </div>
        <Slider defaultValue={[smallPrice &&smallPrice]} max={bigPrice && bigPrice} min={smallPrice && smallPrice} step={1000} onValueChange={(e) =>handleSlider(e)}/>
        {/* date */}

        <div className="py-2">
            <div className="flex items-center justify-end ">
                <div>
                    { start==='' ? (
                        <span className="text-orange-600">Choose the range date</span>
                    ):(
                        <span className="text-green-600">You have chosen</span> 
                    )}
                </div>
            </div>
            <DateRangePicker
                ranges={[dateRange]}
                onChange={handleSelected}
            />
        </div>
        </div>
    )
}

export default Filter