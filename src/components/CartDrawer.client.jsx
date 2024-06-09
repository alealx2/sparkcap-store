import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import {
    useCart,
    CartLineProvider,
    Image,
    useCartLine,
    Money,
    Link,
    CartCost,
    CartLineQuantity,
    CartLineQuantityAdjustButton
} from '@shopify/hydrogen';

import CartBubble from "./CartBubble.client";


export default function CartDrawer({data}) {

    const { lines, checkoutUrl, status } = useCart();    
    const [open = false, setOpen] = useState(false)

    if(lines.length === 0) {
        // if(status == 'idle') {
            return (
                <Link to="/cart"  className="header-cart-link">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    <CartBubble />
                </Link>      
            )  
        // }
    }else{
        return (
            <>
        
            <span onClick={() => setOpen(true)}  className="header-cart-link">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <CartBubble />
            </span>
        
            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
        
                <div className="fixed inset-0 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                              <div className="flex items-start justify-between">
                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                <div className="ml-3 flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                  </button>
                                </div>
                              </div>
        
                              <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {lines.map(line => {
                                            return (
                                                <CartLineProvider key={line.id} line={line} >
                                                    <CartDrawerItem />
                                                </CartLineProvider>
                                            )
                                        })}
                                    </ul>
                                </div>
                              </div>
                            </div>
        
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <CartCost withoutTrailingZeros />                        
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                              <div className="mt-6">
                                <a
                                  href={checkoutUrl}
                                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                  Checkout
                                </a>
                              </div>
                              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                  or{' '}
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
            </>
        )
    }


}

function CartDrawerItem(){

    const { lineId, merchandise, cost, line } = useCartLine();
    const { image, product, selectedOptions } = merchandise

    const imgAlttext = image.altText != null ? image.altText : product.title;

    return(
            <li key={lineId} line={line} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                
                <Image  
                    className="h-full w-full object-cover object-center" 
                    alt={imgAlttext}
                    data={image} 
                />

                </div>

                <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                    <Link to={`/products/${product.handle}`}>
                        {product.title} 
                    </Link>                       
                    </h3>

                    <CartLineQuantityAdjustButton as="div" className='cart-remove' adjust='remove'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </CartLineQuantityAdjustButton>

                    </div>

                    {(selectedOptions || []).map(option => (
                        <p className="mt-1 text-sm text-gray-500" key={option.name}>{option.name}: {option.value}</p>
                    ))}

                </div>
                <div className="flex flex-1 items-end justify-between text-sm">

                    <div className="cart-quantity-selector">
                        <CartLineQuantityAdjustButton adjust="decrease">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>
                        </CartLineQuantityAdjustButton>
                        <CartLineQuantity />
                        <CartLineQuantityAdjustButton adjust="increase">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </CartLineQuantityAdjustButton>
                    </div>
                    
                    <div className="flex">
                      <Money className="ml-4 font-medium" withoutTrailingZeros data={merchandise.priceV2} />
                    </div>
                </div>
                </div>
            </li>            
    )
}