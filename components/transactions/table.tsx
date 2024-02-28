"use client"



const Table = () => {
    return (
        <table className="text-neutral-200 w-full text-[15px]">
            <tr>
                <td>
                    User
                </td>
                <td>
                    Payment
                </td>
                <td>
                    Date
                </td>
                <td>
                    Time
                </td>
                <td>
                    Quantity
                </td>
                <td>status</td>
                <td>
                    Total Price
                </td>
            </tr>
            {}
        </table>
    )
}

export default Table