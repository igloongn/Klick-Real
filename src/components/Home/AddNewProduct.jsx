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
	// TextInput,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { AntDesign } from "@expo/vector-icons";
import ProductHeader from "./ProductHeader";
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "expo-image-loader";
import { ImagePicker } from "expo-image-multiple-picker";
import { base_url } from "../../utils/api";
import axios from "axios";
import MyModal from "../../utils/MyModal";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const AddNewProduct = ({ navigation }) => {
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const {width,height} = useWindowDimensions();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [total, setTotal] = useState("");
	const [instock, setInStock] = useState("");
	const [type, setType] = useState("");
	const [colors, setColors] = useState("");
	const [weight, setWeight] = useState("");
	const [length, setLength] = useState("");
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [Category, setCategory] = useState("");

	// From Mufasa
	// const [myStoreCat, setMyStoreCat] = useState(null);
	// const [shippingCategoryId, setShippingCategoryId] = useState("");
	// const [shippingCategory, setShippingCategory] = useState("");
	// const [localCategory, setLocalCategory] = useState("");
	const [listLocalCategory, setListLocalCategory] = useState(null);
	const [listShippingCategory, setListShippingCategory] = useState(null);
	const [localCategory, setLocalCategory] = useState(null);
	const [shippingCategory, setShippingCategory] = useState(null);
	const [user, setUser] = useState(null);

	const [listofCat, setListofCat] = useState([]);
	const [sheeplistofCat, setsheepListofCat] = useState([]);

	const [showGallery, setShowGallery] = useState(false);

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	const [fillAllFields, setFillAllFields] = useState(false);

	useEffect(() => {
		(async () => {
			const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus.status === "granted");
		})();
	}, []);

	useEffect(() => {

		AsyncStorage.getItem("token").then((token) => {
			// console.log(token);
			axios
				.get("https://klick-api.onrender.com/auth/user", {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
						// Add more headers as needed
					},
				})
				.then((user) => {
					const userData = user.data;
					// console.log("!!!!!!!!!user data!!!!!!!!!");
					// console.log(userData.stores[0].id);

					setUser(userData);
					
					axios
						.get("https://klick-api.onrender.com/product/shipping/category")
						.then((res) => {
							setListShippingCategory(res.data.data);
						})
						.catch((err) => {});
					axios
						// .get("https://klick-api.onrender.com/product/shipping/category")
						.get("https://klick-api.onrender.com/category/getAll")
						.then((res) => {
							setListLocalCategory(res.data.data);
						});
				});
		});
	}, []);

	const data = useMemo(
		() =>
			listofCat?.map((item) => {
				return { key: item?.id, value: item?.name };
			}),
		[listofCat]
	);

	const dataSheepbubble = useMemo(
		() =>
			sheeplistofCat?.map((item) => {
				return { key: item?.category_id, value: item?.category };
			}),
		[sheeplistofCat]
	);

	const selectCatId = useMemo(() => {
		const output = listofCat?.filter((item) => item?.name === Category);
		return output[0] ? output[0]?.id : "";
	}, [Category, listofCat]);

	// const shipCategoryId = useMemo(() => {
	// 	const output = sheeplistofCat?.filter(
	// 		(item) => item?.category === shipCategory
	// 	);
	// 	return output[0] ? output[0]?.category_id : "";
	// }, [shipCategory, sheeplistofCat]);

	const submit = async () => {
		if (
			name.length !== 0 &&
			description.length !== 0 &&
			price.length !== 0 &&
			total.length !== 0 &&
			instock.length !== 0 &&
			type.length !== 0 &&
			colors.length !== 0 &&
			weight.length !== 0 &&
			length.length !== 0 &&
			images.length !== 0
			// shipCategory.length !== 0
			// Category.length !== 0
		) {
			// let photo = { uri: source.uri}
			let formdata = new FormData();
			setIsLoading(true);

			formdata.append("name", name.trim());
			formdata.append("description", description.trim());
			formdata.append("price", price.trim());
			formdata.append("quantity[total]", total.trim());
			formdata.append("quantity[instock]", instock.trim());
			formdata.append("specifications[type]", type.trim());
			formdata.append("specifications[colors]", colors.trim());
			formdata.append(
				"specifications[shippingcategory_id]",
				shippingCategory.category_id
			);
			formdata.append("specifications[weight]", weight.trim());
			formdata.append("specifications[dimensions][length]", length.trim());
			formdata.append("specifications[dimensions][height]", height.trim());
			formdata.append("specifications[dimensions][width]", width.trim());
			formdata.append("shippingcategory", shippingCategory.category);
			images.forEach((element) => {
				formdata.append("images", {
					uri: element.uri,
					name: element?.filename,
					type: "image/jpg",
				});
			});
			// formdata.append.images

			// console.log("!!!!!!!Product Payload!!!!!!!!");
			// console.log({
			// 	name,
			// 	description,
			// 	price,
			// 	total,
			// 	instock,
			// 	type,
			// 	colors,
			// 	// shipCategoryId,
			// 	weight,
			// 	length,
			// 	width,
			// 	height,
			// 	// shipCategory,
			// 	images,
			// 	// selectCatId,
			// 	shippingCategory,
			// 	localCategory,
			// });

			// console.log("formd-23r6", formdata);

			try {
				const token = await AsyncStorage.getItem("token");
				// console.log("tok-1", token);
				// console.log(myStoreCat);
				// console.log("!!!!!!!!!!!!!!Create!!!!!!!!!!!");
				// console.log(myStoreCat);
				// console.log(localCategory);
				// console.log(user.stores[0].id);
				const url = `https://klick-api.onrender.com/product/?category=${localCategory}&storeId=${user.stores[0].id}`;
				// console.log(url);
				// const response = await fetch("https://klick-api.onrender.com/product/?category=039c6ea9-45d7-493f-beb1-fd74fb40399d", {
				const response = await fetch(url, {
					method: "POST",
					mode: "no-cors",
					headers: {
						"Content-Type": "multipart/form-data",
						// 'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: formdata,
				});

				const res_state = await response?.status;
				console.log("llls", res_state);
				const jsonRes = await response.json();
				console.log("!!!!!!!Product Details!!!!!!!!");
				console.log(jsonRes);
				if (parseInt(res_state) >= 200 && parseInt(res_state) < 203) {
					// const _data = await response?.json();
					const _data = await response?.data;
					//   // console.log('y', _data)
					//   Alert.alert('Success', 'Product added');
					//   // navigation.navigate('vendordash')
				} else {
					throw new Error("");
				}

				// Alert.alert("Success", "Product added");
				setSuccessModalVisible(true);
				setTimeout(() => {
					navigation.navigate("sellerstab");
				}, 2000);
			} catch (error) {
				// Handle network or other errors
				console.error("!!!!!!!Create Product Error!!!!!!!!");
				console.error(error);
				// Alert.alert("Error", "An error occured ");
				setFailedModalVisible(true);
			} finally {
				setIsLoading(false);
			}
		} else {
			setFillAllFields(true);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View
					style={
						{
							// display: "flex",
							// flexDirection: "column",
							// justifyContent: "center",
							// alignItems: "center",
							// backgroundColor: "red",
						}
					}
				>
					<ProductHeader name={"Product Information  "} />
					<View
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "flex-start",
							// alignItems: "center",
							// backgroundColor: "red",
							// paddingLeft: 30,
							// backgroundColor: "blue",
						}}
					>
						{/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
						<GeneralInput
							placeholder={"e.g Cuban chain"}
							name="Product Name *"
							width={335}
							value={name}
							onChangeValue={(text) => setName(text)}
						/>
						<GeneralInput
							name="Product Description *"
							width={335}
							height={150}
							value={description}
							onChangeValue={(text) => setDescription(text)}
						/>
						<GeneralInput
							placeholder={"e.g 2300"}
							name="Price *"
							width={335}
							value={price}
							onChangeValue={(text) => setPrice(text)}
							mode={"numeric"}
						/>
						<GeneralInput
							placeholder={"e.g 25"}
							name="Total Quantity *"
							width={335}
							value={total}
							onChangeValue={(text) => setTotal(text)}
							mode={"numeric"}
						/>
						<GeneralInput
							placeholder={"e.g 25"}
							name="Total Instock *"
							width={335}
							value={instock}
							onChangeValue={(text) => setInStock(text)}
							mode={"numeric"}
						/>
						<GeneralInput
							placeholder={"optional, e.g mens Shoes"}
							name="Specification Type *"
							width={335}
							value={type}
							onChangeValue={(text) => setType(text)}
						/>
						<GeneralInput
							placeholder={"options, e.g red,purple"}
							name="Colors *"
							width={335}
							value={colors}
							onChangeValue={(text) => setColors(text)}
						/>

						<GeneralInput
							placeholder={"in kg, e.g 2"}
							name="Weight *"
							width={335}
							value={weight}
							onChangeValue={(text) => setWeight(text)}
							mode={"numeric"}
						/>
						<GeneralInput
							placeholder={"in cm, e.g 35"}
							name="Length *"
							width={335}
							value={length}
							onChangeValue={(text) => setLength(text)}
							mode={"numeric"}
						/>
						<GeneralInput
							placeholder={"in cm, e.g 25"}
							name="Width *"
							width={335}
							value={width}
							onChangeValue={(text) => setWidth(text)}
							mode={"numeric"}
						/>
						<GeneralInput
							placeholder={"in cm, e.g 45"}
							name="Height *"
							width={335}
							value={height}
							onChangeValue={(text) => setHeight(text)}
							mode={"numeric"}
						/>

						{listLocalCategory && (
							<View style={{ marginTop: 20, width: 335 }}>
								<Text
									style={{
										fontSize: 13,
										marginBottom: 10,
										fontWeight: "500",
										fontSize: 16,
									}}
								>
									Category
								</Text>

								<Picker
									selectedValue={localCategory}
									onValueChange={(itemValue, itemIndex) => {
										setLocalCategory(itemValue);
										// console.log(itemValue);
									}}
								>
									{listLocalCategory.map((item, index) => (
										<Picker.Item label={item.name} value={item.id} />
									))}
								</Picker>
							</View>
						)}

						{listShippingCategory && (
							<View style={{ marginTop: 20, width: 335 }}>
								<Text
									style={{
										fontSize: 13,
										marginBottom: 10,
										fontWeight: "500",
										fontSize: 16,
									}}
								>
									Shipping Category
								</Text>

								<Picker
									selectedValue={shippingCategory}
									onValueChange={(itemValue, itemIndex) =>
										setShippingCategory(itemValue)
									}
								>
									{listShippingCategory.map((item, index) => (
										<Picker.Item label={item.category} value={item} />
									))}
								</Picker>
							</View>
						)}

						<View style={{ alignItems: "center" }}>
							<TouchableOpacity
								style={{
									height: 200,
									marginTop: 15,
									width: 335,
									borderWidth: 1,
									backgroundColor: "white",
									borderColor: "gray",
									borderStyle: "dashed",
									borderRadius: 50,
								}}
								title="pick Images"
								onPress={() => setShowGallery(true)}
							>
								{images && images.length > 0 ? (
									<Image
										style={{
											width: 335,
											height: 200,
											borderRadius: 50,
										}}
										source={{ uri: images[0]?.uri }}
									/>
								) : (
									<Text style={{ marginLeft: 120, marginTop: 40 }}>
										Select Images
									</Text>
								)}
							</TouchableOpacity>
						</View>

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

						<View style={{ marginTop: 70 }} />
					</View>
				</View>
			</ScrollView>
			{showGallery && (
				<View
					style={{
						position: "absolute",
						// top: 12,
						// height: "100%",
						height: Dimensions.get("screen").height / 1.3,
						width: Dimensions.get("screen").width,
						backgroundColor: "grey",
						// backgroundColor: "red",
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
			)}
			{/* Successful */}
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Product Successfully Added"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Login Failed Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={"An Error Occured"}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
			{/* Fill all form Modal */}
			<MyModal
				state={fillAllFields}
				setState={setFillAllFields}
				text={"Please fill in all fields"}
				button={"Try again"}
				ButtonColor={"#FEDD00"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#FFF",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default AddNewProduct;
