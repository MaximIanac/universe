import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Product } from "../../../../services/cartService/cart-response.interface";
import { addToCart, makeDiscount } from "../ProductCart";
import { useCartContext } from "../../../../services/contexts/CartContext";
import { Alert } from "flowbite-react";

type Props = {
    products: Product[] | undefined;
}

const ProductUI = ({ products }: Props) => {

    const { cart, setCart } = useCartContext();
    const [addAlert, setAddAlert] = useState<boolean>(false);

    return (
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {products?.map((item) => (
                <div key={item.id} className="flex flex-col justify-between border border-gray-200 rounded-lg shadow w-80 h-auto bg-white ">

                    <NavLink to={`/products/${item.id}`}>
                        <div>
                            <img className="m-auto p-4 w-auto h-56 border-gray-200 rounded-3xl" src={item.thumbnail} alt="product" />
                            <div className="px-4 pb-5">
                                <span className="text-base font-semibold text-black">{item.title}</span><br />
                                <span className="text-sm font-semibold text-gray-500">{item.brand}</span>
                            </div>
                        </div>
                    </NavLink>

                    <div>
                        <div className="flex items-center mt-2.5 mb-5 px-4">
                            <svg aria-hidden="true" className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mx-2 px-2.5 py-0.5 rounded">{item.rating}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 pb-5">
                            <div>
                                <span className="text-base font-semibold text-gray-500 line-through">{item.price}$</span>
                                <span className="text-2xl ml-2 font-bold text-gray-900">{makeDiscount(item.price, item.discountPercentage)}$</span>
                            </div>
                            <button
                                onClick={() => { addToCart(item, cart, setCart); setAddAlert(true); } }
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <div className={`${addAlert ? 'transition-opacity duration-300 ease-in-out transform scale-100' : 'duration-300 opacity-0 scale-0'} fixed right-2 bottom-4`}>
                <Alert
                    color="success"
                    onDismiss={() => { setAddAlert(false) }}
                >
                    <span className="font-medium">
                        Info! <span className="font-normal">You have added an item in your cart</span>
                    </span>
                </Alert>
            </div>
        </div>
    )
}

export default ProductUI;