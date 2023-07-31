import { types } from "./UserActionTypes";

const initialState = null;

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER: {
      const { userInfo } = action.payload;
      return {
        ...userInfo,
      };
    }

    case types.REMOVE_USER: {
      return null
    }

    case types.ADD_ITEM_WISHLIST: {
      const { productData } = action.payload;
      return {
        ...state,
        wishlist: [...state.wishlist, productData],
      };
    }

    case types.REMOVE_ITEM_WISHLIST: {
      const { productData } = action.payload;
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item.id !== productData.id),
      };
    }

    case types.ADD_ITEM_CART: {
      const { productData } = action.payload;
      return {
        ...state,
        cart: [...state.cart, productData],
      };
    }

    case types.REMOVE_ITEM_CART: {
      const { cartItems } = action.payload;
      return {
        ...state,
        cart: cartItems,
      };
    }

    default:
      return state;
  }
};
