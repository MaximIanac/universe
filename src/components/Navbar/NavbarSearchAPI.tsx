import { useState, useEffect } from "react";
import Navbar from "./Navbar"
import { searchProducts } from "../../services/cartService/cartService";
import { Product } from "../../services/cartService/cart-response.interface";
import ProductSearchCart from "../Homepage/ProductCart/ProductSearchCart";
import { useNavigate, useSearchParams } from "react-router-dom";

const NavbarSearchAPI = () => {

    const [products, setProducts] = useState<Product[]>();
    const [modalActive, setModalActive] = useState(false);
    const [isLoaded, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleSearch = (query: string) => {
        setLoading(false);

        if (query) {
            navigate(`/products?search=${query}`);
            setModalActive(true);

            searchProducts(query)
                .then((data) => {
                    setProducts(data);
                    setLoading(true);
                });
        } else {
            navigate("/products");
        }
    };

    useEffect(() => {
        const params = searchParams.get("search")?.trim();
        if (params) {
            handleSearch(params);
        }
    }, []);


    return (
        <div>
            <Navbar
                onSearch={handleSearch}
                setProducts={setProducts}
            />
            {isLoaded && (
                <ProductSearchCart
                    products={products}
                    modalActive={modalActive}
                    setModalActive={setModalActive}
                />
            )}
        </div>
    )
}

export default NavbarSearchAPI;