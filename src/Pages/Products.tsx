import CategoryList from "../Component/CategoryList/CategoryList";
import { useAppSelector } from "../Store/hooks";
import React from "react";
import style from "../styles/Products.module.scss";
import BrandList from "../Component/BrandList/BrandList";
import ProductsContainer from "../Component/ProductsContainer/ProductsContainer";

const Products = () => {
  const { productsFiltered } = useAppSelector((state) => state.product);

  return (
    <div className={`${style.mainContainer} container`}>
      <div className="row gy-5">
        <h3>Products</h3>
        <div className={`${style.filtered}`}>
          <CategoryList />
          <BrandList />
        </div>
        <div className="col-md-12">
          {productsFiltered?.length > 0 ? (
            <ProductsContainer products={productsFiltered} />
          ) : (
            <div className="main_bg alert alert-danger p-1">
              No Products Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
