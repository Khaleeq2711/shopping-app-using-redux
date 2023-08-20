import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartStore = useSelector((state) => state.cart);
  //PUT will overwrite..


  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartStore !== undefined ? (
          cartStore.items.map((i) => {
            return (
              <CartItem
                key={i.id}
                item={{
                  id: i.id,
                  title: i.title,
                  quantity: i.quantity,
                  total: i.totalPrice,
                  price: i.price,
                }}
              />
            );
          })
        ) : (
          <p>--Cart is Empty--</p>
        )}
      </ul>
    </Card>
  );
};

export default Cart;
