import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const cartstore = useSelector((state) => state.cart);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
    console.log(ui.cartVisibility);
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartstore.totalQuantity}</span>
    </button>
  );
};

export default CartButton;
