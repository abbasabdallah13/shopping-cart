import React, { useReducer, useState } from 'react'
import ShoppingCart from './ShoppingCart';
import { items } from '../data/Items';
import toast from 'react-hot-toast';
import CartIcon from './CartIcon';

function ShoppingList() {
    const [shoppingCart, setShoppingCart] = useState(false)

    const cartState = [];

    const reducer = (state, action) => {
        switch(action.type){
            case 'ADD_ITEM':
                let newArr = []
                for(let i = 0; i<state.length; i++){
                    if(action.itemName === state[i].itemName){ //if the item already exists update its quantity in the state
                        newArr = state.map(item => item.itemName === action.itemName ? {...item, quantity: item.quantity + 1, price: item.price, totalPrice: item.price * (item.quantity + 1)} : item)
                    }
                }
                if(newArr.length === 0) 
                { //if the item does not exist add it to the cart
                    newArr = [...state, { itemName: action.itemName, quantity: 1, price: action.price, totalPrice: action.price }]
                }
                return newArr
            case 'REMOVE_ITEM':
                return state.filter(item => item.itemName !== action.itemName)
            case 'UPDATE_QTY':
                if(action.newQty > 0){
                    let newArr2 = []
                    for(let i = 0; i<state.length; i++){
                        if(action.itemName === state[i].itemName){ //if the item already exists update its quantity in the state
                            newArr2 = state.map(item => item.itemName === action.itemName ? {...item, quantity: action.newQty, price: item.price, totalPrice: item.price * action.newQty} : item)
                        }
                    }
                    return newArr2
                }else{
                    return state
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, cartState)
  
  return (
    <div className='p-2 lg:w-1/2'>
        <CartIcon setShoppingCart = {setShoppingCart} state={state} />
        <h1 className='text-2xl'>Shopping List</h1>
        <div>
        {
            items.map ((item, i) => (
                <div key={i} className='mt-10'>
                    <h1 className='text-xl font-semibold'>{item.category}</h1>
                    {
                        item.items.map((it, i) => (
                            <div key={i} className='flex justify-between items-center p-4 border-b-2'>
                                <p className='capitalize w-[40%]'>{it.itemName}</p>
                                <p>${it.price}</p>
                                <button 
                                    className='border-2 border-orange-500 p-[3px] lg:p-2 text-orange-500 hover:bg-orange-500 hover:text-white rounded-md w-20 text-[12px]' 
                                    onClick={() => { 
                                        dispatch({type: 'ADD_ITEM', itemName: it.itemName, price: it.price })
                                            toast.success(t => (
                                                <span className='capitalize'>{it.itemName} added to cart</span>
                                            ))
                                        }}
                                    >
                                      Add to cart
                                </button>
                            </div>
                        ))
                    }
                </div>
            ))
        }
        </div>
        {
            shoppingCart && (
                <ShoppingCart state={state} dispatch={dispatch} setShoppingCart={setShoppingCart} />
            )
        }

    </div>
  )
}

export default ShoppingList