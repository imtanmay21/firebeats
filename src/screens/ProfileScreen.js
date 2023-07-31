import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { UserActionCreators } from "../reducers/UserReducer/UserActionCreators";
import OrderCard from "../components/OrderCard";

const ProfileScreen = () => {
  const userInfo = useSelector((state) => state.UserReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutUser = () => {
    dispatch(UserActionCreators.removeUser());
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={{ height: "100%" }} className="bg-gray-200">
      <View className="p-5 flex-row items-center space-x-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color="#000000" />
        </TouchableOpacity>
        <Text className="text-4xl font-extrabold">Profile details</Text>
      </View>
      <View className="justify-center px-6">
        <View className="items-center">
          <Image
            source={{ uri: userInfo.photoURL }}
            style={{ height: 100, width: 100 }}
            className="rounded-lg mb-10"
          />
        </View>
        <View className="bg-white p-5 rounded-lg shadow-md mb-4">
          <Text className="text-xl font-bold">Profile Information</Text>
          <View className="flex-row items-center space-x-1">
            <Text className="text-lg font-bold">Name: </Text>
            <Text className="text-lg ">{userInfo.name}</Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Text className="text-lg font-bold">Email: </Text>
            <Text className="text-lg ">{userInfo.email}</Text>
          </View>
        </View>

        <View className="bg-white p-5 rounded-lg shadow-md mb-4">
          <Text className="text-xl font-bold">Your Orders</Text>
          <ScrollView style={{height: "40%"}} showsVerticalScrollIndicator={false}>
            {userInfo.orders ? (
              userInfo.orders.map((order, index) => <OrderCard key={index} data={order.data} />)
            ) : (
              <Text>No orders</Text>
            )}
          </ScrollView>
        </View>
      </View>
      <View className="px-6">
        <TouchableOpacity
          onPress={logoutUser}
          className="bg-black p-4 rounded-lg"
        >
          <Text className="text-white text-bold text-lg text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
