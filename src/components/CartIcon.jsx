import React from 'react'

function CartIcon({ setShoppingCart, state }) {
  return (
    <div className='flex items-center gap-x-2 fixed top-2 right-4'>
        <p className='hidden lg:block'>You have {state.length} {state.length === 1 ? 'item' : 'items'}</p>
        <p className='lg:hidden absolute top-0 right-0 w-6 h-6 text-x; bg-black text-white rounded-full flex items-center justify-center'>{state.length}</p>
        <div 
            className='bg-red-600 p-4 rounded-full cursor-pointer hover:bg-red-400 flex justify-center items-center' 
            onClick={() => setShoppingCart(true)}
        >
            <img 
                src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-royal-brites-poster-foam-board-photo-paper-royal-lace-19.png" 
                alt='cart'
                width={35} 
                height={35}
            />
        </div>
    </div>
  )
}

export default CartIcon