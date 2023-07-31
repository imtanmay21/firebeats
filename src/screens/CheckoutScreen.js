import { useNavigation } from "@react-navigation/native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutScreen = () => {
  const { confirmPayment, loading } = useConfirmPayment();

  const navigation = useNavigation();

  const fetchClientSecret = async (amount) => {
    try {
      const response = await fetch("http://localhost:3000/payments/intents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      return data.paymentIntent;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      // Handle error, e.g., show an error message to the user
      return null;
    }
  };

  const buyItems = async () => {
    const amount = 1000;
    try {
      const clientSecret = await fetchClientSecret(amount);
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
      });
      if (error) {
        console.log("Payment confirmation error", error);
      } else if (paymentIntent) {
        console.log("Success from promise", paymentIntent);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <SafeAreaView style={{ height: "100%" }} className="py-5 bg-gray-200">
      <View className="flex-row items-center space-x-2 px-6 mb-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-4xl font-extrabold">Checkout</Text>
      </View>

      <View className="px-6 space-y-2">
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={{
            backgroundColor: "#FFFFFF",
            textColor: "#000000",
          }}
          style={{
            width: "100%",
            height: 50,
            marginVertical: 30,
          }}
        />

        {/* Buy Button */}
        <TouchableOpacity className="bg-black p-5 rounded-lg shadow-md">
          <Text
            onPress={buyItems}
            className="text-white text-lg font-bold text-center"
          >
            Buy
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
