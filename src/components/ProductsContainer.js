import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase.config";

import ProductCard from "./ProductCard";
import { ProductActionCreators } from "../reducers/ProductReducer/ProductActionCreators";

const ProductsContainer = () => {
  const { products } = useSelector((state) => state.ProductReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // Getting products
    const getDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        if (!querySnapshot.empty) {
          const fetchedProducts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          dispatch(ProductActionCreators.setProducts(fetchedProducts));
        }
      } catch (e) {
        alert(e.message);
      }
    };
    getDocuments();
  }, []);

  return (
    <View>
      <Text className="text-4xl font-extrabold mb-3">Today's Deals</Text>
      {products.map((product) => (
        <ProductCard key={product.id} data={product.data} id={product.id} />
      ))}
    </View>
  );
};

export default ProductsContainer;
