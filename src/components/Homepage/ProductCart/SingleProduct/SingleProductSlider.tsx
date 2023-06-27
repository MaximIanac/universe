import Slider from "react-slick";
import { Product } from "../../../../services/cartService/cart-response.interface";

type Props = {
    singleProduct: Product | undefined
}

const SingleProductSlider = ({singleProduct}: Props) => {

    interface settingsInterface {
        dots: boolean,
        infinite: boolean
        speed: number,
        slidesToShow: number,
        slidesToScroll: number,
        initialSlide: number,
        adaptiveHeight: boolean,
        fade: boolean
    }

    const settings: settingsInterface = {
        fade: true,
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: false
    };

    let key = 0;

    return (
        <div className="m-auto md:h-auto md:w-6/12">
            <Slider {...settings}>
                {Array.isArray(singleProduct?.images) ? ( singleProduct?.images.map( item => (
                    <div key={key++} className="wrapper">
                        <img className="sliderImage" src={item} alt="slider" />
                    </div>
                ))) : (
                    <img src={singleProduct?.thumbnail} className="object-cover" alt="thumbnail" />
                )}
            </Slider>
        </div>
    )
}

export default SingleProductSlider;