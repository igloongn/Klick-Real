import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
	RefreshControl,
	Pressable,
	Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SettingsTiles = ({ name, route, navigation }) => {
	return (
		<TouchableOpacity onPress={() => navigation.navigate(route)}>
			<SimpleLineIcons
				style={{ marginTop: 25, marginLeft: 5 }}
				name="wallet"
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

const BuyerSettingsContent = ({ navigation }) => {
	const [userdata, setUserdata] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);

	getData = () => {
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
		getData();
	};

	const onRefresh = () => {
		// Perform your refresh logic here
		console.log("Refresh");
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
			}); // setUserdata(null)
		// Simulate a delay for demonstration purposes
		setTimeout(() => {
			setRefreshing(false);
		}, 2000);
	};
	const logout = async () => {
		try {
			console.log("Logout");
			console.log("Logout");
			console.log("Logout");
			console.log("Logout");
			console.log("Logout");
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
	useEffect(() => {
		getData = () => {
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
			getData();
		};
	}, []);
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
					{/* <Text>SettingsContent</Text> */}
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
							style={{
								height: 100,
								width: "100%",
								backgroundColor: "#191600",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									color: "#FFF",
									fontWeight: "500",
									fontSize: 16,
									marginBottom: 10,
								}}
							>
								Username
							</Text>
							<Text
								style={{
									color: "#FFF",
									fontWeight: "400",
									fontSize: 12,
								}}
							>
								Phone Number
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
						Buyer Mode{" "}
					</Text>

					<SettingsTiles
						name={"View Wallet"}
						navigation={navigation}
						route={"wallet"}
					/>
					<SettingsTiles
						name={"Address"}
						navigation={navigation}
						route={"address"}
					/>
					<SettingsTiles
						name={"Profile Settings"}
						navigation={navigation}
						route={"profilesettings"}
					/>
					<SettingsTiles
						name={"Manage Account"}
						navigation={navigation}
						route={"manageaccount"}
					/>
					{/* <SettingsTiles
						name={"Payment Methods"}
						navigation={navigation}
						route={"paymentmethod"}
					/> */}
					{/* <SettingsTiles
						name={"Notification Settings"}
						navigation={navigation}
						route={"notification"}
					/> */}
					{/* <SettingsTiles
						name={"Help Center"}
						navigation={navigation}
						route={"profilesettings"}
					/> */}
					<SettingsTiles
						name={"Privacy Policy"}
						navigation={navigation}
						route={"profilesettings"}
					/>
					{/* <SettingsTiles
						name={"Invite friends"}
						navigation={navigation}
						route={"profilesettings"}
					/> */}

					<Pressable
						onPress={() => {
							logout();
						}}
					>
						<Text
							style={{
								marginLeft: 20,
								marginTop: 20,
								color: "#EB270B",
								fontWeight: "400",
								fontSize: 14,
							}}
						>
							Log Out
						</Text>
					</Pressable>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default BuyerSettingsContent;
