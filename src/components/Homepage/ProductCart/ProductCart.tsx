import React, { useState } from "react";
import { AddingProductInterface, Product } from "../../../services/cartService/cart-response.interface";
import { NavLink } from "react-router-dom";
import ProductModal from "./ProductModal/ProductModal";
import { useCartContext } from "../../../services/contexts/CartContext";
import ProductUI from "./ProductUI/ProductUI";

type Props = {
    products: Product[] | undefined,
    path: string,
    formData: AddingProductInterface,
    setFormData: React.Dispatch<React.SetStateAction<AddingProductInterface>>,
    onAddProduct: (e: React.FormEvent<HTMLFormElement>) => void
}

export const makeDiscount = (price: number | undefined, discount: number | undefined): number => {
    if (price && discount) {
        let result = price - (price / 100 * discount);
        return parseInt(result.toFixed(0));
    }
    return 0;
}

export const addToCart = (item: Product, cart: Product[] = [], setCart: (c: Product[]) => void) => {
    const existingItem = cart?.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        const updatedCart = cart?.map(cartItem => {
            if (cartItem.id === item.id) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                };
            }
            return cartItem;
        });
        setCart(updatedCart);
    } else {
        setCart([...cart, { ...item, quantity: 1 }]);
    }
};


const ProductCart = ({ products, setFormData, formData, onAddProduct }: Props) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const [modalActive, setModalActive] = useState(false);
    const { cart } = useCartContext();

    return (
        <div className="mt-8 relative w-auto">
            <button
                onClick={() => setModalActive(true)}
                className="fixed right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center"
                type="button"
            >
                Add Product
            </button>

            <ProductModal
                modalActive={modalActive}
                setModalActive={setModalActive}
                handleInputChange={handleInputChange}
                formData={formData}
                onAddProduct={onAddProduct}
            />

            {cart && cart?.length > 0 &&
                <NavLink to="/cart">
                    <button className="fixed right-2 mt-[48px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center">
                        <svg className="h-10" fill="none" stroke="white" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <span className={`absolute text-white text-center top-0 right-0 transform -translate-y-1/2 w-5 h-5 bg-blue-700 border-2 border-white rounded-full after:content-center`}>
                            <div className="absolute bottom-[-2px] left-[4px]">
                                {cart.length < 10 ? (cart.length) : ("..")}
                            </div>
                        </span>
                    </button>
                </NavLink>
            }

            <ProductUI 
                products={products}
            />
        </div>
    )
}

export default ProductCart;