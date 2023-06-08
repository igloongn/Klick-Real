import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import { Dimensions } from "react-native";
import GeneralButton from "../General/GeneralButton";
import { SvgUri } from "react-native-svg";
import OpenBox from "../../utils/SVGs/openBox";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import Product from "./Product";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProductList = () => {
	const navigation = useNavigation();
	const [userData, setUserData] = useState(null);
	const [productList, setProductList] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		getData = async () => {
			// axios.get('https://klick-api.onrender.com/product/store/product?')
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			const access_token = await AsyncStorage.getItem("token");
			const userData = jwtDecode(access_token);
			// console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
			// console.log(userData)
			// console.log(userData)
			// setUserData(userData)
			const res = await axios.get("https://klick-api.onrender.com/brand");
			// console.log(res.data.data)
			const Full = res.data.data;
			// console.log(Full)
			const store = Full.filter((res) => res.owner === userData.id);
			storeData = store[0];
			// console.log(storeData.id)
			const response = await axios.get(
				`https://klick-api.onrender.com/product/store/product?` + store[0].id,
				{
					headers: {
						Authorization: "Bearer " + access_token,
					},
				}
			);
			console.log(response.data.data);
			setProductList(response.data.data);
			setLoading(false);
		};
		getData();
	}, []);
	const renderCard = ({ item }) => {
		return (
			<Product
				item={item}
			/>
		);
	};
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
						{/* <Text>S</Text> */}
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
						{/* <Text>S</Text> */}
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
						<Text style={{ fontSize: 20 }}>{"+  "}</Text>
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
			{loading ? (
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
			) : (
				<View
					style={{
						flexDirection: "column",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: windowWidth,
					}}
				>
					<FlatList
						data={productList}
						renderItem={renderCard}
						keyExtractor={(item) => item.id}
					/>
				</View>
			)}
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
