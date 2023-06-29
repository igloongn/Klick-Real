import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	FlatList,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Platform,
	SafeAreaView,
	Pressable,
	RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CategoriesCard from "./CategoriesCard";
import SpecialCard from "./SpecialCard";
import SponsorCard from "./SponsorCard";
import ScrollCard from "./ScrollCard";
import SpecialOffer from "./SpecialOffer";
import axios from "axios";
import { useBuyerSwitchVendorContext } from "../BuyerSwitchVendor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetLogginedUser } from "../../utils/apiHooks";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import KlickLogo from "../../utils/SVGs/KlickLogo";

import { AntDesign } from "@expo/vector-icons";
import jwtDecode from "jwt-decode";
import LoadingScreen from "../../utils/MyLoading";

const DATA2 = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Second Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Third Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53ab28ba",
		title: "Fourth Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3adabb28ba",
		title: "Fifth Item",
	},
	{
		id: "bd7acbea-c1b1-46c2-aed5-3aabb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbda97f63",
		title: "Second Item",
	},
];

const Item = ({ title, navigation, onPress, item }) => (
	<>
		<TouchableOpacity
			onPress={() =>
				navigation.navigate({ name: "newstories", params: { id: item.id } })
			}
			style={styles.items}
		>
			<Image
				style={{
					width: 55,
					height: 55,
					borderRadius: 100,
					marginTop: -8,
					right: 9,
					borderColor: "#0485E8",
					borderWidth: 2,
					// }} source={{ uri: item?.contentUrl[0] ?? "" }} />
				}}
				source={{ uri: item?.contentUrl[0] ?? "" }}
			/>
		</TouchableOpacity>
	</>
);

const Item2 = ({ title }) => (
	<View style={styles.item2}>
		<Text style={styles.title}>{title}</Text>
	</View>
);

const HomeContent = ({ navigation }) => {
	const [search, onChangeSearch] = React.useState("");
	const [searchResults, setSearchResults] = useState([]);

	const { user, isErorr, getUserData } = useGetLogginedUser();
	const [_data, set_Data] = useState([]);
	const [postData, setPostData] = useState(null);
	const [productData, setProductData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLoggedIn, setisLogginedIn] = useState(false);
	const [buysell, setBuySell] = useState(true);
	const focus = useIsFocused();
	const [showGallery, setShowGallery] = useState(false);
	const [cartCount, setcartCount] = useState(null);
	const [category, setCategory] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	const [stores, setStores] = useState(null);
	const [defaultAddress, setDefaultAddress] = useState(true);

	AsyncStorage.getItem("cart").then((cart) => {
		if (!cart) {
			AsyncStorage.setItem("cart", JSON.stringify([]));
		} else {
			// console.log("cart");
			// console.log(JSON.parse(cart));
		}
	});

	const getLoginData = (navigation, alternative = () => null) => {
		AsyncStorage.getItem("isLoggedIn")
			.then((value) => {
				if (value) setisLogginedIn(true);
				else setisLogginedIn(false);
			})
			.catch((error) => console.log(error));
	};

	const mode_data = useBuyerSwitchVendorContext();
	// console.log("mode", mode_data);
	if (mode_data?.mode === "vendor") {
		navigation.navigate({ name: "sellerstab" });
	}
	getLoginData();

	// Smart Search
	const performSearch = (query) => {
		// // Perform your search logic here
		// // This can involve fetching data from an API or filtering an existing dataset
		// // Update the searchResults state with the filtered or fetched results
		// const filteredResults = productData.filter(
		// 	(item) => item.name.toLowerCase().includes(search.toLowerCase())
		// 	// item.name.toLowerCase().includes(search)
		// );
		// console.log("Search Result");
		// console.log(filteredResults.length);
		// setSearchResults(filteredResults);

		axios
			.get(`https://klick-api.onrender.com/product/?q=${query}`)
			.then((res) => {
				setSearchResults(res.data.data.products);
			})
			.catch((err) => {});
	};

	const handleSearchInput = (text) => {
		onChangeSearch(text);
		performSearch(text);
	};
	const getStores = () => {
		axios
			.get("https://klick-api.onrender.com/brand/")
			.then((res) => {
				// console.log("!!!!!!!!!!Store!!!!!!!!!");
				// console.log(res.data);
				setStores(res.data.data);
			})
			.catch((err) => {});
	};
	useEffect(() => {
		onChangeSearch("");
		getStatus();
		getStores();
		if (isLoggedIn) {
			setcartCount(0);

			axios
				.get("https://klick-api.onrender.com/product/", {})
				.then((res) => {
					// console.log("!!!!!!!!!!Products Loggedin!!!!!!!");
					// console.log(res.data.data.products);
					setProductData(res.data.data.products);
				})
				.catch((err) => {
					console.log("!!!!!!!!!Axios Error Loggedin!!!!!!!");
					console.log(err);
				});
			AsyncStorage.getItem("token").then((token) => {
				console.log("!!!!!!!!!!TOKEN!!!!!!!!");
				console.log(token);
				// Address Check
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((userData) => {
						setcartCount(Object.keys(userData.data.user.Cart.items).length);
						const isEmptyObject = (obj) => {
							return Object.keys(obj).length === 0;
						};
						isEmptyObject(userData.data.DefaultAddress);
						// console.log(isEmptyObject(userData.data.DefaultAddress));
						if (isEmptyObject(userData.data.DefaultAddress) === true) {
							// setDefaultAddress(false);
						}
					})
					.catch((err) => {
						console.log(err);
					});
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((userdata) => {
						// setcartCount(Object.keys(userdata.data.user.Cart.items).length);
						// const isEmptyObject = (obj) => {
						// 	if (obj == null) return true;
						// 	return Object.keys(obj).length === 0;
						// };
						// isEmptyObject(userdata.data.DefaultAddress);
						// if (userdata.data.stores.length > 0) {
						// 	AsyncStorage.setItem("StoreData", userdata.data.stores[0].id);
						// }

						AsyncStorage.getItem("cart").then((data) => {
							const JSON_data = JSON.parse(data);
							// console.log("!!!!!!!!!!!!!Cart Data From AsyncStorage!!!!!!!!!!");
							// console.log(JSON_data.items);
							// console.log(JSON_data.items);
							// console.log(Object.keys(JSON_data.items).length);
							setcartCount(Object.keys(JSON_data.items).length);
							// console.log("!!!!!!!!!!!!Cart ID!!!!!!!!!!!!!");
							// console.log(userdata.data.user.Cart.id);

							const payload = {
								items: JSON_data.items,
							};
							// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							// console.log(payload);

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
						});
						// Category
						axios
							.get("https://klick-api.onrender.com/category/getAll", {
								headers: {
									Authorization: "Bearer " + token,
								},
							})
							.then((res) => {
								setCategory({
									firstRow: res.data.data.slice(0, 4),
									secondRow: res.data.data.slice(5, 9),
									thirdRow: res.data.data.slice(8),
								});
							})
							.catch((err) => {});
					});
			});
		} else {
			setcartCount(0);
			AsyncStorage.getItem("cart").then((data) => {
				// console.log(
				// 	"!!!!!!!!!!!!!Cart Data From AsyncStorage Not Logged in!!!!!!!!!!"
				// );
				const JSON_data = JSON.parse(data);
				// console.log(JSON_data.items);
				// console.log(Object.keys(JSON_data.items).length);
				setcartCount(Object.keys(JSON_data.items).length);
			});

			axios
				.get("https://klick-api.onrender.com/product/")
				.then((res) => {
					// console.log("!!!!!!!!!!Products NOt Loggedin!!!!!!!");
					// console.log(res.data.data.products);
					setProductData(res.data.data.products);
				})
				.catch((err) => {
					console.log("!!!!!!!!!Axios Error!!!!!!!");
					console.log(res.err);
				});
			axios
				.get("https://klick-api.onrender.com/category/getAll", {})
				.then((res) => {
					// console.log(res.data.data);
					setCategory({
						firstRow: res.data.data.slice(0, 4),
						secondRow: res.data.data.slice(5, 9),
						thirdRow: res.data.data.slice(8),
					});
				})
				.catch((err) => {});
		}
		// }, [isLoggedIn]);
	}, []);

	const getStatus = () => {
		axios
			.get("https://klick-api.onrender.com/post/")
			.then((res) => {
				// console.log("!!!!!!!!!!!!!!Post NOt Loggedin!!!!!!!!!!!!!!!!!!");
				// console.log(res.data.data);
				setPostData(res.data.data);
				setLoading(false);
				// console.log(loading);
			})
			.catch((err) => {
				console.log("!!!!!!!!!!!!!!Post Error!!!!!!!!!!!!!!!!!!");
				console.log(err);
			});
	};

	const renderItem = ({ item }) => {
		return (
			<View
				style={{
					height: 40,
					width: 200,
					backgroundColor: "blue",
					marginBottom: 20,
				}}
			>
				<Text> {item.title}</Text>
			</View>
		);
	};

	const Badge = ({ count }) => {
		if (count === 0) {
			return null;
		}

		return (
			<View style={styles.badgeContainer}>
				<Text style={styles.badgeText}>{count}</Text>
			</View>
		);
	};

	// On Refresh event
	const onRefresh = () => {
		// Perform your refresh logic here
		setLoading(true);
		console.log("Refresh");
		getStatus();
		onChangeSearch("");
		getStores();

		if (isLoggedIn) {
			setcartCount(0);

			axios
				.get("https://klick-api.onrender.com/product/", {})
				.then((res) => {
					// console.log("!!!!!!!!!!Products Loggedin!!!!!!!");
					// console.log(res.data.data.products);
					setProductData(res.data.data.products);
				})
				.catch((err) => {
					console.log("!!!!!!!!!Axios Error Loggedin!!!!!!!");
					console.log(err);
				});
			AsyncStorage.getItem("token").then((token) => {
				// console.log("!!!!!!!!!!TOKEN!!!!!!!!");
				// console.log(token);
				axios
					.get("https://klick-api.onrender.com/auth/user", {
						headers: {
							Authorization: "Bearer " + token,
						},
					})
					.then((userdata) => {
						AsyncStorage.getItem("cart").then((data) => {
							const JSON_data = JSON.parse(data);
							// console.log("!!!!!!!!!!!!!Cart Data From AsyncStorage!!!!!!!!!!");
							// console.log(JSON_data.items);
							// console.log(JSON_data.items);
							// console.log(Object.keys(JSON_data.items).length);
							setcartCount(Object.keys(JSON_data.items).length);
							// console.log("!!!!!!!!!!!!Cart ID!!!!!!!!!!!!!");
							// console.log(userdata.data.user.Cart.id);

							const payload = {
								items: JSON_data.items,
							};
							// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							// console.log(payload);

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
						});
						// Category
						axios
							.get("https://klick-api.onrender.com/category/getAll", {
								headers: {
									Authorization: "Bearer " + token,
								},
							})
							.then((res) => {
								setCategory({
									firstRow: res.data.data.slice(0, 4),
									secondRow: res.data.data.slice(5, 9),
									thirdRow: res.data.data.slice(8),
								});
							})
							.catch((err) => {});

						// Address Check
						axios
							.get("https://klick-api.onrender.com/auth/user", {
								headers: {
									Authorization: "Bearer " + token,
								},
							})
							.then((userData) => {
								setcartCount(Object.keys(userData.data.user.Cart.items).length);
								const isEmptyObject = (obj) => {
									return Object.keys(obj).length === 0;
								};
								isEmptyObject(userData.data.DefaultAddress);
								// console.log(isEmptyObject(userData.data.DefaultAddress));
								if (isEmptyObject(userData.data.DefaultAddress) === true) {
									// navigation.navigate("addaddress");
									// setDefaultAddress(false);
								}
							})
							.catch((err) => {
								console.log(err);
							});
					});
			});
		} else {
			setcartCount(0);
			AsyncStorage.getItem("cart").then((data) => {
				// console.log(
				// 	"!!!!!!!!!!!!!Cart Data From AsyncStorage Not Logged in!!!!!!!!!!"
				// );
				const JSON_data = JSON.parse(data);
				// console.log(JSON_data.items);
				// console.log(Object.keys(JSON_data.items).length);
				setcartCount(Object.keys(JSON_data.items).length);
			});

			axios
				.get("https://klick-api.onrender.com/product/")
				.then((res) => {
					// console.log("!!!!!!!!!!Products NOt Loggedin!!!!!!!");
					// console.log(res.data.data.products);
					setProductData(res.data.data.products);
				})
				.catch((err) => {
					console.log("!!!!!!!!!Axios Error!!!!!!!");
					console.log(err);
				});
			axios
				.get("https://klick-api.onrender.com/category/getAll", {})
				.then((res) => {
					// console.log(res.data.data);
					setCategory({
						firstRow: res.data.data.slice(0, 4),
						secondRow: res.data.data.slice(5, 9),
						thirdRow: res.data.data.slice(8),
					});
				})
				.catch((err) => {});
		}
		setLoading(false);
	};

	return (
		<View>
			<SafeAreaView style={styles.droidSafeArea}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						paddingVertical: 10,
					}}
				>
					<View
						style={{
							marginLeft: 20,
						}}
					>
						<KlickLogo />
					</View>
					{isLoggedIn ? (
						<>
							{defaultAddress === false && (
								<TouchableOpacity
									style={{
										marginRight: 20,
										display: "flex",
										paddingHorizontal: 20,
										borderRadius: 10,
										justifyContent: "center",
										alignItems: "center",
										backgroundColor: "#FEDD00",
										height: 40,
									}}
									onPress={() => navigation.navigate("addaddress")}
								>
									<Text>Set Address</Text>
								</TouchableOpacity>
							)}
							<View style={{ paddingRight: 10 }}>
								<View style={styles.cart}>
									<TouchableOpacity
										// onPress={() => navigation.navigate("mycart")}
									>
										<AntDesign name="shoppingcart" size={40} color="black" />
										{/* {cartCount ? (
											<Badge count={cartCount} />
										) : (
											<Badge count={0} />
										)} */}
									</TouchableOpacity>
								</View>
							</View>
						</>
					) : (
						<>
							<TouchableOpacity
								style={{
									marginRight: 20,
									display: "flex",
									paddingHorizontal: 20,
									borderRadius: 10,
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "#FEDD00",
									height: 40,
								}}
								onPress={() => {
									navigation.navigate({
										name: "login",
										params: { id: null, route: "button" },
									});
								}}
							>
								<Text>Login</Text>
							</TouchableOpacity>
							<View style={{ paddingRight: 10 }}>
								<View style={styles.cart}>
									<TouchableOpacity
										// onPress={() => navigation.navigate("mycart")}
									>
										{/* <AntDesign name="shoppingcart" size={40} color="black" />
										{cartCount ? (
											<Badge count={cartCount} />
										) : (
											<Badge count={0} />
										)} */}
									</TouchableOpacity>
								</View>
							</View>
						</>
					)}
				</View>
				<ScrollView
					style={[styles.scrollView]}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					<View>
						<View
							style={{
								marginVertical: 10,
								flexDirection: "row",
								alignItems: "center",
								paddingHorizontal: 12,
							}}
						>
							<TextInput
								style={[styles.input, { flex: 1 }]}
								onChangeText={(text) => handleSearchInput(text)}
								// onChange={handleSearchInput}
								value={search}
								placeholder="Looking for something Amazing?"
							/>
							<Ionicons
								name="search-outline"
								size={24}
								color="#6A6B6C"
								style={{ marginRight: 8 }}
								onPress={() => {
									navigation.navigate({
										name: "searchResults",
										params: { query: search },
									});
									onChangeSearch("");
								}}
							/>
						</View>
						<View
							style={{
								// // position: "absolute",
								// top: 60,
								// left: 0,
								width: "100%",
								// backgroundColor: "red",
							}}
						>
							{search.length > 0 && searchResults.length > 0 ? (
								<View
									style={{
										paddingBottom: 30000,
									}}
								>
									{searchResults.map((result) => (
										<View
											style={{
												marginVertical: 15,
												width: "100%",
												flexDirection: "row",
												justifyContent: "center",
											}}
										>
											<Pressable
												onPress={() =>
													navigation.navigate({
														name: "productdetails",
														params: {
															id: result.id,
														},
													})
												}
											>
												<Text
													style={{
														fontSize: 20,
													}}
													key={result.id}
												>
													{result.name}
												</Text>
											</Pressable>
										</View>
									))}
								</View>
							) : (
								// Render the search results

								// Show a message when no results are found
								// <Text>No results found</Text>
								<View></View>
							)}
						</View>
					</View>

					{loading ? (
						<View>
							{/* <ActivityIndicator /> */}
							<LoadingScreen word={"Status Loading..."} />
							{/* <Text>Loading...</Text> */}
						</View>
					) : (
						postData && (
							<View>
								<FlatList
									style={{ marginTop: 20 }}
									data={postData}
									renderItem={({ item }) =>
										item?.posttype === "status" ? (
											<Item navigation={navigation} item={item} />
										) : (
											<></>
										)
									}
									keyExtractor={(item) => item.id}
									horizontal
								/>
							</View>
						)
					)}

					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							marginTop: 10,
							marginHorizontal: 20,
						}}
					>
						Categories
					</Text>
					{loading ? (
						<LoadingScreen word={"Categories Loading..."} />
					) : (
						<>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
									alignItems: "center",
								}}
							>
								{category &&
									category.firstRow.map((item) => (
										<CategoriesCard
											navigation={navigation}
											pic={{ uri: item.image }}
											label={item.name}
											route={"categories"}
											params={item.id}
										/>
									))}
							</View>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
									alignItems: "center",
									// marginHorizontal: 20,
									marginVertical: 40,
								}}
							>
								{category &&
									category.secondRow.map((item) => (
										<CategoriesCard
											navigation={navigation}
											pic={{ uri: item.image }}
											label={item.name}
											route={"categories"}
											params={item.id}
										/>
									))}
							</View>
							<View
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
									alignItems: "center",
									// marginHorizontal: 20,
									marginBottom: 40,
								}}
							>
								{category &&
									category.thirdRow.map((item) => (
										<CategoriesCard
											navigation={navigation}
											pic={{ uri: item.image }}
											label={item.name}
											route={"categories"}
											params={item.id}
										/>
									))}
								<View></View>
								<View></View>
								<View></View>
								<View></View>
							</View>
						</>
					)}

					<View
						style={{
							marginTop: 30,
						}}
					></View>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							marginTop: 20,
							marginHorizontal: 15,
						}}
					>
						Special Offers
					</Text>

					<View
						style={{
							height: 250,
						}}
					>
						<FlatList
							style={{ marginTop: 20 }}
							data={DATA2}
							renderItem={({ item }) => <SpecialCard navigation={navigation} />}
							keyExtractor={(item) => item.id}
							horizontal
						/>
					</View>

					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							marginTop: 20,
							marginHorizontal: 15,
						}}
					>
						Products
					</Text>
					{loading ? (
						<LoadingScreen word={"Products Loading..."} />
					) : (
						<View>
							{productData && (
								<>
									<FlatList
										style={{ marginTop: 20 }}
										data={productData}
										renderItem={({ item }) => (
											<SponsorCard item={item} navigation={navigation} />
										)}
										keyExtractor={(item) => item.id}
										horizontal
									/>
								</>
							)}
						</View>
					)}
					{/* <View style={{ marginTop: 100 }}></View> */}
					<Text
						style={{
							fontWeight: "500",
							fontSize: 20,
							marginTop: 20,
							marginHorizontal: 15,
						}}
					>
						Available Stores
					</Text>
					{loading ? (
						<View>
							<LoadingScreen word={"Available Stores Loading..."} />
						</View>
					) : (
						stores && (
							<FlatList
								style={{ marginTop: 20 }}
								data={stores}
								renderItem={({ item }) => (
									<ScrollCard item={item} navigation={navigation} />
								)}
								// renderItem={ScrollCard}
								keyExtractor={(item) => item.id}
							/>
						)
					)}
				</ScrollView>

				{/* Switch to Seller */}
				<TouchableOpacity
					onPress={() => {
						mode_data?.switchMode("vendor");
					}}
					style={{
						height: 42,
						width: 120,
						borderRadius: 20,
						backgroundColor: "#FEDD00",
						position: "absolute",
						alignItems: "center",
						justifyContent: "center",
						bottom: 180,
						right: 0,
					}}
				>
					<Text style={{ fontSize: 11 }}>Switch to Seller</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		marginTop: 80,
		justifyContent: "space-between",
		alignItems: "center",
	},
	stretch: {
		width: 50,
		height: 50,
		marginLeft: 30,

		borderRadius: 50,
	},
	location: {
		fontSize: 12,
		fontWeight: "400",
		color: "#98999A",
		marginHorizontal: 0,
	},
	central: {
		fontSize: 16,
		fontWeight: "500",
		color: "#0B0B0E",
		marginHorizontal: 0,
	},
	bellcover: {
		width: 50,
		height: 50,
		backgroundColor: "#E6E6FA",
		borderRadius: 50,
		marginLeft: 150,
	},
	bell: {
		marginHorizontal: 17,
		marginTop: 15,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		borderColor: "#98999A",
		borderRadius: 8,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#007FFF",
	},
	items: {
		// backgroundColor: '#f9c2ff',

		marginVertical: 8,
		marginHorizontal: 16,
		width: 46,
		height: 46,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#007FFF",
		// marginTop: 30,
	},
	item2: {
		backgroundColor: "#E6E6FA",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		width: 104,
		height: 46,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#007FFF",
	},
	title: {
		fontSize: 32,
		color: "#000",
	},
	mumcover: {
		width: 50,
		height: 50,
		backgroundColor: "#E6E6FA",
		borderRadius: 50,
		marginHorizontal: 20,
		marginTop: 20,
	},
	mum: {
		marginHorizontal: 10,
		marginTop: 10,
	},
	specialcard: {
		height: 184,
		width: 335,
		borderRadius: 16,
		backgroundColor: "#6C5FBC",
		marginTop: 20,
	},
	specialbigtext: {
		fontSize: 24,
		fontWeight: "500",
		color: "#FFF",
		marginHorizontal: 20,
		marginTop: 20,
	},
	specialsmalltext: {
		fontSize: 14,
		fontWeight: "400",
		color: "#FFF",
		marginHorizontal: 20,
		marginTop: 5,
	},
	specialinner: {
		height: 42,
		width: 118,
		borderRadius: 80,
		backgroundColor: "#FFF",
		marginTop: -20,
		marginHorizontal: 20,
	},
	specialimage: {
		marginHorizontal: 180,
		marginTop: -73,
	},
	droidSafeArea: {
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	cart: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: 10,
	},
	badgeContainer: {
		position: "absolute",
		top: -8,
		right: -8,
		minWidth: 16,
		height: 16,
		borderRadius: 8,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
	},
	badgeText: {
		color: "white",
		fontSize: 10,
		fontWeight: "bold",
	},
});

export default HomeContent;
