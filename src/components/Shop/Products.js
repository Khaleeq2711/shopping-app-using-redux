import { useDispatch,useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { cartActions } from "../../store/cartSlice";
import { useState } from "react";

const ITEMS = [
  {
    id: "p1",
    title: "Samsung Galaxy S30",
    price: 2000,
    description: "Best Smart Phone of the year. -Amazing.",
  },
  {
    id: "p2",
    title: "Iphone 20",
    price: 3000,
    description: "Wanna Spend Money Try This Phone. -Amazing.",
  },
  {
    id: "p3",
    title: "Oppo Find X10",
    price: 1000,
    description: "Good for Finding X. Never Lose in Maths. -Amazing.",
  },
];
const Products = (props) => {
  const cart = useSelector((state) => state.cart);
  const [click,setClick] = useState('')
  const dispatch = useDispatch();
  const addHandler = (id,title,price) => {
    setClick(id);
    dispatch(
      cartActions.addItem({
        id,
        price,
        title,
      })
    );

  };
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {ITEMS.map((i) => {
          return (
            <ProductItem
            key={i.id}
            id={i.id}
              title={i.title}
              price={i.price}
              description={i.description}
              onClick={() => addHandler(i.id,i.title,i.price)}
              btnText={cart.api_call_loader && i.id === click ? '0' : 'Add to Card'}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
