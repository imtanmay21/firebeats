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
      dispatch({type: types.REMOVE_USER})
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
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      cart: arrayUnion(productData),
    });
    dispatch({ type: types.ADD_ITEM_CART, payload: { productData } });
  },
  removeItemFromCart: (userId, productData) => async (dispatch) => {
    const userRef = doc(db, "users", userId);
    const userSnapshot = await getDoc(userRef);
    const cartItems = userSnapshot.data().cart;

    const indexToRemove = cartItems.findIndex(
      (item) => item.id === productData.id
    );
    if (indexToRemove !== -1) {
      cartItems.splice(indexToRemove, 1);
      await updateDoc(userRef, {
        cart: cartItems,
      });
    }
    dispatch({ type: types.REMOVE_ITEM_CART, payload: { cartItems } });
  },
};
