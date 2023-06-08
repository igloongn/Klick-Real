import React, { useState, useEffect, useMemo } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	FlatList,
	useWindowDimensions,
	Button,
	Image,
	ActivityIndicator,
	Dimensions,
	Alert,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { AntDesign } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-image-loader";
import { ImagePicker } from "expo-image-multiple-picker";
import { base_url } from "../../utils/api";
import axios from "axios";

const CreateStore = ({ navigation }) => {
	//   const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	//   const [showGallery, setShowGallery] = useState(false)
	const [storeName, setStoreName] = useState("");
	const [phone, setPhone] = useState("");
	const [industry, setIndustry] = useState("");
	const [address, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [postal, setPostal] = useState("");
	const [file, setFile] = useState(null);
	const [country, setCountry] = useState("");

    const [isLoading, setisLoading] = useState(true)

	useEffect(() => {}, []);

	const submit = async () => {
		// let formdata = new FormData();
		setIsLoading(true);

		// formdata.append("name", name)
		// formdata.append("description", description)
		// formdata.append("price", price)
		// formdata.append("quantity[total]", total)
		// formdata.append("quantity[instock]", instock)
		// formdata.append("specifications[type]", type)
		// formdata.append("specifications[colors]", colors)
		// formdata.append("specifications[shippingcategory_id]", shipCategoryId)
		// formdata.append("specifications[weight]",weight)
		// formdata.append("specifications[dimensions][length]", length)
		// formdata.append("specifications[dimensions][height]", height)
		// formdata.append("specifications[dimensions][width]", width)
		// formdata.append("shippingcategory", shipCategory)
		// images.forEach(element => {
		//   formdata.append("images", {
		//     uri: element.uri,
		//     name: element?.filename,
		//     type: 'image/jpg',
		//   })
		// });
		// formdata.append.images

		// console.log({
		//   name,
		//   description,
		//   price,
		//   total,
		//   instock,
		//   type,
		//   colors,
		//   shipCategoryId,
		//   weight,
		//   length,
		//   width,
		//   height,
		//   shipCategory,
		//   images,
		//   selectCatId,
		// })

		console.log("formd-23r6", formdata);

		try {
			const token = await AsyncStorage.getItem("token");
			// const response = await fetch("https://klick-api.onrender.com/product/?category=039c6ea9-45d7-493f-beb1-fd74fb40399d", {
			//   const response = await fetch(url, {
			//     method: "POST",
			//     mode: 'no-cors',
			//     headers: {
			//       'Content-Type': 'multipart/form-data',
			//       // 'Content-Type': 'application/json',
			//       'Authorization': `Bearer ${token}`
			//     },
			//     body: formdata

			//   })

			Alert.alert("Success", "Product added");
		} catch (error) {
			// Handle network or other errors
			console.error(error);
			Alert.alert("Error", "An error occured ");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<GeneralInput
					placeholder={"Nike"}
					name="Store Name *"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/>
				<GeneralInput
					placeholder={""}
					name="Store Name *"
					width={335}
					value={phone}
					onChangeValue={(text) => setStoreName(text)}
				/>
				<GeneralInput
					placeholder={"e.g Cuban chain"}
					name="Store Name *"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/>
				<GeneralInput
					placeholder={"e.g Cuban chain"}
					name="Store Name *"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/>
				<GeneralInput
					placeholder={"e.g Cuban chain"}
					name="Store Name *"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/>
				<GeneralInput
					placeholder={"e.g Cuban chain"}
					name="Store Name *"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/>
				<GeneralInput
					placeholder={"e.g Cuban chain"}
					name="Store Name *"
					width={335}
					value={storeName}
					onChangeValue={(text) => setStoreName(text)}
				/>
				{/* <View>
					<TouchableOpacity
						style={{
							height: 100,
							marginTop: 15,
							width: 335,
							marginHorizontal: 40,
							borderWidth: 1,
							backgroundColor: "white",
							borderColor: "gray",
							borderStyle: "dashed",
						}}
						title="pick Images"
						onPress={() => setShowGallery(true)}
					>
						<Text style={{ marginLeft: 120, marginTop: 40 }}>
							Select Images
						</Text>
					</TouchableOpacity>
				</View> */}
{/* 
				<TouchableOpacity onPress={() => submit()}>
					<GeneralButton
						backgroundColor={"#FEDD00"}
						message={isLoading ? "loading ...." : "Add Product"}
						width={335}
						height={54}
						borderColor={"#FEDD00"}
						marginLeft={150}
						top={15}
						marginHorizintal={40}
						marginTop={30}
					/>
				</TouchableOpacity>

				<View style={{ marginTop: 70 }} /> */}
			</ScrollView>
			{/* {showGallery && (
				<View
					style={{
						postion: "absolute",
						top: 0,
						height: Dimensions.get("screen").height,
						width: Dimensions.get("screen").width,
					}}
				>
					<ImagePicker
						onSave={(assets) => {
							setImages(assets);
							console.log(assets);
							setShowGallery(false);
						}}
						onCancel={() => setShowGallery(false)}
						limit={5}
					/>
				</View>
			)} */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		//   alignItems: 'center',
		justifyContent: "center",
	},
});

export default CreateStore;
