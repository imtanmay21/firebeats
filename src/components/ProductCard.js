import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import { HeartIcon as FilledHeartIcon } from "react-native-heroicons/solid";

import { useDispatch, useSelector } from "react-redux";
import { UserActionCreators } from "../reducers/UserReducer/UserActionCreators";

const ProductCard = ({ id, data }) => {
  // Declaring dispatch
  const dispatch = useDispatch();

  // Getting userinfo
  const userInfo = useSelector((state) => state.UserReducer);

  // Check if the details are shown or not
  const [detailsShown, setDetailsShown] = useState(false);

  // Color Selected
  const [colors, setColors] = useState([
    {
      colorName: "Black",
      colorCode: "#000000",
      isSelected: false,
    },
    {
      colorName: "Gray",
      colorCode: "#61677A",
      isSelected: true,
    },
    {
      colorName: "Blue",
      colorCode: "#1D5D9B",
      isSelected: false,
    },
    {
      colorName: "Peach",
      colorCode: "#FCBAAD",
      isSelected: false,
    },
  ]);

  // Size selected
  const [sizes, setSizes] = useState([
    { sizeName: "S", isSelected: false },
    { sizeName: "M", isSelected: true },
    { sizeName: "L", isSelected: false },
    { sizeName: "XL", isSelected: false },
  ]);

  const selectColor = (colorName) => {
    setColors((colors) =>
      colors.map((color) =>
        color.colorName === colorName
          ? { ...color, isSelected: true }
          : { ...color, isSelected: false }
      )
    );
  };

  const selectSize = (sizeName) => {
    setSizes((sizes) =>
      sizes.map((size) =>
        size.sizeName === sizeName
          ? { ...size, isSelected: true }
          : { ...size, isSelected: false }
      )
    );
  };

  // Add item to wishlist
  const addToWishList = () => {
    const productData = { id: id, data: data };
    const userId = userInfo.id;
    if (!userInfo.wishlist.some((item) => item.id === id)) {
      dispatch(UserActionCreators.addItemToWishlist(userId, productData));
    } else {
      dispatch(UserActionCreators.removeItemFromWishList(userId, productData));
    }
  };

  const addItem = () => {
    const productData = {
      id: id,
      data: {
        ...data,
        colorSelected: colors.find((color) => color.isSelected),
        sizeSelected: sizes.find((size) => size.isSelected),
      },
    };
    const userId = userInfo.id;
    dispatch(UserActionCreators.addItemToCart(userId, productData));
  };

  return (
    <View className="bg-gray-100 rounded-2xl shadow-sm p-10 mb-3 space-y-4 overflow-auto relative">
      {/* Image Container */}
      <View className="items-center">
        <Image
          source={{ uri: data.imgURL }}
          style={{ height: 280, width: 200 }}
          resizeMode="contain"
        />
      </View>

      {/* Fitness product with price */}
      <View>
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-lg">{data.name}</Text>
          <Text className="font-bold text-lg">${data.stockPrice}</Text>
        </View>

        {/* Details shown or not */}
        {!detailsShown ? (
          <TouchableOpacity
            onPress={() => setDetailsShown(true)}
            className="flex-row items-center"
          >
            <Text>See More</Text>
            <ChevronDownIcon size={20} color="#000000" />
          </TouchableOpacity>
        ) : (
          // If details are shown
          <View className="space-y-2">
            <Text>{data.description}</Text>
            <TouchableOpacity
              onPress={() => setDetailsShown(false)}
              className="flex-row items-center"
            >
              <Text>Hide Details</Text>
              <ChevronUpIcon size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Colors Section */}
      <View className="space-y-2">
        <Text className="font-bold">Colors Available</Text>
        <View className="flex-row space-x-2 items-center">
          {colors.map((color, index) => (
            <View
              key={index}
              className={`p-0.5 rounded-full border-transparent ${
                color.isSelected && "border-2 border-black"
              }`}
            >
              <TouchableOpacity
                onPress={() => selectColor(color.colorName)}
                className="h-5 w-5 rounded-full"
                style={{ backgroundColor: color.colorCode }}
              ></TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Sizes section */}
      <View className="space-y-2">
        <Text className="font-bold">Sizes Available</Text>
        <View className="flex-row space-x-2 items-center">
          {sizes.map((size, index) => (
            <View
              key={index}
              className={`p-0.5 rounded-full border-transparent ${
                size.isSelected && "border-2 border-black"
              }`}
            >
              <TouchableOpacity
                onPress={() => selectSize(size.sizeName)}
                className="h-10 w-10 items-center justify-center rounded-full bg-gray-200"
              >
                <Text>{size.sizeName}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Add item to cart button */}
      <View>
        <TouchableOpacity
          onPress={addItem}
          className="p-3 bg-black rounded-lg"
          style={{ width: "50%" }}
        >
          <Text className="text-lg font-bold text-gray-200 text-center">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>

      {/* Wishlist Button */}
      <TouchableOpacity
        onPress={addToWishList}
        className="absolute top-5 right-5 p-3 rounded-lg bg-gray-200"
      >
        {userInfo.wishlist &&
        userInfo.wishlist.some((item) => item.id === id) ? (
          <FilledHeartIcon color="#000000" />
        ) : (
          <HeartIcon color="#000000" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
