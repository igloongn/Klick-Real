import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import GeneralButton from "../General/GeneralButton";
import { MaterialIcons } from "@expo/vector-icons";
import PaymentIcon from "../../utils/SVGs/PaymentIcon";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsTiles = ({ name, route, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(route)}
			style={{ marginTop: 15 }}
		>
			<Image style={{ height: 20, width: 20, marginLeft: 20, marginTop: 25 }} />
			<Text
				style={{
					marginLeft: 56,
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

const PaymentMethod = ({ navigation, route }) => {
	const [storeId, setStoreId] = useState(null);
	const { addressPayload, sellerData, shippingCharge, subTotal } = route.params;

	const handleExternalLink = async (url) => {
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			console.log(`Don't know how to open URL: ${url}`);
		}
	};

	useEffect(() => {
		AsyncStorage.getItem("token").then((token) => {
			// console.log(token);
			axios
				.get("https://klick-api.onrender.com/auth/user", {
					headers: { Authorization: "Bearer " + token },
				})
				.then((data) => {
					const cartItem = data.data.user.Cart.items;
					const conCartItem = Object.values(cartItem);
					setStoreId(conCartItem[0].store);
					// console.log(storeId);
				})
				.catch((error) => console.log("Error in Get User"));
		});
	}, []);
	const makePayment = () => {
		AsyncStorage.getItem("token")
			.then((token) => {
				// console.log(sellerData);
				// console.log(storeId);
				const payload = {
					shipping_method: sellerData.name,
					storeId: storeId,
					option: "CARD",
					service: "FLUTTERWAVE",
				};
				// console.log("payload");
				// console.log(payload);
				axios
					.post(
						"https://klick-api.onrender.com/order/",
						{
							shipping_method: sellerData.name,
							storeId: storeId,
							option: "CARD",
							service: "FLUTTERWAVE",
						},
						{
							headers: {
								Authorization: "Bearer " + token,
							},
						}
					)
					.then((res) => {
						// console.log('res.data');
						// console.log(res.data.data);
						if (res.data.success === true) {
							handleExternalLink(res.data.data.paymentLink);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log("Issue With the Token");
			});
		// console.log('Yello')
	};
	return (
		<View>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					paddingVertical: 30,
					paddingLeft: 10,
				}}
			>
				<PaymentIcon />
				<Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: "500" }}>
					Ship with {sellerData.name}
				</Text>
			</View>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					paddingLeft: 10,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "500",
						paddingBottom: 20,
					}}
				>
					Select Payment Method
				</Text>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "500",
						paddingBottom: 20,
					}}
				>
					Flutterwave
				</Text>
			</View>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					borderBottomWidth: 1,
					borderTopWidth: 1,
					padding: 20,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 12,
					}}
				>
					<Text
						style={{
							fontSize: 15,
						}}
					>
						Sub Total:
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						₦{subTotal}
					</Text>
				</View>
				{/* <View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 12,
					}}
				>
					<Text>Discount:</Text>
					<Text>N---</Text>
				</View> */}
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginBottom: 12,
					}}
				>
					<Text
						style={{
							fontSize: 15,
						}}
					>
						Ship with {sellerData.name}:
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						₦{shippingCharge}
					</Text>
				</View>
				<View
					style={{
						borderBottomColor: "black",
						borderBottomWidth: 1,
						width: "100%",
						marginVertical: 10,
					}}
				/>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						marginVertical: 12,
					}}
				>
					<Text
						style={{
							fontSize: 15,
						}}
					>
						Total
					</Text>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "500",
						}}
					>
						₦{sellerData.price}
					</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity
					onPress={() => makePayment()}
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<GeneralButton
						backgroundColor={"#FEDD00"}
						message={"Make Payment"}
						width={335}
						height={54}
						borderColor={"#FEDD00"}
						marginLeft={130}
						top={15}
						marginHorizintal={40}
						marginTop={30}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default PaymentMethod;
