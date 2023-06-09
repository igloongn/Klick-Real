import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Button,
	Pressable,
	Linking,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import GeneralButton from "../General/GeneralButton";
import SponsorCard from "./SponsorCard";
import PopularCard from "./PopularCard";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import LoadingScreen from "../../utils/MyLoading";

// const DATA2 = [
// 	{
// 		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
// 		title: "First Item",
// 	},
// 	{
// 		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
// 		title: "Second Item",
// 	},
// 	{
// 		id: "58694a0f-3da1-471f-bd96-145571e29d72",
// 		title: "Third Item",
// 	},
// ];

const ProductDetails = ({ navigation, route }) => {
	const [toggle, setToggle] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);
	const [count, setCount] = useState(1);
	// const [buttonText, setButtonText] = useState({
	// 	text: "Add to cart",
	// 	color: "#FEDD00",
	// });
	const [buttonText, setButtonText] = useState({
		text: "Buy now",
		color: "#FEDD00",
	});
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const { id } = route.params;
	// console.log(id);
	const [expanded, setExpanded] = useState(false);

	const toggleAccordion = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		AsyncStorage.getItem("isLoggedIn").then((res) => setIsLoggedIn(res));
		axios
			.get("https://klick-api.onrender.com/product/" + id)
			.then((res) => {
				// console.log("!!!!!!!!!!Product Detail!!!!!!!!!!!");
				// console.log(res?.data.data);
				setData(res.data.data);
				// console.log('res.data.data')
				// console.log(res.data.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const increment = () => {
		setCount(count + 1);
	};
	const decrement = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};
	const addToCart = () => {
		// AsyncStorage.getItem("cart").then((cartData) => {
		// 	const productId = data.id;
		// 	const JSON_cartData = JSON.parse(cartData);
		// 	const payload = {
		// 		items: {
		// 			...JSON_cartData.items,
		// 			[productId]: count,
		// 		},
		// 	};
		// 	AsyncStorage.setItem(
		// 		"cart",
		// 		JSON.stringify({
		// 			items: { ...JSON_cartData.items, [productId]: count },
		// 		})
		// 	);
		// 	setButtonText({ text: "Buy now", color: "#FEDD00" });
		// 	// setButtonText({ text: "Added", color: "green" });
		// 	navigation.navigate({
		// 		name: "checkout",
		// 		params: { id: data.id, item: data },
		// 	});
		// });
		const productId = data.id;
		// console.log(data);
		// const JSON_data = JSON.parse(data);
		// // setcartCount(Object.keys(JSON_data).length);
		const payload = {
			items: {
				[data.id]: count,
			},
		};
		console.log("Payload");
		console.log(payload);

		AsyncStorage.getItem("token")
			.then((token) => {
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((userdata) => {
						// console.log(userdata.data.user.Cart.id);

						axios
							.put(
								`https://klick-api.onrender.com/cart/update/${userdata.data.user.Cart.id}`,
								payload,
								{
									headers: {
										"Content-Type": "application/json",
										Authorization: "Bearer " + token,
									},
								}
							)
							.then((res) => {
								console.log("!!!!!!Add to Cart Response!!!!!!!!!");
								console.log(res.data);
							})
							.catch((err) => {
								console.log("Add to cart Error!!!!!!!!!!");
								console.log(err);
							});
					})
					.catch((err) => {});
			})
			.catch((err) => {});

		setButtonText({ text: "Buy now", color: "#FEDD00" });
		// setButtonText({ text: "Added", color: "green" });
		navigation.navigate({
			name: "checkout",
			params: { id: data.id, item: data },
		});
	};

	// Handle External Link
	const handleExternalLinkWhatsApp = async (url) => {
		// Check if the device supports opening the URL
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			// Open the URL in the device's default browser
			await Linking.openURL(url);
		} else {
			console.log(`Cannot open URL: ${url}`);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				{loading ? (
					<View
						style={{
							// backgroundColor: 'red',
							// flex: 1,
							marginTop: 80,
						}}
					>
						<LoadingScreen word={"Product Data Loading...."} />
					</View>
				) : (
					<View>
						{data && (
							<Image
								style={{
									height: 200,
									width: 357,
									marginLeft: 20,
									marginTop: 20,
								}}
								source={{ uri: data?.images[0] }}
							></Image>
						)}
						{data && (
							<>
								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 20,
										fontWeight: "500",
										marginLeft: 20,
										marginTop: 30,
									}}
								>
									{data?.name}
								</Text>
								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 12,
										fontWeight: "400",
										marginLeft: 20,
										marginTop: 5,
									}}
								>
									{data?.rating}(1.2K reviews)
								</Text>
								<Text
									style={{
										color: "#0485E8",
										fontSize: 16,
										fontWeight: "500",
										marginLeft: 20,
										marginTop: 5,
									}}
								>
									₦{data?.price}
								</Text>
								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 12,
										fontWeight: "400",
										marginLeft: 20,
										marginTop: 5,
									}}
								>
									Total in stock: {data.quantity.total}
								</Text>
								<View
									style={{
										backgroundColor: "#F7F7F7",
										width: 118,
										height: 48,
										borderRadius: 30,
										marginLeft: 20,
										marginTop: 10,
									}}
								>
									<View style={{ display: "flex", flexDirection: "row" }}>
										<Pressable onPress={decrement}>
											<Text
												style={{
													fontSize: 24,
													fontWeight: "500",
													paddingLeft: 20,
													paddingTop: 10,
												}}
											>
												-
											</Text>
										</Pressable>
										<Text style={{ marginLeft: 20, marginTop: 15 }}>
											{count}
										</Text>
										<Pressable onPress={increment}>
											<Text
												style={{
													fontSize: 24,
													fontWeight: "500",
													fontSize: 24,
													fontWeight: "500",
													paddingLeft: 20,
													paddingTop: 10,
												}}
											>
												+
											</Text>
										</Pressable>
									</View>
								</View>

								<View
									style={{
										backgroundColor: "#F7F7F7",
										width: 375,
										height: 76,
										marginLeft: 0,
										marginTop: 10,
									}}
								>
									<Text
										style={{
											color: "#0B0B0E",
											fontSize: 14,
											fontWeight: "500",
											marginLeft: 20,
											marginTop: 20,
										}}
									>
										K-Secured Return Option
									</Text>
									<Text
										style={{
											color: "#0B0B0E",
											fontSize: 12,
											fontWeight: "400",
											marginLeft: 20,
											marginTop: 0,
										}}
									>
										Free return within 3 days. Money back guarantee
									</Text>
								</View>

								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 16,
										fontWeight: "500",
										marginLeft: 20,
										marginTop: 20,
									}}
								>
									Description
								</Text>
								<Text
									style={{
										color: "#0B0B0E",
										fontSize: 12,
										fontWeight: "400",
										marginLeft: 20,
										marginTop: 0,
									}}
								>
									{data?.description}
								</Text>

								<View style={styles.acontainer}>
									<TouchableOpacity onPress={toggleAccordion}>
										<View style={styles.aheader}>
											<Text style={styles.atitle}>Contact Store Owner </Text>
											<AntDesign name="caretdown" size={24} color="black" />
										</View>
									</TouchableOpacity>
									{expanded && (
										<View
											style={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "center",
												alignItems: "flex-start",
												padding: 20,
											}}
										>
											<TouchableOpacity
												onPress={() =>
													handleExternalLinkWhatsApp(
														`https://wa.me/${data.store.businessPhone}`
													)
												}
												style={{
													marginVertical: 10,
												}}
											>
												<Text>
													<FontAwesome
														name="whatsapp"
														size={24}
														color="black"
													/>
													{"  WhatsApp"}
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => console.log("Instagram Link Clicked")}
												style={{
													marginVertical: 10,
												}}
											>
												<Text>
													<AntDesign name="instagram" size={24} color="black" />
													{"  Instagram"}: Mufasa
												</Text>
											</TouchableOpacity>
										</View>
									)}
								</View>

								<TouchableOpacity onPress={() => navigation.navigate("rates")}>
									<Text
										style={{
											color: "#0B0B0E",
											fontSize: 14,
											fontWeight: "500",
											marginLeft: 20,
											marginTop: 20,
										}}
									>
										Ratings & Reviews
									</Text>
									<Text
										style={{
											color: "#0B0B0E",
											fontSize: 12,
											fontWeight: "400",
											marginLeft: 20,
											marginTop: 0,
										}}
									>
										4.8(1.2K reviews)
									</Text>
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											marginTop: 10,
											marginLeft: 20,
										}}
									>
										<AntDesign name="star" size={20} color="yellow" />
										<AntDesign name="star" size={20} color="yellow" />
										<AntDesign name="star" size={20} color="yellow" />
										<AntDesign name="star" size={20} color="gray" />
										<AntDesign name="star" size={20} color="gray" />
									</View>
								</TouchableOpacity>

								<View
									style={{
										marginBottom: 30,
									}}
								>
									<Text
										style={{
											color: "#0B0B0E",
											fontSize: 14,
											fontWeight: "500",
											marginLeft: 20,
											marginTop: 20,
										}}
									>
										It's Lovely
									</Text>
									<Text
										style={{
											color: "#0B0B0E",
											fontSize: 12,
											fontWeight: "400",
											marginLeft: 20,
											marginTop: 0,
										}}
									>
										However rare side effects observed among children{"\n"}can
										be metabolic acidosis, coma, respiratory{"\n"}depression,
										and hypoglycemia
									</Text>
								</View>
							</>
						)}
					</View>
				)}
			</ScrollView>

			<View
				style={{
					position: "absolute",
					display: "flex",
					flexDirection: "row",
					// bottom: 5,
					right: 2,
					bottom: 119,
				}}
			>
				{/* <Pressable onPress={() => navigation.navigate("mycart")}> */}
				<Pressable
					onPress={() => {
						if (isLoggedIn === "true") {
							addToCart();
						} else {
							navigation.navigate({
								name: "login",
								params: { id: data?.id, route: "productData" },
							});
						}
					}}
				>
					{/* <Pressable onPress={() => {}}> */}
					<GeneralButton
						style={styles.shift}
						message={buttonText.text}
						backgroundColor={buttonText.color}
						color="black"
						width={159.5}
						height={54}
						borderColor={"#FEDD00"}
						size={15}
						top={10}
						marginLeft={45}
						marginTop={80}
						marginHorizintal={0}
					/>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF",
		flex: 1,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		marginTop: 20,
	},
	row2: {
		display: "flex",
		flexDirection: "row",
		marginTop: 30,
	},
	stretch: {
		width: 50,
		height: 50,
		marginHorizontal: 10,

		borderRadius: 50,
	},
	location: {
		fontSize: 12,
		fontWeight: "400",
		color: "#98999A",
		marginHorizontal: 5,
	},
	central: {
		fontSize: 16,
		fontWeight: "500",
		color: "#0B0B0E",
		marginHorizontal: 5,
	},
	shift: {
		marginLeft: 120,
		marginTop: 0,
	},
	orderpic: {
		width: 102,
		height: 102,
		marginHorizontal: 20,
		marginTop: 15,
		borderRadius: 10,
	},
	acontainer: {
		marginTop: 20,
		// marginBottom: 10,
		backgroundColor: "#fff",
		borderRadius: 5,
		overflow: "hidden",
	},
	aheader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		backgroundColor: "#f2f2f2",
	},
	atitle: {
		marginLeft: 10,
		fontSize: 16,
		fontWeight: "500",
	},
});

export default ProductDetails;
