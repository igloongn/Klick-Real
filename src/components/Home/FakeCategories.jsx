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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FakeCategories = ({ route }) => {
	const navigation = useNavigation();
	const [store, setStore] = useState(null);
	const [products, setProducts] = useState([]);
	const { id } = route.params;
	// console.log("!!!!!!!!!!!ID!!!!!!!!!!!!!");
	// console.log(id);

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
					// console.log("!!!!!!!!!!User Data!!!!!!!!");
					// console.log(storeData.id);
					axios
						.get(`https://klick-api.onrender.com/product/?category=${id}`, {
							headers: { Authorization: `Bearer ${token}` },
						})
						.then((data) => {
							// console.log("!!!!!!Product Data Yputube!!!!!!!");
							const productlist = data.data.data.products;
							// console.log(productlist);
							setProducts(productlist);
							// console.log(products);

						})
						.catch((error) => {
							console.log("!!!!!!!!!Axios Error!!!!!!!");
							console.log(error);
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
					paddingVertical: 10,
				}}
			>
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignContent: "center",
						width: "100%",
					}}
				>
					{/* Settings */}
					<TouchableOpacity
						style={{
							// width: 50,
							height: 50,
							// borderWidth: 1,
							borderColor: "#98999A",
							borderRadius: 10,
							alignSelf: "center",
							padding: 2,
						}}
					>
						{/* {products ? (
							products.length > 0 ? (
								<Text
									style={{
										fontSize: 24,
										fontWeight: "bold",
									}}
								>
									{products[0].category.name}
								</Text>
							)  :
						<Text
								style={{
									fontSize: 24,
									fontWeight: "bold",
								}}
							>
								{products[0].category.name}
							</Text>
						: (
							<Text
							style={{
								fontSize: 24,
									fontWeight: "bold",
								}}
							>
								{products[0].category.name}
							</Text>
						)
						) 
						
						} */}
						{products ? (
							products.length > 0 ? (
								<Text
									style={{
										fontSize: 24,
										fontWeight: "bold",
									}}
								>
									{products[0].category.name}
								</Text>
							) : (
								<Text
									style={{
										fontSize: 24,
										fontWeight: "bold",
									}}
								>
									{'No Product'}
								</Text>
							)
						) : (
							<Text
								style={{
									fontSize: 24,
									fontWeight: "bold",
								}}
							>
								{'Loading'}
							</Text>
						)}
					</TouchableOpacity>
				</View>
				<TouchableOpacity></TouchableOpacity>
			</View>
			{/* Body */}
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
								No Item in this Category...
							</Text>
							<Text
								style={{
									fontSize: 16,
									textAlign: "center",
									color: "#6A6B6C",
								}}
							>
								{/* You’re yet to add any product to your store. Products that you
								add will appear here */}
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
							Loading Category...
						</Text>
						<Text
							style={{
								fontSize: 16,
								textAlign: "center",
								color: "#6A6B6C",
							}}
						>
							{/* You’re yet to add any product to your store. Products that you add
							will appear here */}
						</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default FakeCategories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#FFF",
		alignItems: "center",
		// justifyContent: "center",
	},
});
