import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	Alert,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImagePicker } from "expo-image-multiple-picker";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import MyModal from "../../utils/MyModal";

const CreatePost = ({ navigation }) => {
	const [text, setText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [showGallery, setShowGallery] = useState(false);
	const [file, setFile] = useState([]);
	const [user, setUser] = useState(null);

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);

	useEffect(() => {}, []);

	const onSubmit = async () => {
		setIsLoading(true);
		let formdata = new FormData();
		file.forEach((element) => {
			formdata.append("files", {
				uri: element.uri,
				name: element?.filename,
				type: "image/jpg",
			});
		});
		formdata.append("post_type", "ksocial");
		formdata.append("caption", text);
		console.log("!!!!!!!!Normal Post Form Data!!!!!");
		console.log("--form", formdata._parts);

		try {
			const token = await AsyncStorage.getItem("token");
			console.log("tok", token);

			const storeID = await AsyncStorage.getItem("StoreData");
			const response = await fetch(
				`https://klick-api.onrender.com/post/?storeId=${storeID}`,
				{
					method: "POST",
					mode: "no-cors",
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${token}`,
					},
					body: formdata,
				}
			);
			if (response?.status >= 200 && response?.status < 203) {
				const _data = await response.json();
				console.log("y----", _data);
				// Alert.alert("Success", "Status added successfully");
				setSuccessModalVisible(true);
				setTimeout(() => {
					navigation.pop();
				}, 3000);

				// navigation.navigate('sellerksocialcontent')
			} else {
				throw Error("statsuc code not 200");
			}
		} catch (error) {
			// Handle network or other errors
			console.error(error);
			// Alert.alert("Error", "An error occured ");
			setFailedModalVisible(true);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			{isLoading && (
				<View
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "rgba(240,240,240,0.1)",
						postion: "absolute",
						marginLeft: -10,
						marginTop: -50,
						height: Dimensions.get("screen").height,
						width: Dimensions.get("screen").width,
					}}
				>
					<ActivityIndicator size={60} />
					<Text>Uploading your status ......</Text>
				</View>
			)}
			{showGallery && (
				<View
					style={{
						backgroundColor: "white",
						postion: "absolute",
						marginLeft: -10,
						marginTop: -50,
						height: Dimensions.get("screen").height,
						width: Dimensions.get("screen").width,
					}}
				>
					<ImagePicker
						onSave={(assets) => {
							setFile(assets);
							console.log(assets);
							setShowGallery(false);
						}}
						onCancel={() => setShowGallery(false)}
						limit={3}
					/>
				</View>
			)}

			<View style={styles.container}>
				<View
					style={{
						marginRight: 25,
						marginBottom: 25,
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItem: "center",
					}}
				>
					<TouchableOpacity
						onPress={() => {
							setShowGallery(true);
							console.log("Pressed");
						}}
						style={{
							height: 60,
							width: 60,
							borderRadius: 50,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{<FontAwesome name="photo" size={24} color="black" />}
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onSubmit()}
						style={{
							borderRadius: 10,
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<Text style={{ color: "blue", fontSize: 20, right: 20 }}>Post</Text>
					</TouchableOpacity>
				</View>
				<TextInput
					style={{ ...styles.input, border: "none" }}
					onChangeText={(text) => setText(text)}
					placeholder={"|What do you want to talk about?"}
					// secureTextEntry={password}
					value={text}
					multiline={true}
					numberOfLines={4}
					leftIcon={<AntDesign name="user" size={24} color="black" />}
				/>
			</View>

			<View
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{/* <Text>Uploaded image</Text> */}
				<Image
					style={{ width: 300, height: 100 }}
					source={{ uri: file[0]?.uri ? file[0]?.uri : "" }}
				></Image>
			</View>
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Status added successfully"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Login Failed Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={"An error occured "}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 25,
		marginLeft: 42,
		//backgroundColor:"white"
	},
	text: {
		fontSize: 13,
		marginBottom: 10,
		fontWeight: "500",
		fontSize: 16,
	},
	input: {
		// height: 432,
		padding: 10,
		// backgroundColor: "#F8F8F8",
		//borderColor: '#BABABA',
		// borderRadius: 10,
		width: 333,
		// borderWidth: 1,
		// borderColor: '#C4C4C4'
	},
	desc: {
		height: 135,
	},
});

export default CreatePost;
