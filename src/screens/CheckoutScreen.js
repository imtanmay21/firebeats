import { useNavigation } from "@react-navigation/native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { UserActionCreators } from "../reducers/UserReducer/UserActionCreators";

const CheckoutScreen = () => {
  const userInfo = useSelector(state => state.UserReducer);

  const [total, setTotal] = useState(0);
  const [name, setName] = useState(userInfo.addressInfo.name);
  const [phone, setPhone] = useState(userInfo.addressInfo.phone);
  const [address, setAddress] = useState(userInfo.addressInfo.address);
  const [city, setCity] = useState(userInfo.addressInfo.city);
  const [state, setState] = useState(userInfo.addressInfo.state);

  const { confirmPayment, loading } = useConfirmPayment();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {

    let totalPrice = 0
    userInfo.cart.forEach((item) => {
      const price = (100 - item.data.discount) * item.data.stockPrice * 0.01;
      totalPrice += price;
    });
    setTotal(totalPrice)

  }, [])

  useEffect(() => {
    if (userInfo.isPaymentSuccesfull) {
      navigation.navigate("Home")
    }
  }, [userInfo])

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
    try {
      const amount = total
      const clientSecret = await fetchClientSecret(amount);
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
      });

      // Payment error
      if (error) {
        console.log("Payment confirmation error", error);
      } 
      
      // Payment succesfull
      else if (paymentIntent) {
        const userId = userInfo.id
        const paymentData = {
          addressInfo: {
            name: name,
            phone: phone,
            address: address,
            city: city,
            state: state
          },
          checkoutItems: userInfo.cart,
        }
        alert("Payment Succesful");
        dispatch(UserActionCreators.finishPayment(userId, paymentData))
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

      {/* Address views */}
      <View className="px-6">
        <View className="p-5 bg-white shadow-md rounded-lg space-y-4">
          <Text className="text-lg font-bold">Shipping Information</Text>

          {/* Name */}
          <View className="flex-row items-center space-x-2">
            <Text style={{ width: "17%" }}>Name</Text>
            <TextInput
              className="flex-1 border-2 border-gray-200 p-2 rounded-lg"
              placeholder="Enter name"
              value={name}
              onChangeText={(value) => setName(value)}
            />
          </View>
          <View className="flex-row items-center space-x-2">
            <Text style={{ width: "17%" }}>Phone</Text>
            <TextInput
              className="flex-1 border-2 border-gray-200 p-2 rounded-lg"
              placeholder="Enter phone number"
              keyboardType="numeric"
              maxLength={10}
              style={{ fontSize: 16 }}
              value={phone}
              onChangeText={(value) => setPhone(value)}
            />
          </View>
          <View className="flex-row items-center space-x-2">
            <Text style={{ width: "17%" }}>Address</Text>
            <TextInput
              className="flex-1 border-2 border-gray-200 p-2 rounded-lg"
              placeholder="Enter address"
              style={{ fontSize: 16 }}
              value={address}
              onChangeText={(value) => setAddress(value)}
            />
          </View>
          <View className="flex-row items-center space-x-2">
            <Text style={{ width: "17%" }}>City</Text>
            <TextInput
              className="flex-1 border-2 border-gray-200 p-2 rounded-lg"
              placeholder="Enter city"
              style={{ fontSize: 16 }}
              value={city}
              onChangeText={(value) => setCity(value)}
            />
          </View>
          <View className="flex-row items-center space-x-2">
            <Text style={{ width: "17%" }}>State</Text>
            <TextInput
              className="flex-1 border-2 border-gray-200 p-2 rounded-lg"
              placeholder="Enter state"
              style={{ fontSize: 16 }}
              value={state}
              onChangeText={(value) => setState(value)}
            />
          </View>
        </View>
      </View>

      {/* Card Fields for credit card */}
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
        <TouchableOpacity
          disabled={
            name.length === 0 ||
            phone.length === 0 ||
            address.length == 0 ||
            address === 0 ||
            city.length === 0 ||
            state.length === 0
          }
          className="bg-black p-5 rounded-lg shadow-md"
        >
          <Text
            onPress={buyItems}
            className="text-white text-lg font-bold text-center"
          >
            Buy ${total}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
