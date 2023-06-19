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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Counter = ({ itemCount, navigation }) => {
	// const [counter, setCounter] = useState(0);

	// const increment = () => {
	// 	setCounter(counter + 1);
	// };

	// const decrement = () => {
	// 	setCounter(counter - 1);
	// };
	return (
		<View
			style={{
				height: 21,
				width: 70,
				backgroundColor: "#f0ecec",
				borderRadius: 20,
				marginTop: 10,
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
			}}
		>
			<View
				style={{
					paddingHorizontal: 20,
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{/* <Pressable onPress={decrement}>
					<Text style={{ fontSize: 30 }}>-</Text>
				</Pressable> */}
				<Text style={{ fontSize: 16 }}>{itemCount}</Text>
				{/* <Pressable onPress={increment}>
					<Text style={{ fontSize: 30 }}>+</Text>
				</Pressable> */}
			</View>
		</View>
	);
};

// const Cart = ({ navigation, data }) => {
// 	// console.log("!!!!!!!!!!!!!!!!;");
// 	// console.log(data);
// 	const [ItemId, setItemId] = useState(null)
// console.log(ItemId)
// 	return (

// 	);
// };

const MyCart = ({ navigation }) => {
	console.log("!!!!!!!!!My Cart Page !!!!!!!");
	const [cartId, setCartId] = useState(null);
	const [data, setData] = useState(null);

	const emptyCart = () => {
		console.log(cartId);
		// AsyncStorage.removeItem('cart');
		AsyncStorage.getItem("token").then((token) => {
			console.log(token);
			axios
				.put(
					`https://klick-api.onrender.com/cart/update/${cartId}`,
					{
						// items: {
						// 	[productId]: count,
						// },
						items: {},
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer " + token,
						},
					}
				)
				.then((res) => {
					console.log("!!!!!!Empty Cart Response!!!!!!!!!");
					console.log(res.data);
					AsyncStorage.setItem("cart", JSON.stringify([]));
					setData([]);
				})
				.catch((err) => {
					console.log("Add to cart Error!!!!!!!!!!");
					console.log(err);
				});
		});
	};

	useEffect(() => {
		console.log("!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!");
		console.log("!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!");
		console.log("!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!");
		console.log("!!!!!!!!!!!!!!!!!!!!!!!! !!!!!!!");
		fetchCartData = () => {
			AsyncStorage.getItem("token")
				.then((token) => {
					axios
						.get("https://klick-api.onrender.com/auth/user", {
							headers: { Authorization: "Bearer " + token },
						})
						.then((user) => {
							const data = user.data.user.Cart.items;
							const dataLength = Object.entries(data).length;

							setCartId(user.data.user.Cart.id);
							setData(data);
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchCartData();
	}, []);
	// Function to delete an item from the cart
	const deleteCartItem = (itemId) => {
		// Make a DELETE request to the API to delete the item
		console.log(itemId);
		AsyncStorage.getItem("token")
			.then((token) => {
				// const updatedCart = data.filter(item => item.id !== itemId);
				console.log('!!!!!!!!!!!data[0].name!!!!!!!!!!!!!');
				console.log(Object.keys(data)[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<View style={{}}>
			<ScrollView style={{}}>
				{data && (
					<View
						style={{
							marginBottom: 100,
							marginTop: 10,
							// backgroundColor: 'red'
						}}
					>
						<View style={{ marginBottom: 0 }}>
							<View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
								{Object.keys(data).map((key) => (
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "space-around",
											alignItems: "center",
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
											{/* <Text style={{marginHorizontal:0,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text> */}
											<Counter itemCount={data[key].quantity} />
										</View>
										<View
											style={{
												alignSelf: "flex-start",
												padding: 15,
											}}
										>
											<FontAwesome
												onPress={() => deleteCartItem(key)}
												name="trash"
												size={20}
												color="red"
											/>
										</View>
									</View>
								))}
							</View>
						</View>
						<TouchableOpacity
							onPress={() => emptyCart()}
							style={{ alignItems: "center" }}
						>
							<GeneralButton
								message={"Empty Cart"}
								marginLeft={140}
								top={15}
								backgroundColor={"#EB270B"}
								borderColor={"#FEDD00"}
								height={45}
								width={335}
							/>
						</TouchableOpacity>
						{data.length !== 0 && (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate({
										name: "checkout",
										params: { cartData: data },
									})
								}
								style={{
									marginTop: 20,
									alignItems: "center",
								}}
							>
								<GeneralButton
									message={"Checkout"}
									marginLeft={140}
									top={15}
									backgroundColor={"#FEDD00"}
									borderColor={"#FEDD00"}
									height={45}
									width={335}
								/>
							</TouchableOpacity>
						)}
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default MyCart;
