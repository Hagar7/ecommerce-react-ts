import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { Product } from "../../Interfaces/productsInterface";

interface ProductProps {
  products: Product[];
}

const ProductsContainer: React.FC<ProductProps> = ({ products }) => {
  return (
    <div className="container">
      <div className="row my-5 gx-3">
        <h2 className="text-center main_clr">Trending Products</h2>
        {products.map((product) => (
          <div className="col-md-2 my-3" key={product._id}>
            <SingleProduct
              title={product.title}
              description={product.description}
              price={product.price}
              imageCover={product.imageCover}
              category={product.category}
              ratingsAverage={product.ratingsAverage}
              _id={product._id}
              productId={product._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsContainer;
