import { types } from "./ProductActionTypes";

export const ProductActionCreators = {
  setProducts: (products) => ({
    type: types.SET_PRODUCTS,
    payload: { products },
  }),
};
