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

	const onRefresh = () => {
		// Perform your refresh logic here
		console.log("Refresh");
		// setUserdata(null)
		// Simulate a delay for demonstration purposes
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};

	useEffect(() => {
		AsyncStorage.getItem("token")
			.then((token) => {
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((data) => {
						console.log(data.data.user);
						setUserdata(data.data.user);
						console.log("userdata");
						console.log("userdata");
						console.log("userdata");
						console.log(userdata.firstName);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	const logout = async () => {
		try {
			console.log('Logout')
			console.log('Logout')
			console.log('Logout')
			console.log('Logout')
			console.log('Logout')
			setLoading(true);

			//clearthe stored token from AsyncStorage
			await AsyncStorage.removeItem("token");
			await AsyncStorage.removeItem("isLoggedIn");
			const token = await AsyncStorage.getItem("token");
			console.log("tok", token);
			Alert.alert("Logout", "Logged out successfully.");
			navigation.navigate("Home");
			// setMode("buyer");
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "An error occured during logout");
		} finally {
			setLoading(false);
		}
	};

	return (
		<View>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				{userdata ? (
					<View
						style={{
							height: 100,
							width: "100%",
							backgroundColor: "#191600",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{/* <Image
						style={{
							borderRadius: 50,
							height: 60,
							width: 60,
							marginLeft: 20,
							marginTop: 20,
						}}
						source={require("../../../assets/profile.jpg")}
					/> */}
						<Text
							style={{
								color: "#FFF",
								fontWeight: "500",
								fontSize: 16,
								marginBottom: 10,
							}}
						>
							{userdata.firstName + " " + userdata.lastName}
						</Text>
						<Text
							style={{
								color: "#FFF",
								fontWeight: "400",
								fontSize: 12,
							}}
						>
							{"+" + userdata.phone}
						</Text>
					</View>
				) : (
					<View
						style={{ height: 13, width: "100%", backgroundColor: "white" }}
					></View>
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
					Buyer Mode
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
	);
};

export default SellerSettingsContent;
