import React from "react";
import { Brand } from "../../Interfaces/productsInterface";
import style from "./OneProduct.module.scss";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import { useAppDispatch } from "../../Store/hooks";
import { addProductToCart } from "../../Store/CartSLice";
interface ProductProps {
  title: string | undefined;
  description: string | undefined;
  price: number | undefined;
  imageCover: string | undefined;
  category: Brand | undefined;
  ratingsAverage: number | undefined;
  _id: string | undefined;
  images: string[] | undefined;
}

const OneProduct: React.FC<ProductProps> = ({
  title,
  description,
  price,
  imageCover,
  category,
  ratingsAverage,
  images,
  _id,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="row py-5">
      <div className="col-md-5">
        <div className={`${style.Product_img}`}>
          <div className="Product_gallery">
            <Swiper
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              slidesPerView={1}
              navigation
            >
              {images?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="product_img "
                    style={{ backgroundImage: `url(${item})` }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="col-md-7 my-5 py-5">
        <div className={`${style.Product_info}`}>
          <div className={`${style.Product_price}`}>
            <h5 className="font-sm main_clr">{category?.name}</h5>
            <span className="btn">{price} EGP</span>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <span>
            <i className="fa fa-star"></i>
            {ratingsAverage}
          </span>
          <button
            className={`${style.product_btn} btn text-white w-100 my-5`}
            onClick={() => dispatch(addProductToCart(_id))}
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneProduct;
