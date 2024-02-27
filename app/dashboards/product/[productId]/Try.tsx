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
import { Product, User } from "@prisma/client"
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

type formData = {
    userId: string,
    title: string,
    brand: string,
    stock: number,
    weight: number,
    location: string,
    description: string,
    defaultPrice: number,
    margin: number,
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
   
}


const Try:React.FC<ProductDetailProps> = ({
    product,
  
}) =>{
    const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  //const [userId,setUserId] = useState(user?.id )
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
      margin: z.coerce.number().lte(100).gte(1),
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

 // console.log(product)
  

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm<FieldValues>({
         resolver:zodResolver(schema),
        defaultValues: {
          userId: product.id,
          title: product.title,
          brand: product.brand,
          image: product.image,
          weight: 1 ,
          location: product.location,
          description: product.description,
          stock: product.stock,
          category: product.category,
          tag: product.tag,
          unit: product.unit,
          transaction: product.transportation,
          defaultPrice: product.defaultPrice,
          margin: product.margin,
          tax: product.tax,
          salePrice: product.salePrice,
          color: product.color,
          size: product.size,
          person: product.designFor
        }
      })

    //   const image = watch('image')
    //   const title = watch('title')
    //   const category = watch('category')
    //   const tag = watch('tag')
    //   const transaction = watch('transaction')
    //   const unit = watch('unit')
    //   const defaultPrice = watch('defaultPrice')
    //   const margin = watch('margin')
    //   const salePrice = watch('salePrice')
    //   const color = watch('color')
    //   const size = watch('size')
    //   const person = watch('person')
    //   const stock = watch('stock')
    //   const productId = watch('productId')

      
      const onSubmit: SubmitHandler<FieldValues> = (data) => {  
        console.log(data)
        // console.log('try1')
        // setIsLoading(true)
        // axios.post('/api/add-new-product',data)
        //       .then((res)=>{
        //         console.log('try')
        //         // toast.success('Created new product.')
        //         // router.push('/dashboards/product')
        //         // router.refresh()
        //       })
        //       .catch((err:any)=>{
        //         toast.error('Some thing went wrong')
        //       })
        //       .finally(()=>{
        //         setIsLoading(false)
        //       })
      }

     
    return (
        <div>
            <button onClick={handleSubmit(onSubmit)}>click</button>
        </div>
        
    )
}

export default Try