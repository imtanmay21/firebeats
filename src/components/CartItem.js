import { View, Text, Image, TouchableOpacity, Touchable } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "react-native-heroicons/outline";
import { UserActionCreators } from "../reducers/UserReducer/UserActionCreators";

const CartItem = ({ id, data }) => {
  const userInfo = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();

  const removeItem = () => {
    const userId = userInfo.id;
    const productData = {
      id: id,
      data: data
    }
    dispatch(UserActionCreators.removeItemFromCart(userId, productData));
  };

  return (
    <View className="px-6">
      <View className="flex-row space-x-2 bg-white p-5 mb-3 rounded-lg shadow-lg">
        <Image
          source={{ uri: data.imgURL }}
          style={{ height: 100, width: 100 }}
          resizeMode="contain"
        />
        <View className="flex-1 flex-row justify-between items-center">
          {/* Item content */}
          <View className="space-y-1">
            <Text className="text-lg font-bold">{data.name}</Text>
            <View className="flex-row items-center">
              {/* Color */}
              <Text className="">Color </Text>
              <View className="flex-row items-center">
                <View
                  className="h-5 w-5 rounded-full mr-4"
                  style={{ backgroundColor: data.colorSelected.colorCode }}
                ></View>
              </View>

              {/* Size */}
              <View className="flex-row items-center">
                <Text className="">Size </Text>
                <View className="items-center justify-center">
                  <Text>{data.sizeSelected.sizeName}</Text>
                </View>
              </View>
            </View>

            {/* Price */}
            <View>
              <Text className="text-lg font-bold">
                ${(100 - data.discount) * 0.01 * data.stockPrice}
              </Text>
            </View>
          </View>
          {/* Remove Button */}
          <TouchableOpacity
            onPress={removeItem}
            className="bg-gray-200 rounded-full h-10 w-10 justify-center items-center"
          >
            <TrashIcon color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
