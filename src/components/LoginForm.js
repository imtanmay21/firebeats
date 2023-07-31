import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GlobeAltIcon } from "react-native-heroicons/outline";

const LoginForm = ({ promptAsync }) => {
  return (
    <View
      style={{ height: "100%" }}
      className="bg-gray-200 items-center justify-center space-y-4 px-6"
    >
      <View className="items-center space-y-2">
        <GlobeAltIcon color="#000000" size={100} />
        <Text className="text-5xl font-bold text-center">Firebeats</Text>
      </View>
      <View className="items-center space-y-5">
        <Text className="text-center text-xl">
          Make use of our Aritifical Intelligence to track your health
        </Text>
        <TouchableOpacity
          style={{ width: "100%" }}
          onPress={() => promptAsync()}
          className="p-5 bg-black rounded-lg flex-row items-center space-x-2"
        >
          <FontAwesomeIcon icon={faGoogle} color="#FFFFFF" />
          <Text className="text-white font-bold">Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
