import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import GeneralButton from "../General/GeneralButton";
import { SvgUri } from "react-native-svg";
import OpenBox from "../../utils/SVGs/openBox";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "./ProductCard";
import LoadingScreen from "../../utils/MyLoading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SeacrhResult = ({ route }) => {
	const navigation = useNavigation();
	const [store, setStore] = useState(null);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const { query } = route.params;
	// console.log("!!!!!!!!!!!Query!!!!!!!!!!!!!");
	// console.log(query);

	useEffect(() => {
		// axios.get('https://klick-api.onrender.com/product/store/product?storeId=')
		AsyncStorage.getItem("token").then((token) => {
			// console.log("!!!!!!!!!!Token Inside!!!!!!!!!");
			// console.log(token);
			fetch(`https://klick-api.onrender.com/auth/user`, {
				method: "GET",
				mode: "no-cors",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((userresponse) => userresponse.json())
				.then((userdata) => {
					const storeData = userdata.stores[0];
					setStore(storeData);
					// console.log("!!!!!!!!!!User Data!!!!!!!!");
					// console.log(storeData.id);
					axios
						// .get(`https://klick-api.onrender.com/product/`, {
						.get(`https://klick-api.onrender.com/product/?q=${query}`, {
							headers: { Authorization: `Bearer ${token}` },
						})
						.then((data) => {
							// console.log("!!!!!!Product Data!!!!!!!");
							// const productlist = data.data.data.products.filter(
							// 	(item) => item.name === query
							// );
							// console.log(data.data.data.products);
							setProducts(data.data.data.products);
							setLoading(false);

							// console.log("!!!!!!Product Data!!!!!!!");
							// console.log(data.data.data.products.map(item=> item.name = query));
							// setProducts(data.data.data.products.map(item=> item.name = query));
						})
						.catch((error) => {
							console.log("!!!!!!!!!Axios Error!!!!!!!");
							console.log(error);
							setLoading(false);
						});
				});
		});
	}, []);
	return (
		<View style={styles.container}>
			<View
				style={{
					display: "flex",
					borderTopWidth: 1,
					borderBottomWidth: 1,
					borderColor: "#98999A",
					width: windowWidth,
					flexDirection: "row",
					justifyContent: "space-around",
					paddingVertical: 6,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						width: "30%",
					}}
				>
					{/* Search */}
					<TouchableOpacity
						style={{
							width: 50,
							height: 50,
							// borderWidth: 1,
							borderColor: "#98999A",
							borderRadius: 10,
						}}
					>
						<Text></Text>
					</TouchableOpacity>
					{/* Settings */}
					{/* <TouchableOpacity
						style={{
							width: 50,
							height: 50,
							// borderWidth: 1,
							borderColor: "#98999A",
							borderRadius: 10,
						}}
					>
						<Text></Text>
					</TouchableOpacity> */}
				</View>
				{!loading && (
					<TouchableOpacity>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
							}}
						>
							{query}
						</Text>
					</TouchableOpacity>
				)}
			</View>
			{/* Body */}
			{loading ? (
				<View
					style={
						{
							// backgroundColor: "red",
							// flex: 1,
							// marginTop: 80,
						}
					}
				>
					<LoadingScreen word={`${query} Data Loading....`} />
				</View>
			) : (
				<ScrollView>
					{products ? (
						products.length > 0 ? (
							products.map((item) => (
								<ProductCard productDetails={item} navigation={navigation} />
							))
						) : (
							<View>
								<OpenBox />
								<Text
									style={{
										fontSize: 25,
										fontWeight: 400,
										textAlign: "center",
									}}
								>
									Search Not Found
								</Text>
								<Text
									style={{
										fontSize: 16,
										textAlign: "center",
										color: "#6A6B6C",
									}}
								>
									You’re yet to add any product to your store. Products that you
									add will appear here
								</Text>
							</View>
						)
					) : (
						<View>
							<OpenBox />
							<Text
								style={{
									fontSize: 25,
									fontWeight: 400,
									textAlign: "center",
								}}
							>
								Search Not Found
							</Text>
							<Text
								style={{
									fontSize: 16,
									textAlign: "center",
									color: "#6A6B6C",
								}}
							>
								You’re yet to add any product to your store. Products that you
								add will appear here
							</Text>
						</View>
					)}
				</ScrollView>
			)}
		</View>
	);
};

export default SeacrhResult;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#FFF",
		alignItems: "center",
		// justifyContent: "center",
	},
});
