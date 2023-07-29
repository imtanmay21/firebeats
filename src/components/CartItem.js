import { View, Text, Image } from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/outline";

const CartItem = ({ data }) => {
  return (
    <View className="px-6">
      <View className="flex-row space-x-2 bg-white p-5 mb-3 rounded-lg shadow-lg">
        <View className="">
          <Image
            source={{ uri: data.imgURL }}
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
          />
        </View>

        {/* Item content */}
        <View>
          <View className="flex-1 flex-row">
            <Text className="text-lg font-bold">{data.name}</Text>
            <Text className=""><XMarkIcon /></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
