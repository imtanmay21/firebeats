import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

import ProductCard from "./ProductCard";
import DropDown from "./DropDown";

const ProductsContainer = () => {
  const [globalProducts, setGlobalProducts] = useState([]);

  // Declare products
  const [products, setProducts] = useState([]);

  // Declare options
  const sortOptions = [
    { name: "Increasing order by price" },
    { name: "Decreasing order by price" },
  ];

  // Declare brands
  const brands = [
    { name: "Apple" },
    { name: "Xiaomi" },
    { name: "Fitbit" },
    { name: "Reset" },
  ];

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
          // dispatch(ProductActionCreators.setProducts(fetchedProducts));
          setGlobalProducts(fetchedProducts);
          setProducts(fetchedProducts);
        }
      } catch (e) {
        alert(e.message);
      }
    };
    getDocuments();
  }, []);

  const sortByOption = (option) => {
    if (option.name === "Increasing order by price") {
      const productsDisplayed = [...products];
      productsDisplayed.sort(
        (item1, item2) =>
          item1.data.discountedPrice - item2.data.discountedPrice
      );
      console.log(productsDisplayed);
      setProducts(productsDisplayed);
    } else {
      const productsDisplayed = [...products];
      productsDisplayed.sort(
        (item1, item2) =>
          item2.data.discountedPrice - item1.data.discountedPrice
      );
      setProducts(productsDisplayed);
    }
  };

  const sortByBrand = (option) => {
    // If reset is chosen
    if (option.name === "Reset") {
      setProducts(globalProducts);
    } else {

      // Map products of the same brand
      const sortedProducts = globalProducts.filter(
        (product) => product.data.brand === option.name
      );
      setProducts(sortedProducts);
    }
  };

  return (
    <View>
      <Text className="text-4xl font-extrabold mb-3 px-6">Today's Deals</Text>

      <View className="flex-row space-x-2 px-6">
        {/* Sorting by price */}
        <DropDown
          options={sortOptions}
          sort={sortByOption}
          label="Sort By Price"
        />

        {/* Sorting by Brand */}
        <DropDown options={brands} sort={sortByBrand} label="Sort By Brand" />
      </View>

      {products.map((product) => (
        <ProductCard key={product.id} data={product.data} id={product.id} />
      ))}
    </View>
  );
};

export default ProductsContainer;
