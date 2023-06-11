import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
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
							N{address}
						</Text>
						{/* <Text style={{marginHorizontal:0,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text> */}
					</View>
				</View>
			</View>
		</View>
	);
};

const Cart = ({ productDetail, navigation }) => {
	const { name, price, images } = productDetail;
	return (
		<View style={{ marginBottom: 30 }}>
			<View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Image
						style={{ width: 102, height: 102, marginTop: 15, borderRadius: 10 }}
						source={{ uri: images[0] }}
					></Image>
					<View>
						<Text
							style={{
								marginHorizontal: 0,
								marginTop: 0,
								fontWeight: "500",
								fontSize: 17,
								marginRight: 100,
							}}
						>
							{name}
						</Text>
						<Text
							style={{
								color: "#0485E8",
								marginHorizontal: 0,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							N{price}
						</Text>
						{/* <Text style={{marginHorizontal:0,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text> */}
					</View>
					<FontAwesome name="trash" size={24} color="red" />
				</View>
			</View>
		</View>
	);
};

const CheckOut = ({ navigation, route }) => {
	const { id, itemCount, deliveryPayload } = route.params;
	const [data, setData] = useState(null);

	console.log("!!!!!!!!!Product Id !!!!!!!");
	console.log(id);
	console.log(itemCount);
	console.log(deliveryPayload);
	useEffect(() => {
		axios
			.get("https://klick-api.onrender.com/product/" + id)
			.then((res) => {
				console.log("!!!!!!!!!!Product Detail!!!!!!!!!!!");
				console.log(res?.data.data);
				setData(res?.data.data);

				// setIsLoading(true);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<View>
			{data && (
				<>
					<View style={{ backgroundColor: "#E5E5E5", height: 50 }}>
						<Text style={{ color: "#6A6B6C", marginTop: 20, marginLeft: 30 }}>
							Delivery to:
						</Text>
					</View>

					<DeliveryChange
						name={deliveryPayload.fullName}
						address={
							deliveryPayload.address +
							", " +
							deliveryPayload.city +
							", " +
							deliveryPayload.state
						}
					/>
					<Cart productDetail={data} />
					<TouchableOpacity
						onPress={() => navigation.navigate("shippingmethod")}
						style={{ alignItems: "center" }}
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
		</View>
	);
};

export default CheckOut;
