import { useNavigation } from "@react-navigation/native";
import {
  CardField,
  StripeProvider,
  usePaymentSheet,
} from "@stripe/stripe-react-native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const CheckoutScreen = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const navigation = useNavigation();

  const handleCardNumberChange = (input) => {
    // Remove any non-numeric characters from the input
    const cleanedInput = input.replace(/\D/g, "");

    // Insert a space after every 4 digits to format the card number
    const formattedCardNumber = cleanedInput.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(formattedCardNumber);
  };

  const handleCardHolderChange = (input) => {
    setCardHolder(input);
  };

  const handleExpirationDateChange = (input) => {
    // Remove any non-numeric characters from the input
    const cleanedInput = input.replace(/\D/g, "");

    // Format the expiration date as MM/YY
    const formattedExpirationDate = cleanedInput.replace(
      /^(\d{2})(\d{0,2})/,
      (_, month, year) => (year ? `${month}/${year}` : month)
    );

    setExpirationDate(formattedExpirationDate);
  };

  const handleCVVChange = (input) => {
    // Restrict input to digits only
    const formattedCVV = input.replace(/\D/g, "");
    setCVV(formattedCVV);
  };

  const buyItems = () => {
    console.log("buying items");
  };

  return (
    <StripeProvider publishableKey="pk_test_51NZoYlSCPhEk3WEAU77tUaf5WQfoEaxE4vgglEBN7LmvQJ7bRsGra3y8FnjcPBktD5aRZ4r21uhuS356Yu4O5MoL0061fD8NVV">
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
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
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
    </StripeProvider>
  );
};

export default CheckoutScreen;
