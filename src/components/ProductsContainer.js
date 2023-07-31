import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

import ProductCard from "./ProductCard";
import { ChevronDoubleDownIcon } from "react-native-heroicons/outline";

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);

  const [showOptions, setShowOptions] = useState(false);

  const options = [
    { name: "Increasing order by price" },
    { name: "Decreasing order by price" },
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
      const productsDisplayed = products;
      productsDisplayed.sort(
        (item1, item2) =>
          item1.data.discountedPrice - item2.data.discountedPrice
      );
      console.log(productsDisplayed);
      setProducts(productsDisplayed);
      setShowOptions(false);
    } else {
      const productsDisplayed = products;
      productsDisplayed.sort(
        (item1, item2) =>
          item2.data.discountedPrice - item1.data.discountedPrice
      );
      console.log(productsDisplayed);
      setProducts(productsDisplayed);
      setShowOptions(false);
    }
  };

  return (
    <View>
      <Text className="text-4xl font-extrabold mb-3 px-6">Today's Deals</Text>

      {/* Sorting */}
      <View className="px-6 mb-3 relative">
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          className="p-4 bg-white shadow-md rounded-lg  flex-row items-center justify-between"
        >
          <Text>Sort By</Text>
          <ChevronDoubleDownIcon size={20} color="#000000" />
        </TouchableOpacity>

        {/* Options */}
        {showOptions && (
          <View className="bg-white p-5 space-y-4">
            {options.map((option, index) => (
              <TouchableOpacity
                onPress={() => sortByOption(option)}
                key={index}
              >
                <Text>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {products.map((product) => (
        <ProductCard key={product.id} data={product.data} id={product.id} />
      ))}
    </View>
  );
};

export default ProductsContainer;
