import { useState, useEffect } from "react";
import ProductUI from "../ProductUI/ProductUI";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../../../../services/cartService/cartService";
import { Product } from "../../../../services/cartService/cart-response.interface";
import Preloader from "../../../../Extra/Preloader";

const SearchResult = () => {

    const [products, setProducts] = useState<Product[]>();
    const [isLoaded, setLoading] = useState<boolean>(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const params = searchParams.get("searchResult")?.trim();
        if (params) {

            searchProducts(params)
                .then((data) => {
                    setProducts(data);
                    setLoading(true);
                });
        }

    }, [searchParams]);

    return (
        <div className="my-8">
            {isLoaded ? (
                <ProductUI
                    products={products}
                />
            ) : (<Preloader />)
            }
        </div>

    )
}

export default SearchResult;