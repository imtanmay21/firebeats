import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import CartItem from "../components/CartItem";

const CartScreen = () => {
  const [total, setTotal] = useState(0);

  const userInfo = useSelector((state) => state.UserReducer);

  const navigation = useNavigation();

  useEffect(() => {
    let totalPrice = 0
    userInfo.cart.forEach((item) => {
      const price = (100 - item.data.discount) * item.data.stockPrice * 0.01;
      totalPrice += price;
    });
    setTotal(totalPrice)
  }, [userInfo]);

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
      {userInfo.cart.length === 0 ? (
        <View
          className="px-6 text-center items-center justify-center"
          style={{ height: "80%" }}
        >
          <Text className="text-lg text-gray-400">No items in cart</Text>
        </View>
      ) : (
        <ScrollView
          className="space-y-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
        >
          {userInfo.cart.map((item, index) => (
            <CartItem key={index} data={item.data} id={item.id} />
          ))}
        </ScrollView>
      )}

      {/* Subtotal */}
      <View className="px-6 mb-2 shadow-md">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold ">Subtotal</Text>
          <Text className="text-lg font-bold">{total}</Text>
        </View>
      </View>

      {/* Checkout Button */}
      <View className="px-6 mb-2">
        <TouchableOpacity
          disabled={userInfo.cart.length === 0}
          className={`bg-black p-5 rounded-lg ${
            userInfo.cart.length === 0 && "bg-gray-400"
          }`}
        >
          <Text className="text-lg font-bold text-white text-center">
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
