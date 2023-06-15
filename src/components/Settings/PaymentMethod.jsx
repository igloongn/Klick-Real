import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import GeneralButton from "../General/GeneralButton";
import { MaterialIcons } from "@expo/vector-icons";
import PaymentIcon from "../../utils/SVGs/PaymentIcon";

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
	const { cartData, addressPayload, sellerData } = route.params;
	console.log("!!!!!!!!!!!!DAta!!!!!!!!");
	console.log(cartData);
	console.log(addressPayload);

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
						N83867
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
						N2323
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
						N2323
					</Text>
				</View>
			</View>
			<View>
				<TouchableOpacity
					onPress={() => {}}
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
