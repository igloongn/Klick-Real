import React, { useState, useContext } from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import HomeTabs from "./HomeTabs";
import SellersTabs from "./SellersTabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createStackNavigator } from '@react-navigation/stack';

import Home from "../screens/Home";
import Orders from "../screens/Orders";
import Message from "../screens/Message";
import Settings from "../screens/Settings";
import KSocial from "../screens/KSocial";
import SpecialOffer from "../components/Home/SpecialOffer";
import ShopPage from "../components/Home/ShopPage";
import OrderDetails from "../components/Orders/OrderDetails";
import ProfileSettings from "../components/Settings/ProfileSettings";
import ManageAccount from "../components/Settings/ManageAccount";
import EmailSettings from "../components/Settings/EmailSettings";
import PhoneSettings from "../components/Settings/PhoneSettings";
import PasswordSettings from "../components/Settings/PasswordSettings";
import Address from "../components/Settings/Address";
// import AddAddress from "../components/Settings/AddAddress";
import PaymentMethod from "../components/Settings/PaymentMethod";
import AddNewCard from "../components/Settings/AddNewCard";
import Notification from "../components/Settings/Notification";
import SocialPage from "../components/KSocial/SocialPage";
import Stories from "../components/KSocial/Stories";

import SellerMessage from "../screens/SellerMessage";
import SellerOrders from "../screens/SellerOrders";
import SellerKSocial from "../screens/SellerKSocial";
import SellerSettings from "../screens/SellerSettings";
import ProductDetails from "../components/Home/ProductDetails";
import SellerStoreCreate from "../components/Home/SellerStoreCreate";
import SellerBetter from "../components/Home/SellerBetter";
import SellerAddAddress from "../components/Home/SellerAddAddress";
import SellerAddLogo from "../components/Home/SellerAddLogo";
import Notifications from "../components/Home/Notifications";
import AddNewProduct from "../components/Home/AddNewProduct";

import SellerProductList from "../components/Home/SellerProductList";
import CreatePost from "../components/KSocial/CreatePost";
import StoreSettings from "../components/Settings/StoreSettings";
import StoreDetails from "../components/Settings/StoreDetails";
import StoreAddress from "../components/Settings/StoreAddress";
import SocialAccounts from "../components/Settings/SocialAccounts";
import Discounts from "../components/Settings/Discounts";
import AddNewDiscount from "../components/Settings/AddNewDiscount";
import Login from "../components/Home/Login";
import Register from "../components/Home/Register";
import VendorDashboard from "../components/Home/VendorDashboard";
import VerifyToken from "../components/Home/VerifyToken";
import SellerOnboarding from "../components/Home/SellerOnboarding";
import ShippingMethod from "../components/Home/ShippingMethod";
import TeamMembers from "../components/Settings/TeamMembers";
import AddTeamMembers from "../components/Settings/AddTeamMembers";
import TeamPage from "../components/Settings/TeamPage";
import RatesReviews from "../components/Home/RatesReviews";
import SellerKSocialContent from "../components/KSocial/SellerKSocialContent";
import Wallet from "../components/Settings/Wallet";
import TopUp from "../components/Settings/TopUp";
import Withdraw from "../components/Settings/Withdraw";
import FakeCategories from "../components/Home/FakeCategories";
import ProductList from "../components/Home/ProductList";
import MessagingScreen from "../utils/Test";
import NewStories from "../components/KSocial/NewStories";

import MyCart from "../components/Orders/MyCart";
import CheckOut from "../components/Orders/CheckOut";
import ShipSeller from "../components/Orders/ShipSeller";
import AddDeliveryLocation from "../components/Orders/AddDeliveryLocation";
import AddAddress from "../components/Home/AddAddress";
import SeacrhResult from "../components/Home/SeacrchResult";
import PriceAd from "../components/Settings/PriceAd";
import AddNewPriceAdd from "../components/Settings/AddNewPriceAdd";
import RegistrationSecond from "../components/Home/Registration_second";
import StoreList from "../components/Home/StoreList";

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();

export default function MainNav() {
	//   const [isLogginedIn, setisLogginedIn] = useState(false);

	//   const authCtx = useContext(AuthContext);
	return (
		// <Stack.Navigator screenOptions={{ headerShown: true }}>
		<Stack.Navigator
			screenOptions={{
				animationTypeForReplace: "push",
				cardStyleInterpolator: ({ current: { progress } }) => ({
					cardStyle: {
						transform: [
							{
								translateX: progress.interpolate({
									inputRange: [0, 1],
									outputRange: [500, 0],
								}),
							},
						],
					},
				}),
			}}
		>
			{/* <Stack.Screen name="auth" component={Auth}/> */}
			{/* <Stack.Screen name="test" component={MessagingScreen} /> */}
			<Stack.Screen
				name="hometab"
				component={HomeTabs}
				options={{
					headerShown: false,
					headerStyle: { elevation: 0 },
					title: "",
				}}
			/>
			<Stack.Screen
				name="addaddress"
				component={AddAddress}
				options={{
					headerStyle: { elevation: 0 },
					title: "Add Delivery Address",
				}}
			/>
			<Stack.Screen
				name="registrationsecond"
				component={RegistrationSecond}
				options={{
					headerStyle: { elevation: 0 },
					title: "Complete your registration",
				}}
			/>
			<Stack.Screen
				name="sellerstab"
				component={SellersTabs}
				options={{
					headerShown: false,
					headerStyle: { elevation: 0 },
					title: "",
				}}
			/>
			<Stack.Screen
				name="productView"
				component={ProductList}
				options={{
					title: "My Store",
					// headerRight: () => (
					// 	<TouchableOpacity onPress={() => console.log("End Icon pressed")}>
					// 		<Text>Hello</Text>
					// 	</TouchableOpacity>
					// ),
				}}
			/>
			<Stack.Screen
				name="searchResults"
				component={SeacrhResult}
				options={{
					title: "Search Results",
					// headerRight: () => (
					// 	<TouchableOpacity onPress={() => console.log("End Icon pressed")}>
					// 		<Text>Hello</Text>
					// 	</TouchableOpacity>
					// ),
				}}
			/>
			{/* <Stack.Screen name="home" component={Home} /> */}
			<Stack.Screen name="orders" component={Orders} />
			<Stack.Screen name="message" component={Message} />
			<Stack.Screen name="ksocial" component={KSocial} />
			<Stack.Screen
				name="settings"
				component={Settings}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen name="specialoffer" component={SpecialOffer} />
			<Stack.Screen
				name="shoppage"
				component={ShopPage}
				options={{
					title: "Store Page",
					// headerShown: false
				}}
			/>
			<Stack.Screen
				name="productdetails"
				component={ProductDetails}
				options={{
					title: "Product Details",
				}}
			/>
			<Stack.Screen name="orderdetails" component={OrderDetails} />
			<Stack.Screen name="profilesettings" component={ProfileSettings} />
			<Stack.Screen name="manageaccount" component={ManageAccount} />
			<Stack.Screen name="emailsettings" component={EmailSettings} />
			<Stack.Screen name="phonesettings" component={PhoneSettings} />
			<Stack.Screen name="passwordsettings" component={PasswordSettings} />
			<Stack.Screen name="address" component={Address} />
			{/* <Stack.Screen name="addaddress" component={AddAddress} /> */}
			<Stack.Screen
				name="paymentmethod"
				component={PaymentMethod}
				options={{ title: "Payment Method" }}
			/>
			<Stack.Screen name="addnewcard" component={AddNewCard} />
			<Stack.Screen name="notification" component={Notification} />
			<Stack.Screen name="socialpage" component={SocialPage} />
			<Stack.Screen
				name="stories"
				component={Stories}
				options={{
					title: "Stories",
				}}
			/>
			<Stack.Screen
				name="newstories"
				component={NewStories}
				options={{
					title: "Stories",
				}}
			/>
			<Stack.Screen
				name="categories"
				component={FakeCategories}
				options={{
					title: "Category",
				}}
			/>
			<Stack.Screen
				name="storelist"
				component={StoreList}
				options={{
					title: "My Stores",
				}}
			/>
			<Stack.Screen name="sellerorders" component={SellerOrders} />
			<Stack.Screen name="sellermessage" component={SellerMessage} />
			<Stack.Screen name="sellerksocial" component={SellerKSocial} />
			<Stack.Screen name="sellersettings" component={SellerSettings} />
			<Stack.Screen name="sellerstorecreate" component={SellerStoreCreate} />
			<Stack.Screen name="sellerbetter" component={SellerBetter} />
			<Stack.Screen name="selleraddaddress" component={SellerAddAddress} />
			<Stack.Screen name="selleraddlogo" component={SellerAddLogo} />
			<Stack.Screen name="notifications" component={Notifications} />
			<Stack.Screen
				name="addnewproduct"
				component={AddNewProduct}
				options={{
					title: "Add New Product",
				}}
			/>
			<Stack.Screen name="productlist" component={SellerProductList} />
			<Stack.Screen name="createpost" component={CreatePost} />
			<Stack.Screen
				name="storesettings"
				component={StoreSettings}
				options={{
					title: "Store Settings",
				}}
			/>
			<Stack.Screen
				name="storedetails"
				component={StoreDetails}
				options={{
					title: "Store Details",
				}}
			/>
			<Stack.Screen
				name="storeaddress"
				component={StoreAddress}
				options={{
					title: "Store Address",
				}}
			/>
			<Stack.Screen
				name="socialaccounts"
				component={SocialAccounts}
				options={{
					title: "Social Accounts",
				}}
			/>
			<Stack.Screen name="discounts" component={Discounts} />
			<Stack.Screen
				name="addnewdiscount"
				component={AddNewDiscount}
				options={{
					title: "Add New Discount ",
				}}
			/>
			<Stack.Screen name="priceAd" component={PriceAd} />
			<Stack.Screen
				name="addNewPriceAd"
				component={AddNewPriceAdd}
				options={{
					title: "Price Adjustment ",
				}}
			/>
			<Stack.Screen
				name="login"
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="register"
				component={Register}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="vendordash" component={VendorDashboard} />
			<Stack.Screen
				name="verify"
				component={VerifyToken}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="selleronboard"
				component={SellerOnboarding}
				options={{ title: "Create a Store", headerShown: false }}
			/>
			<Stack.Screen
				name="shippingmethod"
				component={ShippingMethod}
				options={{
					title: "Shipping Method",
				}}
			/>
			<Stack.Screen name="team" component={TeamMembers} />
			<Stack.Screen name="addteam" component={AddTeamMembers} />
			<Stack.Screen name="teampage" component={TeamPage} />
			<Stack.Screen name="rates" component={RatesReviews} />
			<Stack.Screen
				name="sellerksocialcontent"
				component={SellerKSocialContent}
			/>
			<Stack.Screen name="wallet" component={Wallet} />
			<Stack.Screen name="topup" component={TopUp} />
			<Stack.Screen name="withdraw" component={Withdraw} />
			<Stack.Screen
				name="mycart"
				component={MyCart}
				options={{
					title: "My Cart",
				}}
			/>
			<Stack.Screen
				name="checkout"
				component={CheckOut}
				options={{
					title: "Check out",
				}}
			/>
			<Stack.Screen name="shipseller" component={ShipSeller} />
			<Stack.Screen
				name="adddeliverylocation"
				component={AddDeliveryLocation}
				options={{
					title: "Add Delivery Location",
				}}
			/>
		</Stack.Navigator>
	);
}
