import React, { useEffect, useState } from 'react'

function ShoppingCart({state, dispatch, setShoppingCart}) {
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        setTotalPrice(state.reduce((total, item) => total + item.totalPrice, 0))
    }, [state])

    return(
        <div className='fixed right-0 top-0 lg:w-[30%] h-screen z-10 bg-gray-300 shadow-md flex flex-col justify-between p-2'>
                    <p className='absolute to-2 right-2 font-bold text-3xl cursor-pointer' onClick={() => setShoppingCart(false)}>X</p>
                    <div className='mt-10 h-[90vh] overflow-y-scroll'>
                        <div className='flex justify-between p-2 italic text-gray-400 border-b-[1px] border-gray-400'>
                            <p className='w-[40%]'>Item name</p>
                            <p className='w-[15%] text-center'>qty</p>
                            <p className='w-1/5 text-center'>unit price</p>
                            <p className='w-1/4 text-center'>total price</p>
                            <p className='w-4'></p>
                        </div>
                        {
                            state.map((item, i) => (
                                <div key={i} className={`flex justify-between items-center p-2 ${i === state.length - 1 ? '' : 'border-b-[1px]'} border-gray-400 text-gray-500`}>
                                    <p className='capitalize w-[40%]'>{item.itemName}</p>
                                    <input 
                                        type="number" 
                                        value={item.quantity} 
                                        min={1}
                                        onChange={e => dispatch({type: 'UPDATE_QTY', itemName: item.itemName, newQty: e.target.value})} 
                                        className='w-[15%] text-center relative left-[4px] bg-transparent border-2 border-black rounded'
                                        />
                                    <p className='w-1/5 text-center'>{item?.price}$</p>
                                    <p className='w-1/4 text-center'>{item?.totalPrice}$</p>
                                    <img 
                                        className='cursor-pointer w-4 h-5' 
                                        src="https://static.vecteezy.com/system/resources/previews/021/352/964/original/trash-icon-recycle-and-trash-sign-symbol-icon-free-png.png"
                                        alt='remove item'
                                        onClick={() => dispatch({ type: 'REMOVE_ITEM', itemName:item.itemName, quantity: item.quantity, price: item.price})}
                                        />
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex justify-between mt-2 font-bold mb-2 border-t-2 border-black'>
                        <p>Total:</p>
                        <p>${totalPrice}</p>
                    </div>
                </div>
    )
}

export default ShoppingCart