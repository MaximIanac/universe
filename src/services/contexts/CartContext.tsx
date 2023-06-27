import { createContext, useContext } from "react"
import { Product } from "../cartService/cart-response.interface"

export type ShoppingCartContext = {
    cart: Product[] | undefined,
    setCart: (c: Product[]) => void;
}

export const CartContext = createContext<ShoppingCartContext>({
    cart: undefined,
    setCart: () => {},
})

export const useCartContext = () => useContext(CartContext)