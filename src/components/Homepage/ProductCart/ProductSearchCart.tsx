import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import ModalUser from "../../../Extra/Modal/Modal";
import { Product } from "../../../services/cartService/cart-response.interface";
import { useState, useEffect } from "react";
import { makeDiscount } from "./ProductCart";

type Props = {
    products: Product[] | undefined,
    modalActive: boolean,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductSearchCart = ({ products, modalActive, setModalActive }: Props) => {

    const [othersMessage, setOthersMessage] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    let onSeeMore = () => {
        const params = searchParams.get("search")?.trim();
        if (params) {
            navigate("/products/result?searchResult=" + params);
        }
    }

    useEffect(() => {
        if (products && products.length > 3) {
            setOthersMessage(true);
        }
    }, [products])

    return (
        <ModalUser active={modalActive} setModalActive={setModalActive}>
            {products && products.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-2">
                        {products.map((item, index) => (
                            <div>
                                {index < 3 && (
                                    <div key={item.id} className="flex flex-col justify-between max-w-[120px] md:max-w-[220px] h-full bg-white sm:border border-gray-200 sm:rounded-lg shadow">
                                        <NavLink onClick={() => setModalActive(false)} to={`/products/${item.id}`}>
                                            <div>
                                                <img className="m-auto p-2 rounded-t-lg w-auto max-h-32 md:h-32" src={item.thumbnail} alt="product" />
                                                <div className="px-2 pb-2">
                                                    <h5 className="text-md md:text-xl font-semibold tracking-tight">{item.title}</h5>
                                                </div>
                                                <div className="px-2 pb-2">
                                                    <span className="text-sm font-semibold text-gray-500">{item.brand}</span>
                                                </div>
                                            </div>
                                        </NavLink>


                                        <div className="flex items-center justify-start px-2 pb-2">
                                            <span className="text-sm md:text-lg font-medium text-gray-500 line-through mr-2">{item.price}</span>
                                            <span className="text-sm md:text-2xl font-bold text-gray-900">{makeDiscount(item.price, item.discountPercentage)}$</span>
                                        </div>

                                    </div>
                                )
                                }
                            </div>
                        ))}
                    </div>

                    {othersMessage &&
                        <div className="flex justify-center cursor-pointer text-lg max-w-[120px] md:max-w-[220px] m-auto bg-white sm:border border-gray-200 sm:rounded-lg shadow">
                            <div onClick={() => { setModalActive(false); onSeeMore() }} className="w-full h-full" >
                                <div className="text-center">
                                    See other
                                </div>
                            </div>
                        </div>
                    }
                </>
            ) : <div className="flex justify-center text-gray-400 text-md font-light px-8 py-5">Product does not exist</div>}
        </ModalUser>
    )
}

export default ProductSearchCart;