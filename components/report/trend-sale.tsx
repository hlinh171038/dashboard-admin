"use client"

const TrendingSale =() =>{
    return (
        <div 
            className="col-span-4 bg-slate-600 rounded-md"
        >
            <div>
            <div 
                    className="capitalize "
                >
                    trending sale
                </div>
            <div>
            <Select
                onValueChange={(e) =>handlePushDate(e)}
            >
                <SelectTrigger className=" ">
                    Date in Week
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="thisweek">Rate In Week</SelectItem>
                    <SelectItem value="lastweek">Rate Last Week</SelectItem>
                
                </SelectContent>
            </Select>
            </div>
            </div>
            {/* chart */}
            <div>

            </div>
        </div>
    )
}

export default TrendingSale