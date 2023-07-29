import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginForm = ({ promptAsync }) => {
  return (
    <View
      style={{ height: "100%", width: 250 }}
      className="items-center justify-center space-y-4"
    >
      <Image
        source={require("../../assets/logo/firebeats-logo.png")}
        style={{ height: 100, width: 150 }}
      />
      <Text className="text-center">
        Make use of our Aritifical Intelligence to track your health
      </Text>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => promptAsync()}
        className="p-5 bg-orange-500 rounded-lg flex-row items-center justify-center space-x-2"
      >
        <FontAwesomeIcon icon={faGoogle} color="#FFFFFF" />
        <Text className="text-white font-bold text-center">
          Sign In with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
