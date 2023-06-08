import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Pressable,
	Modal,
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

import { useIsFocused } from "@react-navigation/native";
import { Button } from "react-native-paper";
import jwt_decode from "jwt-decode";

// Authentication
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
	const [modalVisible, setModalVisible] = useState(false);

	// console.log(mode_data)
	const focused = useIsFocused();

	const getShopData = async () => {
		// try {
		// const token = await AsyncStorage.getItem("token");
		// console.log(token);
		// const userresponse = await fetch(
		// 	`https://klick-api.onrender.com/auth/user`,
		// 	{
		// 		method: "GET",
		// 		mode: "no-cors",
		// 		headers: {
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}
		// );
		// const userdata = await userresponse.text();
		// setUser(userdata);
		// console.log(userdata);
		// // const response = await fetch(`https://klick-api.onrender.com/brand/${id}`, {
		// //     method: "GET",
		// //     mode: 'no-cors',
		// //     headers: {
		// //
		// //       'Authorization': `Bearer ${token}`
		// //     },
		// // })
		// } catch (e) {
		// 	console.log(e);
		// }
	};

	if (mode_data?.mode === "buyer") {
		navigation.navigate({ name: "hometab" });
	}

	// Default UseEffect
	useEffect(() => {
		// axios
		// 	.get("https://klick-api.onrender.com/product/")
		// 	.then((res) => setData(res.data.data))
		// 	.catch((err) => console.log(res.err));
		// //  .finally(item =>  setLoading(false))
		// axios.get("https://klick-api.onrender.com/brand/");
		const getUser = async () => {
			const data = await AsyncStorage.getItem("token");
			var decodedToken = jwt_decode(data);
			setUser(decodedToken);
		};
		getUser();
		const getStoreDetails = async () => {
			const stores = await axios.get("https://klick-api.onrender.com/brand/");
			const StoreData = stores.data.data.filter(
				(data) => data.owner === user.id
			);
			console.log("The Store Data");
			console.log(StoreData);
			setStore(StoreData);
		};
		getStoreDetails();
	}, []);

	console.log("focused", focused);

	useEffect(() => {
		getShopData();
		() => console.log("out");
	}, [focused]);

	// useEffect(()=>{
	//     // Add Login && Register logic here
	//     getLoginData(navigation);
	//     // console.log('here')

	// })
	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={{ display: "flex", flexDirection: "row", marginTop: 60 }}>
					<TouchableOpacity onPress={() => setModalVisible(true)}>
						<Image
							style={{ height: 60, width: 60, borderRadius: 50 }}
							source={require("../../../assets/orderpic.png")}
						></Image>
					</TouchableOpacity>

					{store ? (
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
								{store.name}
							</Text>
							<Text
								style={{
									color: "#98999A",
									fontSize: 12,
									fontWeight: "400",
									marginLeft: 10,
								}}
							>
								Yaba, Lagos
							</Text>
						</View>
					) : (
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
								No Store 
							</Text>
							<Text
								style={{
									color: "#98999A",
									fontSize: 12,
									fontWeight: "400",
									marginLeft: 10,
								}}
							>
								Yaba, Lagos
							</Text>
						</View>
					)}
					<Pressable onPress={() => navigation.navigate("notifications")}>
						<AntDesign
							name="bells"
							size={24}
							color="black"
							style={{ marginLeft: 120 }}
						/>
					</Pressable>
				</View>
				<View
					style={{
						marginVertical: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							// getLoginData(navigation, () => navigation.navigate("selleronboard"));
							navigation.navigate("selleronboard");
						}}
						style={{
							height: 42,
							width: 120,
							borderRadius: 20,
							backgroundColor: "#FEDD00",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={{ fontSize: 11 }}>Create Store</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						marginLeft: 20,
					}}
				>
					<View>
						<TouchableOpacity
							onPress={() => navigation.navigate("productView")}
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
					<View>
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
							<Feather name="percent" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: 0 }}>Apply Discount</Text>
					</View>
					<View>
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
						>
							<Octicons name="comment-discussion" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: 3 }}>View My Store</Text>
					</View>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						marginTop: 20,
					}}
				>
					<View>
						<TouchableOpacity
							onPress={() => navigation.navigate("productView")}
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
						<Text style={{ marginLeft: -10 }}>Price Ad</Text>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => navigation.navigate("discounts")}
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
							<Feather name="percent" size={24} color="white" />
						</TouchableOpacity>
						<Text style={{ marginLeft: 0 }}>Settings</Text>
					</View>
					<View>
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

			{/* Switch to Buyer */}
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
					bottom: 100,
					right: 0,
				}}
			>
				<Text style={{ fontSize: 11 }}>Switch to Buyer</Text>
			</TouchableOpacity>

			{/* Side Drawer Model */}
			<View style={styles.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					statusBarTranslucent={true}
				>
					<View style={styles.innercenteredView}>
						<View style={styles.modalView}>
							<View>
								<Image req />
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
	},
	centeredView: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
		// height: '100%',
		width: "50%",
	},
	innercenteredView: {
		// flex: 1,

		justifyContent: "center",
		alignItems: "flex-start",
		marginTop: 22,
	},
	modalView: {
		marginVertical: 20,
		marginHorizontal: 1,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 9,
		width: "50%",
		height: "100%",

		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});

export default VendorDashboard;
