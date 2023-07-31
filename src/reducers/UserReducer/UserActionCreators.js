import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { types } from "./UserActionTypes";
import { auth } from "../../../firebase.config";
import { db } from "../../../firebase.config";

export const UserActionCreators = {
  setUser: (userInfo) => ({
    type: types.SET_USER,
    payload: { userInfo },
  }),

  removeUser: () => async (dispatch) => {
    try {
      dispatch({ type: types.REMOVE_USER });
      await signOut(auth);
    } catch (e) {
      alert(e.message);
    }
  },

  addItemToWishlist: (userId, productData) => async (dispatch) => {
    dispatch({ type: types.ADD_ITEM_WISHLIST, payload: { productData } });
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      wishlist: arrayUnion(productData),
    });
  },
  removeItemFromWishList: (userId, productData) => async (dispatch) => {
    dispatch({ type: types.REMOVE_ITEM_WISHLIST, payload: { productData } });
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      wishlist: arrayRemove(productData),
    });
  },

  addItemToCart: (userId, productData) => async (dispatch) => {
    dispatch(UserActionCreators.setLoading(true));
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      cart: arrayUnion(productData),
    });
    dispatch({ type: types.ADD_ITEM_CART, payload: { productData } });
    dispatch(UserActionCreators.setLoading(false));
  },

  removeItemFromCart: (userId, productData) => async (dispatch) => {
    dispatch(UserActionCreators.setLoading(true));
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);
    const cartItems = userSnapshot.data().cart;

    let indexToRemove;

    cartItems.forEach((item, index) => {
      if (item.id === productData.id) {
        indexToRemove = index;
      }
    });

    console.log(indexToRemove);
    if (indexToRemove !== -1) {
      cartItems.splice(indexToRemove, 1);
      await updateDoc(userRef, {
        cart: cartItems,
      });
    }
    dispatch({ type: types.REMOVE_ITEM_CART, payload: { cartItems } });
    dispatch(UserActionCreators.setLoading(false));
  },

  finishPayment: (userId, paymentData) => async (dispatch) => {
    const userRef = doc(db, "users", userId);
    dispatch({type: types.FINISH_PAYMENT, payload: {paymentData}})
    await updateDoc(userRef, {
      cart: [],
      orders: arrayUnion(...paymentData.checkoutItems),
      addressInfo: {
        name: paymentData.addressInfo.name,
        phone: paymentData.addressInfo.phone,
        address: paymentData.addressInfo.address,
        city: paymentData.addressInfo.city,
        state: paymentData.addressInfo.state,
      },
    });
  },

  setLoading: (isLoading) => ({
    type: types.SET_CART_LOADING,
    payload: { isLoading },
  }),

  setPaymentStatus: (isPaymentSuccesful) => ({
    type: types.SET_PAYMENT_STATUS,
    payload: {isPaymentSuccesful}
  }) 
};
