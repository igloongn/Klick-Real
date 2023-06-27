import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
	Alert,
	ActivityIndicator,
	ScrollView,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBuyerSwitchVendorContext } from "../BuyerSwitchVendor";
import axios from "axios";

const SettingsTiles = ({ name, route, icon, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(route)}
			style={{ marginBottom: 20 }}
		>
			<SimpleLineIcons
				style={{ marginTop: 25, marginLeft: 5 }}
				name={icon}
				size={14}
				color="black"
			/>
			<Text
				style={{
					marginLeft: 27,
					marginTop: -16,
					color: "#000",
					fontWeight: "400",
					fontSize: 14,
				}}
			>
				{name}
			</Text>
			<AntDesign
				style={{ marginLeft: 320, marginTop: -15 }}
				name="right"
				size={14}
				color="black"
			/>
		</TouchableOpacity>
	);
};

const SellerSettingsContent = ({ navigation }) => {
	const [loading, setLoading] = useState(false);
	const [userdata, setUserdata] = useState(null);

	const [refreshing, setRefreshing] = useState(false);

	const { mode, setMode } = useBuyerSwitchVendorContext();

	const getData = () => {
		AsyncStorage.getItem("token")
			.then((token) => {
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((data) => {
						// console.log(data.data.stores);
						setUserdata(data.data.stores);
						// console.log("userdata");
						// console.log("userdata");
						// console.log("userdata");
						// console.log(userdata.firstName);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			}); // setUserdata(null)
	};

	// On Refresh event
	const onRefresh = () => {
		// Perform your refresh logic here

		console.log("Refresh");

		AsyncStorage.getItem("token")
			.then((token) => {
				// console.log(token);
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((data) => {
						setUserdata(data.data.stores);
						// console.log(data.data.stores);
						// console.log("userdata");
						// console.log("userdata");
						// console.log("userdata");
						// console.log(userdata.firstName);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			}); // setUserdata(null)

		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	useEffect(() => {
		getData();
	}, []);
	const logout = async () => {
		try {
			// console.log("Logout");
			// console.log("Logout");
			// console.log("Logout");
			// console.log("Logout");
			// console.log("Logout");
			setLoading(true);

			//clearthe stored token from AsyncStorage
			await AsyncStorage.removeItem("token");
			await AsyncStorage.removeItem("isLoggedIn");
			const token = await AsyncStorage.getItem("token");
			console.log("tok", token);
			Alert.alert("Logout", "Logged out successfully.");
			navigation.navigate("hometab");
			// setMode("buyer");
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "An error occured during logout");
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView
			style={{
				marginHorizontal: 20,
				marginTop: 50,
			}}
		>
			<View>
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{userdata ? (
						userdata.length > 0 ? (
							<View
								style={{
									height: 150,
									width: "100%",
									backgroundColor: "#191600",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<View
									style={{
										color: "#FFF",
										marginBottom: 10,
									}}
								>
									<Image
										source={{
											uri: userdata[0].logo,
										}} // Remote image source
										style={{ width: 80, height: 80, borderRadius: 50 }} // Set the width and height of the image
									/>
								</View>
								<Text
									style={{
										color: "#FFF",
										fontWeight: "400",
										fontSize: 20,
									}}
								>
									{userdata[0].name}
								</Text>
							</View>
						) : (
							<View
								style={{
									height: 150,
									width: "100%",
									backgroundColor: "#191600",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<View
									style={{
										color: "#FFF",
										marginBottom: 10,
									}}
								>
									<Image
										source={require("../../../assets/logoo.png")}
										style={{ width: 80, height: 80, borderRadius: 50 }} // Set the width and height of the image
									/>
								</View>
								<Text
									style={{
										color: "#FFF",
										fontWeight: "400",
										fontSize: 20,
									}}
								>
									No store Yet...
								</Text>
							</View>
						)
					) : (
						<View
							style={{
								height: 150,
								width: "100%",
								backgroundColor: "#191600",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<View
								style={{
									color: "#FFF",
									marginBottom: 10,
								}}
							>
								<Image
									style={{ width: 80, height: 80, borderRadius: 50 }}
									source={require("../../../assets/logoo.png")}
								/>
							</View>
							<Text
								style={{
									color: "#FFF",
									fontWeight: "400",
									fontSize: 20,
								}}
							>
								Please Create a store
							</Text>
						</View>
					)}

					<Text
						style={{
							marginLeft: 5,
							marginTop: 20,
							color: "#000",
							fontWeight: "600",
							fontSize: 16,
						}}
					>
						Seller Mode
					</Text>

					<SettingsTiles
						name={"Store Settings"}
						icon={"settings"}
						navigation={navigation}
						route={"storesettings"}
					/>
					<SettingsTiles
						name={"Wallet"}
						icon={"wallet"}
						navigation={navigation}
						route={"wallet"}
					/>
					<SettingsTiles
						name={"Discounts"}
						icon={"badge"}
						navigation={navigation}
						route={"discounts"}
					/>
					<SettingsTiles
						name={"Teams & staffs"}
						icon={"people"}
						navigation={navigation}
						route={"team"}
					/>
					<SettingsTiles
						name={"Password & Security"}
						icon={"lock"}
						navigation={navigation}
						route={"passwordsettings"}
					/>

					<Pressable onPress={logout}>
						<Text
							style={{
								marginLeft: 20,
								marginTop: 20,
								color: "#EB270B",
								fontWeight: "400",
								fontSize: 16,
							}}
						>
							Log Out
						</Text>
					</Pressable>
					{loading && <ActivityIndicator size="large" />}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default SellerSettingsContent;
