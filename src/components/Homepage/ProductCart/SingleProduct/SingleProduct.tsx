import { useState } from "react";
import { Product, UpdateProductInterface } from "../../../../services/cartService/cart-response.interface";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SingleProductSlider from "./SingleProductSlider";
import { addToCart, makeDiscount } from "../ProductCart";
import UpdateModal from "../ProductModal/UpdateModal";
import DeleteModal from "../ProductModal/DeleteModal";
import { Toast } from "flowbite-react";
import { useCartContext } from "../../../../services/contexts/CartContext";

type Props = {
    singleProduct: Product,
    onUpdateProduct: (formData: UpdateProductInterface | undefined, e: React.FormEvent<HTMLFormElement>) => void,
    onDeleteProduct: (id: number | undefined) => void
}

const SingleProduct = ({ singleProduct, onUpdateProduct, onDeleteProduct }: Props) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevSingleProduct) => ({
            ...prevSingleProduct,
            [name]: prevSingleProduct ? value : '',
        }));
    };

    const [modalActive, setModalActive] = useState(false);
    const [deleteActive, setModalDeleteActive] = useState(false);
    const [isShowDeletingMessage, setShowingDeletingMessage] = useState(false);
    const [formData, setFormData] = useState<UpdateProductInterface>({
        id: singleProduct?.id,
        title: singleProduct?.title,
        brand: singleProduct?.brand,
        price: singleProduct?.price,
        discountPercentage: singleProduct?.discountPercentage,
        category: singleProduct?.category,
        thumbnail: singleProduct?.thumbnail,
        description: singleProduct?.description,
    })

    const { cart, setCart } = useCartContext();
    console.log(cart);

    return (
        <div className="my-12 w-full m-auto">

            <button onClick={() => setModalActive(true)} className="fixed text-xs bottom-20 bg-orange-700 opacity-50 hover:opacity-80 duration-200 text-white font-medium py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                UPDATE
            </button>

            <UpdateModal
                modalActive={modalActive}
                setModalActive={setModalActive}
                onUpdateProduct={onUpdateProduct}
                formData={formData}
                handleInputChange={handleInputChange}
            />

            <button onClick={() => setModalDeleteActive(true)} className="fixed text-xs bottom-10 bg-red-700 opacity-50 hover:opacity-80 duration-200 text-white font-medium py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                DELETE
            </button>

            <DeleteModal
                singleProduct={singleProduct}
                deleteActive={deleteActive}
                setModalDeleteActive={setModalDeleteActive}
                onDeleteProduct={onDeleteProduct}
                setShowingDeletingMessage={setShowingDeletingMessage}
            />

            {isShowDeletingMessage && <div className="fixed bottom-5 right-5">
            <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <svg onClick={() => setModalDeleteActive(false)} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        Item has been deleted.
                    </div>
                <Toast.Toggle />
            </Toast></div>}

                <div className="flex-wrap xl:flex lg:flex-nowrap justify-center font-sans w-full xl:w-full m-auto">
                    <div className="h-auto w-auto md:w-[700px]">
                        <SingleProductSlider singleProduct={singleProduct} />
                    </div>
                    <div className="mt-8 md:mt-0 w-auto max-w-md m-auto md:w-full">
                        <div className="flex justify-between md:text-xl">
                            <div>
                                <div className="text-base font-semibold text-gray-500">{singleProduct?.brand}</div>
                                <div className="font-bold">{singleProduct?.title}</div>
                            </div>
                            <div>
                                <div className="text-base font-semibold text-gray-500 line-through">{singleProduct?.price}$</div>
                                <div className="font-bold text-gray-900">{makeDiscount(singleProduct?.price, singleProduct?.discountPercentage)}$</div>
                            </div>
                        </div>

                        <div className="flex items-center mt-2.5">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2 py-0.5 rounded">{singleProduct?.rating}</span>
                            <svg aria-hidden="true" className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>

                        <br />
                        <hr className="border-gray-600 opacity-50 rounded" />
                        <br />

                        <p className="mb-3 font-normal text-gray-700">{singleProduct?.description}</p>

                        <div className="mt-8 w-full">
                            <button 
                                onClick={() => {addToCart(singleProduct, cart, setCart)}}
                                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add to cart
                            </button>
                        </div>

                    </div>
                </div>
        </div>
    );
}

export default SingleProduct;