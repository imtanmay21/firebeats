import { View, Text, Image } from "react-native";
import React from "react";

const OrderCard = ({ data }) => {
  return (
    <View>
      <View className="flex-row space-x-2 py-5 mb-3">
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
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
