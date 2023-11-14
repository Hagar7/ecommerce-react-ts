import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { getProductById } from "../Store/ProductsSlice";
import { useParams } from "react-router-dom";
import OneProduct from "../Component/OneProduct/OneProduct";

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const { product } = useAppSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductById(params._id));
  }, [dispatch, params._id]);
  return (
    <div className="container">
      <OneProduct
        category={product?.category}
        description={product?.description}
        price={product?.price}
        ratingsAverage={product?.ratingsAverage}
        imageCover={product?.imageCover}
        title={product?.title}
        images={product?.images}
        _id={product?._id}
      />
    </div>
  );
};

export default ProductDetail;
