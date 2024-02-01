const InputCustomerId = () =>{
    return (
        <div className="  flex flex-col items-start justify-start gap-2 relative h-[70px]">
                        <input type="text" placeholder="name" className=" peer absolute top-5 left-0 rounded-md px-2 py-1  w-full text-[14px] outline-none cursor-pointer bg-slate-500/60 focus:bg-white transition-all focus:text-slate-900 "/>
                        <label className="peer-focus:text-white peer-focus:font-bold  peer-focus:drop-shadow-xl  absolute top-0 left-0 text-neutral-200 text-[15px]">Username</label>
                    </div>
    )
}

export default InputCustomerId