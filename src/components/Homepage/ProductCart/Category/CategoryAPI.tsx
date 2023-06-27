import { AddingProductInterface, Product } from "../../../../services/cartService/cart-response.interface";
import { useState, useEffect } from "react";
import { addProduct, getProducts, getProductsByCategory } from "../../../../services/cartService/cartService";
import ProductCart from "../ProductCart";
import Preloader from "../../../../Extra/Preloader";

type Props = {
    categoryProps: string | undefined,
    path: string,
}

const CategoryAPI = ({ categoryProps, path }: Props) => {

    const [products, setProducts] = useState<Product[]>();
    const [category, setCategory] = useState<string>("");
    const [isLoaded, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<AddingProductInterface>({
        title: "",
        brand: "",
        price: 0,
        discountPercentage: 0,
        category: "",
        thumbnail: "",
        description: "",
    })

    const onAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData) {
            addProduct(formData)
                .then(response => {
                    console.log(response);
                })
        }
    }

    useEffect(() => {
        if (categoryProps) {
            setCategory(categoryProps);
        }
    }, [categoryProps]);

    useEffect(() => {
        setLoading(false);

        if (categoryProps !== undefined && categoryProps !== null) {
            if (category) {
            getProductsByCategory({ category })
                .then((data) => {
                    setProducts(data);
                    setLoading(true);
                });
            }
        } else {
            getProducts()
                .then((data) => {
                    setProducts(data);
                    setLoading(true);
                });
        }
    }, [category, categoryProps]);

    return (
        <div>
            {isLoaded ? (
                <ProductCart
                    path={path}
                    products={products}
                    formData={formData}
                    setFormData={setFormData}
                    onAddProduct={onAddProduct}
                />
            ) : (<Preloader />)
            }
        </div>
    )
}

export default CategoryAPI;