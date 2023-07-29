import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import CartItem from "../components/CartItem";

const CartScreen = () => {
  const userInfo = useSelector((state) => state.UserReducer);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ height: "100%" }} className="bg-gray-200 py-6">
      {/* Header */}
      <View className="flex-row items-center space-x-4 mb-4 px-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-4xl font-extrabold">Cart</Text>
      </View>

      {/* Cart Items */}
      <ScrollView className="space-y-3" showsVerticalScrollIndicator={false}>
        {userInfo.cart.map((item) => (
          <CartItem key={item.id} data={item.data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
