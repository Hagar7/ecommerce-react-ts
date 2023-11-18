import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Store/hooks";
import { getUserCart, removeItem } from "../Store/CartSLice";
import style from "../styles/cart.module.scss";

const Cart = () => {
  const { cart } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  return (
    <div className="container">
      <div className={`${style.cart_container}`}>
        <h2>Cart</h2>
        <button className={`${style.btn_info} btn`}>
            Total Price :  {cart?.data.totalCartPrice} EGP
            </button>
        {cart?.data.products.map((product) => (
          <div className={`${style.cart_box}`} key={product._id}>
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-6">
                <div className={`${style.cart_img}`}>
                  <img
                    src={product.product.imageCover}
                    alt={product.product.title}
                  />
                  <button className="btn p-0 m-0" onClick={()=>dispatch(removeItem(product.product._id))}>
                    <i className="fa-regular fa-trash-can text-main"></i> Remove
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <div className={`${style.cart_info}`}>
                  <h4>{product.product.title}</h4>
                  <span>{product.price} EGP</span>
                  <div className={`${style.cart_quantity}`}>
                  <button className="btn btn-sm">+</button>
                  <span className="mx-2 my-2">{product.count}</span>
                  <button className="btn border-main btn-sm">-</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={`${style.cart_btns} `}>
          <div className={`${style.btn_price}`}>
            <button className={`${style.btn_info} btn`}>
            Clear All items
            </button>
          </div>
          <div className={`${style.btn_check}`}>
            <button className={`${style.btn_check_info} btn btn-danger`}>
            Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
