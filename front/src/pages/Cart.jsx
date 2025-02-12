import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCartItemsCount,
  getCartTotal,
} from "../redux/slices/cartSlise";
import { orderApi } from "../components/utils/helpers/axiosInstance";
import CartItem from "../components/Main/CartItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemsCount = useSelector((state) => getCartItemsCount(state));
  const cartTotal = useSelector((state) => getCartTotal(state));
  const userId = useSelector((state) => state.auth.userId);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        items: cartItems.map((obj) => ({
          id: obj.item.id,
          name: obj.item.name,
          imageUrl: obj.item.imageUrl,
          sizes: [obj.item.size],
          types: [obj.item.type],
          price: obj.item.price,
          category: 0,
          rating: 0,
        })),
      };

      var response = await orderApi.post("", orderData);
      dispatch(clearCart());

      setToast({
        open: true,
        message: "Order placed successfully!",
        severity: "success",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error;
      console.error("Order failed:", errorMessage);

      setToast({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <div className="container" style={{ marginTop: "-30px" }}>
      <div className="cart">
        <div className="cart__top" style={{ marginBottom: "-40px" }}>
          <h2 className="content__title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cart
          </h2>
          <div className="cart__clear" onClick={handleClearCart}>
            <span>Clear the cart</span>
          </div>
        </div>
        <div className="content__items">
          {cartItems.map((obj, index) => (
            <CartItem
              key={`${obj.id}-${obj.size}-${obj.type}-${index}`}
              {...obj}
            />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Total items: <b>{cartItemsCount}</b>{" "}
            </span>
            <span>
              Total sum: <b>${cartTotal}</b>{" "}
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <span>Back</span>
            </Link>
            <div
              className={`button pay-btn ${
                !userId || cartItems.length === 0 ? "disabled" : ""
              }`}
              onClick={userId && cartItems.length > 0 ? handleOrder : null}
              style={{
                pointerEvents:
                  !userId || cartItems.length === 0 ? "none" : "auto",
                opacity: !userId || cartItems.length === 0 ? 0.5 : 1,
              }}
            >
              <span>Order</span>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
