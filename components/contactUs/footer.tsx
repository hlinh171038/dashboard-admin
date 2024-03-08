"use client"

const Footer =() =>{
    return (
        <div className="grid grid-cols-3 gap-2 items-start justify-start px-4">
            <div  className="col-span-1 flex flex-col gap-2">
                <div className="text-[17px] text-white capitalize">get started</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div className="hover:text-white">Add new user</div>
                    <div className="hover:text-white">All abount dashboard</div>
                    <div className="hover:text-white">Upgrade dashboard</div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
                <div className="text-[17px] text-white capitalize">manager account and preferences</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div  className="hover:text-white">Loggined and out of dashboard</div>
                    <div  className="hover:text-white">find out role</div>
                    <div  className="hover:text-white">administrator</div>
                    <div  className="hover:text-white">change email</div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2 justify-end">
                <div className="text-[17px] text-white capitalize">find and save</div>
                <div className="text-[14px] font-thin text-neutral-400 underline cursor-pointer transition-all duration-300">
                    <div  className="hover:text-white">download image</div>
                    <div  className="hover:text-white">find  all page</div>
                    <div  className="hover:text-white">save prduct data</div>
                    <div  className="hover:text-white">save customer date</div>
                </div>
            </div>
        </div>
    )
}

export default Footer