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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductList = () => {
	const navigation = useNavigation();
	const [store, setStore] = useState(null);
	const [products, setProducts] = useState([])

	useEffect(() => {
		// axios.get('https://klick-api.onrender.com/product/store/product?storeId=')
		AsyncStorage.getItem("token").then((token) => {
			console.log("!!!!!!!!!!Token Inside!!!!!!!!!");
			console.log(token);
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
					console.log("!!!!!!!!!!User Data!!!!!!!!");
					console.log(storeData.id);
					axios
						.get(
							`https://klick-api.onrender.com/product/store/product?storeId=${storeData.id}`,
							{ headers: { Authorization: `Bearer ${token}` } }
						)
						.then((data) => {
							console.log("!!!!!!Product Data!!!!!!!");
							console.log(data.data.data);
							setProducts(data.data.data);
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
							borderWidth: 1,
							borderColor: "#98999A",
							borderRadius: 10,
						}}
					>
						<Text></Text>
					</TouchableOpacity>
					{/* Settings */}
					<TouchableOpacity
						style={{
							width: 50,
							height: 50,
							borderWidth: 1,
							borderColor: "#98999A",
							borderRadius: 10,
						}}
					>
						<Text></Text>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("addnewproduct")}>
					<View
						style={{
							backgroundColor: "#273B4A",
							borderRadius: 80,
							borderColor: "#808080",
							borderWidth: 1,
							backgroundColor: "#FEDD00",
							borderColor: "#FEDD00",
							width: 200,
							height: 54,
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
							paddingHorizontal: 10,
						}}
					>
						<Text style={{ fontSize: 20 }}>{"+   "}</Text>
						<Text
							style={{
								fontWeight: "500",
								fontSize: 15,
								color: "black",
								// marginTop: 18,
								// marginLeft: 130,
							}}
						>
							Add New Product
						</Text>
					</View>
					{/* <GeneralButton
						backgroundColor={"#FEDD00"}
						message={"Add New Product"}
						width={200}
						height={54}
						borderColor={"#FEDD00"}
					/> */}
				</TouchableOpacity>
			</View>
			{/* Body */}
			<ScrollView>
				{products.length > 0 ? (
					<View>
						<Text
							style={{
								fontSize: 25,
								fontWeight: 400,
								textAlign: "center",
							}}
						>
							Store Exist
						</Text>
						<Text
							style={{
								fontSize: 16,
								textAlign: "center",
								color: "#6A6B6C",
							}}
						>
							You’re yet to add any product to your store. Products that you add
							will appear here
						</Text>
					</View>
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
							No Product Found
						</Text>
						<Text
							style={{
								fontSize: 16,
								textAlign: "center",
								color: "#6A6B6C",
							}}
						>
							You’re yet to add any product to your store. Products that you add
							will appear here
						</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
};

export default ProductList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#FFF",
		alignItems: "center",
		// justifyContent: "center",
	},
});
