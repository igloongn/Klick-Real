import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
	ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import GeneralButton from "../General/GeneralButton";
import axios from "axios";

const DeliveryChange = ({ name, address, navigation }) => {
	return (
		<View style={{ marginBottom: 0 }}>
			<View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{/* <Image style={{ width: 102, height: 102, marginTop: 15, borderRadius: 10 }} source={require('../../../assets/orderpic.png')}></Image> */}

					<View>
						<Text
							style={{
								marginHorizontal: 0,
								marginTop: 0,
								fontWeight: "600",
								fontSize: 17,
								marginRight: 100,
							}}
						>
							{name}
						</Text>
						<Text
							style={{
								color: "#6A6B6C",
								marginHorizontal: 0,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							{address}
						</Text>
						{/* <Text style={{marginHorizontal:0,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text> */}
					</View>
				</View>
			</View>
		</View>
	);
};

const Cart = ({ navigation, data }) => {
	console.log("!!!!!!!!!!!!!!!!;");
	console.log(data);

	return (
		<View style={{ marginBottom: 0 }}>
			<View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
				{Object.keys(data).map((key) => (
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "center",
							// backgroundColor: "red",
							backgroundColor: "white",
							borderRadius: 8,
							marginBottom: 15,
						}}
						elevation={10}
					>
						<View style={{ paddingVertical: 10 }}>
							<Image
								style={{
									width: 102,
									height: 102,
									marginTop: 15,
									borderRadius: 10,
								}}
								source={{ uri: data[key].image[0] }}
							></Image>
						</View>
						<View
							style={{
								flex: 0.8,
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
								alignItems: "flex-start",
								// backgroundColor: 'red',
							}}
						>
							<Text style={{ fontSize: 18, fontWeight: "500" }}>
								{data[key].name}
							</Text>
							<Text
								style={{
									color: "#0485E8",
									marginHorizontal: 0,
									fontWeight: "500",
									fontSize: 13,
									marginVertical: 7,
								}}
							>
								N{data[key].UnitPrice}
							</Text>
							<Text
								style={{
									marginHorizontal: 0,
									fontWeight: "500",
									fontSize: 15,
									marginTop: 5,
								}}
							>
								QTY: {data[key].quantity}
							</Text>
							{/* <Counter itemCount={data[key].quantity} /> */}
						</View>
						<View
							style={{
								alignSelf: "flex-start",
								padding: 15,
							}}
						></View>
					</View>
				))}
			</View>
		</View>
	);
};

const CheckOut = ({ navigation, route }) => {
	// const { id, itemCount, payload } = route.params;
	const { cartData, payload } = route.params;
	const [data, setData] = useState(null);

	useEffect(() => {}, []);

	return (
		<View style={{ marginBottom: 30, marginTop: 10 }}>
			<ScrollView>
				{cartData && (
					<>
						<View style={{ backgroundColor: "#E5E5E5", height: 50 }}>
							<Text style={{ color: "#6A6B6C", marginTop: 20, marginLeft: 30 }}>
								Delivery to:
							</Text>
						</View>

						<DeliveryChange
							name={payload.fullName}
							address={
								payload.address + ", " + payload.city + ", " + payload.state
							}
						/>
						<Cart data={cartData} />

						<TouchableOpacity
							// onPress={() => navigation.navigate("shippingmethod")}
							onPress={() =>
								navigation.navigate({
									name: "shippingmethod",
									params: { cartData: cartData, addressPayload: payload },
								})
							}
							style={{ alignItems: "center", marginBottom: 60 }}
						>
							<GeneralButton
								message={"Continue to Shipping"}
								marginLeft={110}
								top={15}
								backgroundColor={"#FEDD00"}
								borderColor={"#FEDD00"}
								height={45}
								width={335}
							/>
						</TouchableOpacity>
					</>
				)}
			</ScrollView>
		</View>
	);
};

export default CheckOut;