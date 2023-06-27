import { useCartContext } from "../../../../services/contexts/CartContext";
import { makeDiscount } from "../ProductCart";
import { Product } from "../../../../services/cartService/cart-response.interface";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from 'react-icons/hi';
import { useState } from "react";

const ShoppingCart = () => {

    const [removeAlert, setRemoveAlert] = useState<boolean>(false);
    const { cart, setCart } = useCartContext();
    let total: number = 0;

    const removeCartItem = (index: number) => {
        if (Array.isArray(cart)) {
            let removedCart: Product[] = [...cart];
            removedCart.splice(index, 1);
            setCart(removedCart);
        }
    }

    const updateCartItem = (updatedItem: Product) => {
        if (Array.isArray(cart)) {
            const updatedCart: Product[] = [...cart];
            const itemIndex = updatedCart.findIndex((item) => item.id === updatedItem.id);

            updatedCart[itemIndex] = updatedItem;
            setCart(updatedCart);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            {cart && cart?.length > 0 ? (
                <div className="">
                    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3">
                            {cart?.map((item, index) => (
                                <div key={item.id} className="mb-6 rounded-lg bg-white p-6 shadow-md sm:h-44 sm:flex">
                                    <img src={item.thumbnail} alt="product" className="m-auto max-h-44 w-auto rounded-lg sm:m-0 sm:h-auto sm:w-44" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900">{item.title}</h2>
                                            <p className="mt-1 text-xs text-gray-700">{item.brand}</p>
                                        </div>

                                        <div className="mt-4 flex flex-wrap justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                            <div className="flex items-center border-gray-100">
                                                <span
                                                    onClick={() => {
                                                        if (item.quantity > 1) {
                                                            const updatedItem = { ...item, quantity: item.quantity - 1 };
                                                            updateCartItem(updatedItem);
                                                        }
                                                    }}
                                                    className="font-bold cursor-pointer rounded-l bg-gray-100 px-5 py-2 sm:py-1 sm:px-3.5 duration-100 hover:bg-blue-700 hover:text-blue-50"
                                                > - </span>
                                                <input
                                                    className="h-10 w-10 sm:h-8 sm:w-8 border-gray-100 bg-white text-center text-xl sm:text-lg font-medium outline-none p-0"
                                                    inputMode="numeric"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const value = parseInt(e.target.value);
                                                        if (!isNaN(value) && value >= 1) {
                                                            const updatedItem = { ...item, quantity: value };
                                                            updateCartItem(updatedItem);
                                                        }
                                                    }}
                                                    min="1"
                                                />
                                                <span
                                                    onClick={() => {
                                                        const updatedItem = { ...item, quantity: item.quantity + 1 };
                                                        updateCartItem(updatedItem);
                                                    }}
                                                    className="font-bold cursor-pointer rounded-r bg-gray-100 px-5 py-2 sm:py-1 sm:px-3.5 duration-100 hover:bg-blue-700 hover:text-blue-50"
                                                > + </span>
                                            </div>

                                            <div className="flex justify-end items-center space-x-4">
                                                <p className="text-xl sm:text-sm">{makeDiscount(item.price, item.discountPercentage)}$</p>
                                                <svg onClick={() => { removeCartItem(index); setRemoveAlert(true) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 xs:h-8 xs:w-8 sm:h-5 sm:w-5 cursor-pointer duration-150 hover:text-red-600">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                <div className={`${removeAlert ? 'transition-opacity duration-300 ease-in-out transform scale-100' : 'duration-300 opacity-0 scale-0'} fixed right-2 bottom-4`}>
                                                    <Alert
                                                        color="failure"
                                                        icon={HiInformationCircle}
                                                        onDismiss={() => { setRemoveAlert(false) }}
                                                    >
                                                        <span className="font-medium">
                                                            Info! <span className="font-normal">You have deleted an item in your cart</span>
                                                        </span>
                                                    </Alert>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>))}
                        </div>

                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            {cart?.map(item => {
                                const discountedPrice = makeDiscount(item.price, item.discountPercentage);
                                total += discountedPrice * item.quantity;

                                return (
                                    <div className="flex justify-between">
                                        <p className="text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis pr-4">{item.title}</p>
                                        <p className="text-gray-700 flex justify-end w-24">{makeDiscount(item.price, item.discountPercentage)}$ * {item.quantity}</p>
                                    </div>
                                )
                            })}
                            <hr className="my-4" />
                            <div className="flex justify-between">
                                <p className="text-lg font-bold">Total</p>
                                <p className="mb-1 text-lg font-bold">{total}$</p>
                            </div>
                            <button className="mt-6 w-full rounded-md bg-blue-700 py-1.5 font-medium text-blue-50 hover:bg-blue-800">Check out</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-8 h-56 bg-gray-100 w-96 m-auto font-medium flex items-center justify-center rounded-lg shadow-gray-300 shadow-xl text-3xl text-gray-400">There is nothing</div>
            )}
        </div>
    )
}

export default ShoppingCart;