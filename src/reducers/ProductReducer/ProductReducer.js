import { types } from "./ProductActionTypes";

const initialState = {
  products: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCTS: {
      const { products } = action.payload;
      return {
        ...state,
        products: products,
      };
    }

    case types.REMOVE_PRODUCTS: {
      return {
        products: [],
      };
    }

    default:
      return state;
  }
};
