import React from "react";
import style from "./SingleProduct.module.scss";
import { Brand } from "../../Interfaces/productsInterface";

interface ProductInterface {
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category: Brand;
  ratingsAverage: number;
}

const SingleProduct: React.FC<ProductInterface> = ({
  title,
  description,
  price,
  imageCover,
  ratingsAverage,
  category,
}) => {
  return (
    <div className={`${style.product_box}`}>
      <img src={imageCover} alt="title" />
      <h2 className="h6 font-sm">{category.name}</h2>
      <h3 className="h6 ">{title.split(" ").splice(0, 2).join(" ")}</h3>
      <div className={`${style.product_price}`}>
        <h6 className="font-sm">{price} EGP</h6>
        <span>
          <i className="fa fa-star"></i>
          {ratingsAverage}
        </span>
      </div>
      <button className={`${style.product_btn} btn text-white w-100 my-2`}>
        {" "}
        + Add
      </button>
    </div>
  );
};

export default SingleProduct;
