import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "../components/ProductCard";

const WishlistScreen = () => {
  const userInfo = useSelector((state) => state.UserReducer);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: "100%" }} className="bg-gray-200 py-3">
      <View className="flex-row items-center space-x-4 mb-4 px-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-4xl font-extrabold">Wishlist</Text>
      </View>
      {userInfo.wishlist.length === 0 ? (
        <View
          className="items-center justify-center"
          style={{ height: "100%" }}
        >
          <Text className="text-gray-400 text-lg">No items added</Text>
        </View>
      ) : (
        <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
          {userInfo.wishlist.map((item) => (
            <ProductCard key={item.id} id={item.id} data={item.data} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default WishlistScreen;
