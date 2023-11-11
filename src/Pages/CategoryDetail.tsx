import React from "react";
import { useAppSelector } from "../Store/hooks";
import { useParams } from "react-router-dom";
import SingleProduct from "../Component/SingleProduct/SingleProduct";

const CategoryDetail = () => {
  let params = useParams();
  const { products } = useAppSelector((state) => state.product);
  let filteredProducts = products.filter(
    (product) => product.category._id === params._id
  );
  console.log(filteredProducts);

  return (
    <div className="container">
      <div className="row">
      

     
      
      {filteredProducts.length>0?
      filteredProducts.map((product) => (
          <div className="col-md-2" key={product._id}>
          <SingleProduct
            title={product.title}
            description={product.description}
            price={product.price}
            imageCover={product.imageCover}
            category={product.category}
            ratingsAverage={product.ratingsAverage}
          />
           </div>
      )):
      <div className="d-flex justify-content-center align-items-center w-100">

      <div className="alert alert-danger p-1 d-flex justify-content-center align-items-center">No Products Found</div></div>}
      </div>
   
    </div>
  );
};

export default CategoryDetail;
