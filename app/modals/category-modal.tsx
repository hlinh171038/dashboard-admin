"use client"

import { useCallback, useEffect, useState } from "react"
import useCategoryModal from "../hooks/useCategoryModal"

const CategoryModal = () =>{
    const modal = useCategoryModal()
    const [showModal,setShowMoal] = useState(modal.isOpen)

    //handle close
    const handleClose = ()=>{
       modal.onClose()
    }

    useEffect(()=>{
        setShowMoal(modal.isOpen)
    },[modal])
    if(!showModal){
        return null
    }
    return (
        <div
        className="
        bg-neutral-800/70
        border-[1px]
        shadow-md
        flex
        justify-center
        items-center
        w-full
        h-[100vh]
        z-50
        fixed
        transition
    "
    >
        <div
             className={`
             translate
             duration-300
             transition-all
             ${showModal ? 'translate-y-0' : 'translate-y-full'}
             ${showModal ? 'opacity-100': 'opacity-0'}
           `}
        >
            <div
                 className={`
                rounded-lg
                 pb-4
                 border-0
                 bg-white
                `}
            >
                <div className="uppercase w-full flex items-center justify-center">categories</div>
                <form>
                    <label className="">Cloth
                        <input type="radio" value="cloth" />
                    </label>
                    <label className="">Bag
                        <input type="radio" value="bag"/>
                    </label>
                    <label className="">Cloth
                        <input type="radio" value="cloth"/>
                    </label>
                    <label className="">Watch
                        <input type="radio" value="watch"/>
                    </label>
                    <label className="">Hat
                        <input type="radio" value="hat"/>
                    </label>
                    <label className="">Tie
                        <input type="radio" value="tie"/>
                    </label>
                    <label className="">Umrella
                        <input type="radio" value="umrella"/>
                    </label>
                    <label className="">Shoes
                        <input type="radio" value="shoes"/>
                    </label>
                    <label className="">Glass
                        <input type="radio" value="glass"/>
                    </label>
                    <label className="">Skirt
                        <input type="radio" value="skirt"/>
                    </label>
                </form>
                <div className="flex items-center justify-center gap-4">
                    <button>
                        add item..
                    </button>
                    <button 
                        onClick={()=>handleClose()}
                    >
                        close
                    </button>
                </div>
        </div>
            
       
    </div>
    </div>
    )
}
export default CategoryModal