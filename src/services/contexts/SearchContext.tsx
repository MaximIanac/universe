import { createContext, useContext } from "react"
import { Product } from "../cartService/cart-response.interface"

export type SearchProductContext = {
    searchProduct: Product[] | undefined,
    setSearchProduct: (c: Product[]) => void;
}

export const SearchContext = createContext<SearchProductContext>({
    searchProduct: undefined,
    setSearchProduct: () => {}
})

export const useSearchContext = () => useContext(SearchContext)