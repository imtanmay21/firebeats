import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.config";

import { HeartIcon, ShoppingCartIcon } from "react-native-heroicons/outline";

import ProductsContainer from "../components/ProductsContainer";
import LoginForm from "../components/LoginForm";
import { UserActionCreators } from "../reducers/UserReducer/UserActionCreators";

// To let the application go to the browser
WebBrowser.maybeCompleteAuthSession();

const HomeScreen = () => {

  // Get user info
  const userInfo = useSelector((state) => state.UserReducer);

  // Declare dispatch and navigation
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Declaring authentication request for the below ios & android client ids
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "1080825624235-rubd3jo70iii906un5tqer7islldh429.apps.googleusercontent.com",
    androidClientId:
      "1080825624235-rat106bb56satjdihvb3mikkvrf74lnm.apps.googleusercontent.com",
  });

  // Check if response is sucess
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credentials = GoogleAuthProvider.credential(id_token);
      // Sign in with credentials
      signInWithCredential(auth, credentials);
    }
  }, [response]);

  useEffect(() => {
    // Check if user is authenticated
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if document of the user exists
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        // If user doesn't exist, create a new document
        if (!docSnap.exists()) {
          const newUserData = {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            wishlist: [],
            cart: [],
            orders: [],
          };
          await setDoc(doc(db, "users", user.uid), newUserData);
          dispatch(UserActionCreators.setUser(newUserData));
        } else {
          // Setting user
          dispatch(UserActionCreators.setUser(docSnap.data()));
        }
      } else {
        // If user is not there
        console.log("No user is logged in");
      }
      // Cleanup function
      return () => unsub();
    });
  }, []);

  return (
    <SafeAreaView className="bg-gray-200" style={{ height: "100%" }}>
      
      {/* If user is logged in */}
      {userInfo ? (
        <View className="py-6 space-y-4">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6">
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Image
                  source={{ uri: userInfo.photoURL }}
                  className="h-10 w-10 rounded-lg"
                />
              </TouchableOpacity>
              <View>
                <Text className="text-xs">Hello!</Text>
                <Text className="font-bold text-lg">{userInfo.name}</Text>
              </View>
            </View>

            {/* Tabs */}
            <View className="flex-row items-center space-x-3">
              {/* Wishlist Tab */}
              <TouchableOpacity
                className="relative"
                onPress={() => navigation.navigate("Wishlist")}
              >
                <HeartIcon color="#000000" />
                {userInfo.wishlist.length > 0 && (
                  <View className="absolute bottom-3 left-4 bg-black rounded-full h-4 w-4 items-center justify-center">
                    <Text className="text-white text-xs">
                      {userInfo.wishlist.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Cart Tab */}
              <TouchableOpacity
                className="relative"
                onPress={() => navigation.navigate("Cart")}
              >
                <ShoppingCartIcon color="#000000" />
                {userInfo.cart.length > 0 && (
                  <View className="absolute bottom-3 left-4 bg-black rounded-full h-4 w-4 items-center justify-center">
                    <Text className="text-white text-xs">
                      {userInfo.cart.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Scroll View */}
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <ProductsContainer />
          </ScrollView>
        </View>
      ) : (
        // If user is not logged in
        <LoginForm promptAsync={promptAsync} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
