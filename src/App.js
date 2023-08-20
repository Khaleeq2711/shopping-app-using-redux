import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { put_from_cart, get_to_cart, cartActions } from "./store/cartSlice";

function App() {
  const [isInitial, setIsInitial] = useState(true);

  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
      return;
    }
    if (cart.changed) {
      dispatch(
        put_from_cart({ items: cart.items, totalQuantity: cart.totalQuantity })
      );
    }
  }, [cart.items, cart.totalQuantity, dispatch]);

  useEffect(() => {
    dispatch(get_to_cart());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(cartActions.resetNotification());
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [cart.notification]);
  return (
    <>
      {cart.notification !== null ? (
        cart.notification.status === "success" ||
        cart.notification.status === "error" ? (
          <Notification
            status={cart.notification.status}
            title={cart.notification.title}
            msg={cart.notification.msg}
          />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <Layout>
        {ui.cartVisibility && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
