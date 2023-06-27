import { useParams } from "react-router-dom";
import Preloader from "../../../../Extra/Preloader";
import { Product, UpdateProductInterface } from "../../../../services/cartService/cart-response.interface";
import { deleteProduct, getProductByID, updateProduct } from "../../../../services/cartService/cartService";
import SingleProduct from "./SingleProduct";
import { useState, useEffect } from "react";



const SingleProductAPI = () => {

    const [singleProduct, setProduct] = useState<Product>();
    const [isLoaded, setLoading] = useState<boolean>(false);
    const { id } = useParams();

    const onUpdateProduct = (formData: UpdateProductInterface | undefined, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData?.id) {
            updateProduct(formData)
                .then( data => {
                    console.log(data);
                })
                .catch( er => {
                    console.log(er);
                })
        }
    }

    const onDeleteProduct = (id: number | undefined) => {
        if (id) {
            deleteProduct(id) 
                .then(data => {
                    console.log(data);
                })
        }
    }

    useEffect(() => {
        if (id) {
            setLoading(false);

            getProductByID(parseInt(id))
                .then( data => {
                    setProduct(data);
                    setLoading(true);
                })
        }
    }, [id]);

    return (
        <div>
            {isLoaded && singleProduct ? (
                <SingleProduct 
                    singleProduct={singleProduct} 
                    onUpdateProduct={onUpdateProduct}
                    onDeleteProduct={onDeleteProduct}
                />
            ) : (<Preloader/>)}
        </div>
    )
}

export default SingleProductAPI;