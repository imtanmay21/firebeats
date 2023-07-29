import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { types } from "./UserActionTypes";
import { db } from "../../../firebase.config";

export const UserActionCreators = {
  setUser: (userInfo) => ({
    type: types.SET_USER,
    payload: { userInfo },
  }),
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
    console.log(userRef);
    await updateDoc(userRef, {
      cart: arrayUnion(productData),
    });
    dispatch({ type: types.ADD_ITEM_CART, payload: { productData } });
  },
};
