import React from "react";
import style from "./SingleProduct.module.scss";
import { Brand } from "../../Interfaces/productsInterface";
import { Link } from "react-router-dom";

interface ProductInterface {
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category: Brand;
  ratingsAverage: number;
  _id:string
}

const SingleProduct: React.FC<ProductInterface> = ({
  title,
  description,
  price,
  imageCover,
  ratingsAverage,
  category,
  _id

}) => {
  return (
    <div className={`${style.product_box}`}>
      <Link to={`product/${_id}`} style={{ textDecoration: "none" }}>
        <img src={imageCover} alt="title" />
      </Link>
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
