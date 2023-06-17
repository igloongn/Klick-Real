import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Pressable,
} from "react-native";
import SHomeCubes from "./SHomeCubes";
import SRecentOrders from "./SRecentOrders";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import { useBuyerSwitchVendorContext } from "../BuyerSwitchVendor";
import { FontAwesome5 } from "@expo/vector-icons";

import { useIsFocused } from "@react-navigation/native";

const getLoginData = async (navigation, alternative = () => null) => {
	try {
		const value = await AsyncStorage.getItem("isLoggedIn");
		//   console.log(value)
		if (value == null) {
			navigation.navigate("login");
		} else {
			alternative();
		}
	} catch (e) {
		// error reading value
	}
};

const VendorDashboard = ({ navigation }) => {
	const [buysell, setBuySell] = useState(true);
	const mode_data = useBuyerSwitchVendorContext();
	const [store, setStore] = useState(null);
	const [user, setUser] = useState(null);
	// console.log(mode_data)
	const focused = useIsFocused();

	if (mode_data?.mode === "buyer") {
		navigation.navigate({ name: "hometab" });
	}

	AsyncStorage.getItem("token").then((token) => {
		// console.log("!!!!!!!!!Token Outside!!!!!!!!!!");
		// console.log(token);
	});

	useEffect(() => {
		AsyncStorage.getItem("token").then((token) => {
			console.log("!!!!!!!!!!TOKEN!!!!!!!!");
			console.log(token);
			axios
				.get("https://klick-api.onrender.com/auth/user", {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					// console.log("!!!!!!!!!!Store ID!!!!!!!!");
					// console.log(res.data.stores[0].id);
					console.log(token);
					if (res.data.stores.length > 0) {
						AsyncStorage.setItem("StoreData", res.data.stores[0].id);
					}
					// console.log(res.data);
				})
				.catch((err) => {
					console.log("!!!!!!!Error for the user!!!!!!!");
					console.log(navigation.navigate("login"));
				});
		});
		// Get User Data
		AsyncStorage.getItem("token").then((token) => {
			console.log("!!!!!!!!!!Token Inside!!!!!!!!!");
			console.log(token);
			axios
				.get(`https://klick-api.onrender.com/auth/user`, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((userdata) => {
					setUser(userdata.data.stores);
					console.log("!!!!!!!!!!!!!!!!!USer store Lenght!!!!!!!!!!!!!!!!");
					// console.log(user[0].logo);
					console.log(user);
				})
				.catch((err) => {
					console.log(
						"!!!!!!!!!!!!!!!!!USer store Lenght Error!!!!!!!!!!!!!!!!"
					);
					console.log(err);
				});
		});
	}, []);

	console.log("focused", focused);

	// useEffect(() => {
	// 	() => console.log("out");
	// }, [focused]);

	// useEffect(()=>{
	//     // Add Login && Register logic here
	//     getLoginData(navigation);
	//     // console.log('here')

	// })
	return (
		<View style={styles.container}>
			<ScrollView>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						marginTop: 60,
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: 10,
					}}
				>
					{user && user.length > 0 ? (
						<View style={{ display: "flex", flexDirection: "row" }}>
							<View>
								<Image
									style={{
										height: 60,
										width: 60,
										borderRadius: 50,
										marginRight: 10,
									}}
									source={{ uri: user[0].logo }} // Network image
								></Image>
							</View>
							<View>
								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 20,
										fontWeight: "500",
										marginLeft: 10,
										marginTop: 10,
									}}
								>
									{user[0].name}
								</Text>
								<Text
									style={{
										color: "#98999A",
										fontSize: 12,
										fontWeight: "400",
										marginLeft: 10,
									}}
								>
									{user[0].role}
								</Text>
							</View>
						</View>
					) : (
						<View style={{ display: "flex", flexDirection: "row" }}>
							<View>
								<Image
									style={{
										height: 60,
										width: 60,
										borderRadius: 50,
										marginRight: 10,
									}}
									source={require("../../../assets/orderpic.png")}
								></Image>
							</View>
							<View>
								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 20,
										fontWeight: "500",
										marginLeft: 10,
										marginTop: 10,
									}}
								>
									No Store Yet
								</Text>
								<Text
									style={{
										color: "#98999A",
										fontSize: 12,
										fontWeight: "400",
										marginLeft: 10,
									}}
								></Text>
							</View>
						</View>
					)}

					<Pressable onPress={() => navigation.navigate("notifications")}>
						<AntDesign name="bells" size={24} color="black" style={{}} />
					</Pressable>
				</View>
				{/* Create Store */}
				<TouchableOpacity
					onPress={() => {
						getLoginData(navigation, () =>
							navigation.navigate("selleronboard")
						);
					}}
					style={{
						height: 42,
						width: 120,
						borderRadius: 20,
						backgroundColor: "#FEDD00",
						alignItems: "center",
						justifyContent: "center",
						marginVertical: 20,
					}}
				>
					<Text style={{ fontSize: 11 }}>Create Store</Text>
				</TouchableOpacity>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						marginBottom: 20,
					}}
				>
					<View
						style={{
							alignSelf: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("addnewproduct")}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: 52,
								width: 52,
								backgroundColor: "#0485E8",
								borderRadius: 50,
							}}
						>
							<SimpleLineIcons name="handbag" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{}}>Add Product</Text>
					</View>
					<View
						style={{
							display: "flex",
							justifyContent: "center",
							alignSelf: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("discounts")}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: 52,
								width: 52,
								backgroundColor: "#F5AF35",
								borderRadius: 50,
							}}
						>
							<AntDesign name="tagso" size={24} color={"white"} />
						</TouchableOpacity>
						<Text style={{ marginLeft: 0 }}>Discount</Text>
					</View>
					<View
						style={{
							alignSelf: "center",
						}}
					>
						<TouchableOpacity
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: 52,
								width: 52,
								backgroundColor: "#FEDD00",
								borderRadius: 50,
							}}
							onPress={() => navigation.navigate("productView")}
						>
							<FontAwesome5 name="store" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: 3 }}>My Store</Text>
					</View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<View
						style={{
							alignSelf: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("addNewPriceAd")}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: 52,
								width: 52,
								backgroundColor: "#02508B",
								borderRadius: 50,
							}}
						>
							<AntDesign name="notification" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: -10 }}>Price Ad</Text>
					</View>
					<View
						style={{
							alignSelf: "center",
						}}
					>
						<TouchableOpacity
							onPress={() => navigation.navigate("settings")}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: 52,
								width: 52,
								backgroundColor: "#1BB519",
								borderRadius: 50,
							}}
						>
							<AntDesign name="setting" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: 0 }}>Settings</Text>
					</View>
					<View
						style={{
							alignSelf: "center",
						}}
					>
						<TouchableOpacity
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								height: 52,
								width: 52,
								backgroundColor: "#EB270B",
								borderRadius: 50,
							}}
						>
							<Octicons name="comment-discussion" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: 3 }}>Support</Text>
					</View>
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						marginLeft: 0,
						marginTop: 60,
					}}
				>
					<SHomeCubes name={"Income"} />
					<SHomeCubes name={"Total Orders"} />
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						marginLeft: 0,
						marginTop: 20,
					}}
				>
					<SHomeCubes name={"Average sales"} />
					<SHomeCubes name={"Impressions"} />
				</View>

				<Text
					style={{
						color: "#98999A",
						fontSize: 12,
						fontWeight: "400",
						marginTop: 20,
					}}
				>
					Overall sales
				</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						marginLeft: 0,
						marginTop: 0,
					}}
				>
					<Text
						style={{
							color: "#0B0B0E",
							fontSize: 20,
							fontWeight: "500",
							marginTop: 0,
						}}
					>
						N2,768,058
					</Text>
					<View
						onPress={(buysell) => setBuySell(!buysell)}
						style={{
							height: 23,
							width: 58,
							borderRadius: 20,
							backgroundColor: "#FEDD00",
							position: "absolute",
							alignItems: "center",
							marginTop: 0,
							marginLeft: 120,
							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 11 }}>23.5%</Text>
					</View>
				</View>

				<Text
					style={{
						color: "#0B0B0E",
						fontSize: 20,
						fontWeight: "500",
						marginTop: 30,
					}}
				>
					Recent Orders
				</Text>
				<SRecentOrders />

				{/* <View style={{ marginTop: 1000 }}></View> */}
			</ScrollView>

			<TouchableOpacity
				onPress={() => {
					mode_data?.switchMode("buyer");
					console.log("hello");
				}}
				style={{
					height: 42,
					width: 120,
					borderRadius: 20,
					backgroundColor: "#FEDD00",
					position: "absolute",
					alignItems: "center",
					justifyContent: "center",
					bottom: 10,
					right: 0,
				}}
			>
				<Text style={{ fontSize: 11 }}>Switch to Buyer</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		//   alignItems: 'center',
		//   justifyContent: 'center',
	},
});

export default VendorDashboard;
