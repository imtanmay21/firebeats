import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import WishlistScreen from "./src/screens/WishlistScreen";
import CartScreen from "./src/screens/CartScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  const STRIPE_KEY =
    "pk_test_51NZoYlSCPhEk3WEAU77tUaf5WQfoEaxE4vgglEBN7LmvQJ7bRsGra3y8FnjcPBktD5aRZ4r21uhuS356Yu4O5MoL0061fD8NVV";

  // Creating navigation stack
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StripeProvider publishableKey={STRIPE_KEY}>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </Provider>
      </StripeProvider>
    </NavigationContainer>
  );
}
