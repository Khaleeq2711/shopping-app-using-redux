import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    changed: false,
    totalQuantity: 0,
    api_call_loader: false,
    api_response: null,
    notification: null,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      console.log("sdsd");
    },
    addItem(state, action) {
      state.changed = true;
      state.totalQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: 1,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
      }
    },
    removeItem(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        const newItems = state.items.filter((item) => item.id !== id);
        state.items = [...newItems];
      } else {
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        existingItem.quantity--;
      }
      state.totalQuantity--;
      if (state.totalQuantity === 0) {
        state.cartVisibility = false;
      }
    },
    resetNotification(state) {
      state.notification = null
    }
  },
  extraReducers: (builder) => {
    //Get
    builder.addCase(get_to_cart.pending, (state) => {
      state.api_call_loader = true;
    });
    builder.addCase(get_to_cart.fulfilled, (state, { payload }) => {
      state.api_call_loader = false;

      if (payload === "Error While fetching data") {
        state.notification = {
          status: "error",
          title: "Error !",
          msg: "Something went Wrong while Fetching Data",
        };
      } else {
        console.log("payload  : ", payload);
        state.api_response = payload;
        state.items = payload != null ? payload.items : [];
        state.totalQuantity = payload !== null ? payload.totalQuantity : 0;
      }
    });
    builder.addCase(get_to_cart.rejected, (state) => {
      state.api_call_loader = false;
      console.log("Data base Error");
    });
    // Add
    builder.addCase(put_from_cart.pending, (state) => {
      state.api_call_loader = true;
    });
    builder.addCase(put_from_cart.fulfilled, (state, { payload }) => {
      state.api_call_loader = false;
      if (payload === "Error While fetching data") {
        state.notification = {
          status: "error",
          title: "Error !",
          msg: "Something went Wrong while Fetching Data",
        };
      } else {
        state.notification = {
          status: "success",
          title: "Success !",
          msg: "Item Saved to cart Successfuly.",
        };
      }
      // const newTimeoutId = setInterval(() => {
      //   // setMessage('Timeout done after 3 seconds.');
      //   state.notification = null
      // }, 3000);
      // clearInterval(newTimeoutId)
    });
    builder.addCase(put_from_cart.rejected, (state) => {
      state.api_call_loader = false;
    });
  },
});
export const cartActions = CartSlice.actions;

export const get_to_cart = createAsyncThunk("getToCart", async () => {
  try {
    const response = await fetch(
      "https://react-http-testing-f9590-default-rtdb.firebaseio.com/shopping-cart.json"
    );
    // .then((res) => res.json()).catch((error) => error);
    if (!response.ok) {
      throw new Error("Error While fetching data");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    // debugger;
    return "Error While fetching data";
  }
});

export const put_from_cart = createAsyncThunk("putFromCart", async (cart) => {
  try {
    const response = await fetch(
      "https://react-http-testing-f9590-default-rtdb.firebaseio.com/shopping-cart.json",
      {
        method: "PUT",
        body: JSON.stringify(cart),
      }
    );
    if (!response.ok) {
      throw new Error("Error while Fetching Data");
    }
    const responseData = await response.json();
  } catch (error) {
    // debugger;
    return "Error While fetching data";
  }
});

/////////////////////////Action Creator THUNK...Like a Function ...return function
// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     // await dispatch(uiActions.showNotification());
//     // const sendData = async () => {
//     //   const response = await fetch(
//     //     "https://react-http-testing-f9590-default-rtdb.firebaseio.com/shopping-cart.json",
//     //     {
//     //       method: "PUT",
//     //       body: JSON.stringify(cart),
//     //     }
//     //   );
//     //   if (!response.ok) {
//     //     throw new Error("Error while Fetching Data");
//     //   }
//     //   const responseData = await response.json();
//     await dispatch(uiActions.showNotification());
//   };

//   sendData().catch((error) => {
//     dispatch(
//       uiActions.showNotification({
//         status: "error",
//         title: "Error !",
//         msg: "Something went Wrong",
//       })
//     );
//   });
// };

// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://react-http-testing-f9590-default-rtdb.firebaseio.com/shopping-cart.json"
//       );
//       if (!response.ok) {
//         throw new Error("Error While fetching data");
//       }
//       const data = await response.json();
//       return data;
//     };

//     const myCart = await fetchData().catch((e) => {
//       // dispatch(
//       //   uiActions.showNotification({
//       //     status: "error",
//       //     title: "Error !",
//       //     msg: "Something went Wrong while Fetching Data",
//       //   })
//       // );
//     });
//     // dispatch(
//     //   cartActions.replaceCart({
//     //     items: myCart!==null ? myCart.items : [],
//     //     totalQuantity: myCart!==null ? myCart.totalQuantity: 0,
//     //   })
//     // );
//   };
// };

export default CartSlice;
