import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	Alert,
	Modal,
	Dimensions,
	Image,
	ActivityIndicator,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSellerOnboardingContext } from "./SellerOnboarding";
import { ImagePicker } from "expo-image-multiple-picker";

const SellerAddLogo = ({ navigation, prevStage, nextStage, loading }) => {
	const { setFile, file, submit } = useSellerOnboardingContext();
	const [showGallery, setShowGallery] = useState(false);

	return (
		<>
			<View style={{ ...styles.container }}>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						paddingHorizontal: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => setShowGallery(true)}
						style={{
							height: 200,
							width: 200,
							borderRadius: 50,
							marginTop: 30,
							marginBottom: 30,
							// padding: '13%',
							borderWidth: file && file.length > 0 ? 0 : 1,
							borderColor: file && file.length > 0 ? "none" : "black",
							borderStyle: "dashed",
							backgroundColor: "#E1E1E1",
							// backgroundColor: "red",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{file && file.length > 0 ? (
							<Image
								style={{
									width: 200,
									height: 200,
									borderRadius: 50,
								}}
								source={{ uri: file[0]?.uri }}
							/>
						) : (
							// <Ionicons
							// 	name="person-add-outline"
							// 	size={24}
							// 	color="black"
							// 	style={{ marginLeft: 35, marginTop: 35 }}
							// />
							<Text
								style={{
									fontSize: 20,
								}}
							>
								Tap Here
							</Text>
						)}
					</TouchableOpacity>

					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
							marginTop: 50,
						}}
					>
						Add your Business Logo
					</Text>
					<Text
						style={{
							fontWeight: "400",
							fontSize: 14,
							color: "#6A6B6C",
							marginTop: 10,
						}}
					>
						This will represent your profile photo. It will help users on Makten
						to easily discover you and connect with you.
					</Text>

					{/* <View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "flex-end",
							alignItems: "center",
							marginTop: 20,
							paddingTop: 40,
							// paddingBottom: 10,
							width: "100%",
						}}
					>
						<TouchableOpacity onPress={() => submit()}>
							{!loading && (
								<Text
									style={{
										fontSize: 16,
										paddingRight: 30,
									}}
								>
									Skip Image
								</Text>
							)}
						</TouchableOpacity>
					</View> */}
					{/* <GeneralInput placeholder={""} name="Business Logo" width={335} value={file} onChangeValue={text => setFile(text)} /> */}
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							// marginTop: 20,
							// paddingTop: 40,
							paddingBottom: 100,
						}}
					>
						<TouchableOpacity
							style={{
								marginRight: 10,
							}}
							onPress={() => prevStage()}
						>
							<GeneralButton
								backgroundColor={"#FEDD00"}
								message={"Previous"}
								width={160}
								height={54}
								borderColor={"#FEDD00"}
								marginLeft={130}
								top={15}
								marginHorizintal={40}
								marginTop={30}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => submit()}>
							{!loading ? (
								<GeneralButton
									backgroundColor={"#FEDD00"}
									message={"Finish"}
									width={160}
									height={54}
									borderColor={"#FEDD00"}
									marginLeft={130}
									top={15}
									marginHorizintal={40}
									marginTop={30}
								/>
							) : (
								<View
									style={{
										backgroundColor: "#FEDD00",
										width: 160,
										height: 54,
										// marginLeft: 130,
										borderRadius: 80,
										marginTop: 25,
										// borderWidth: 1,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<ActivityIndicator />
								</View>
							)}
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{showGallery && (
				<View
					style={{
						backgroundColor: "grey",
						// position: "absolute",
						position: "absolute",

						marginTop: 200,
						// bottom: Dimensions.get("screen").height/ 1.3,
						height: Dimensions.get("screen").height / 1.3,
						// height: Dimensions.get("screen").height,
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
						limit={1}
					/>
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#FFF",

		// 	  alignItems: 'center',
		// 	justifyContent: 'center',
		// paddingHorizontal: 20
		marginTop: 50,
	},
	centeredView: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		width: 330,
		height: 330,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		// backgroundColor:"#FEDD00",
		width: 200,
		height: 54,
		marginTop: 30,
	},
	buttonOpen: {
		// backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: "#FEDD00",
	},
	textStyle: {
		color: "#0B0B0E",
		fontWeight: "bold",
		textAlign: "center",
		paddingTop: 10,
	},
});

export default SellerAddLogo;
