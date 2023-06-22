import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Linking,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import GeneralButton from "../General/GeneralButton";
import SponsorCard from "./SponsorCard";
import PopularCard from "./PopularCard";
import axios from "axios";
import { Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

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
];

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ShopPage = ({ navigation, route }) => {
	const [toggle, setToggle] = useState(true);

	// const [data, setData] = useState([]);
	const [storeData, setStoreData] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [storeDetailexpanded, setStoreDetailExpanded] = useState(false);
	const toggleAccordion = () => setExpanded(!expanded);
	const StoreDetailtoggleAccordion = () =>
		setStoreDetailExpanded(!storeDetailexpanded);

	const handleExternalLinkWhatsApp = async (url) => {
		// Check if the device supports opening the URL
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			// Open the URL in the device's default browser
			await Linking.openURL(url);
		} else {
			console.log(`Cannot open URL: ${url}`);
		}
	};
	// const route = useRoute();
	const { id } = route.params;
	console.log(route);

	const [textExpanded, setTextExpanded] = useState(false);

	const toggleReadMore = () => {
		setTextExpanded(!textExpanded);
	};

	const RenderContent = ({ text }) => {
		if (text.length <= 10 || textExpanded) {
			return (
				<Text
					style={{
						fontWeight: "400",
						fontSize: 14,
						color: "#6A6B6C",
						marginTop: 5,
						marginHorizontal: 15,
					}}
				>
					{text}
				</Text>
			);
		}

		const truncatedText = text.substring(0, 129) + "...";

		return (
			<View>
				<Text
					style={{
						fontWeight: "400",
						fontSize: 14,
						color: "#6A6B6C",
						marginTop: 5,
						marginHorizontal: 15,
					}}
				>
					{truncatedText}
				</Text>
				<TouchableOpacity onPress={toggleReadMore}>
					<Text style={{ color: "blue", marginTop: 5 }}>Read more</Text>
				</TouchableOpacity>
			</View>
		);
	};

	useEffect(() => {
		axios
			.get("https://klick-api.onrender.com/brand/" + id)
			.then((res) => {
				setStoreData(res.data.data);
				console.log("!!!!!!!!Store Data!!!!!!!!!!");
				console.log(res.data.data);
				console.log(`https://wa.me/+234${storeData.businessPhone}`);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<View style={styles.container}>
			{storeData && (
				<ScrollView>
					<Image
						style={{ width: "100%", height: 300 }}
						resizeMode="cover" // or resizeMode="stretch" if you want to stretch the image
						source={{ uri: storeData.logo }}
					/>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-around",
							paddingTop: 30,
							paddingBottom: 10,
							marginLeft: 12,
						}}
					>
						<Image
							style={{
								height: 40,
								width: 40,
								marginRight: 10,
								display: "none",
							}}
							source={require("../../../assets/Ellipse.png")}
						></Image>
						<View style={{ flex: 5, marginLeft: 10 }}>
							<Text
								style={{
									fontWeight: "600",
									fontSize: 20,
									color: "#0B0B0E",
									marginHorizontal: 5,
									marginLeft: 10,
								}}
							>
								{storeData?.name}
							</Text>
							{/* <Text style={styles.location}>Ikoyi, Lagos</Text> */}
						</View>
						<TouchableOpacity
							style={{ paddingRight: 22 }}
							// onPress={(toggle) => setToggle(!toggle)}
							onPress={() => StoreDetailtoggleAccordion()}
						>
							<SimpleLineIcons
								style={styles.shift}
								name="arrow-down"
								size={17}
								color="black"
							/>
						</TouchableOpacity>
					</View>

					{storeDetailexpanded && (
						<View
							style={{
								backgroundColor: "white",
								// height: 180,
								// borderTopLeftRadius: 30,
								// borderTopRightRadius: 30,
							}}
						>
							<TouchableOpacity onPress={() => StoreDetailtoggleAccordion()}>
								<View
									style={{
										height: 5,
										width: 60,
										backgroundColor: "#E1E1E1",
										borderRadius: 5,
									}}
								></View>
							</TouchableOpacity>
							{/* <View style={{}}>
								<Image
									style={{}}
									source={require("../../../assets/Ellipse.png")}
								></Image>
								<View style={{ marginTop: 5 }}>
									<Text style={{}}>The Cuddle Club</Text>
									<Text style={styles.location}>Ikoyi, Lagos</Text>
								</View>
								<GeneralButton
									style={styles.shift}
									message="Contact"
									backgroundColor={"#iFEDD00"}
									color="black"
									width={89}
									height={42}
									borderColor={"#FEDD00"}
									size={15}
									top={10}
									marginLeft={20}
									marginTop={0}
									marginHorizintal={65}
								/>
							</View> */}

							<Text
								style={{
									fontWeight: "500",
									fontSize: 20,
									marginTop: 20,
									marginHorizontal: 15,
								}}
							>
								Overview
							</Text>
							{/* <Text
								style={{
									fontWeight: "400",
									fontSize: 14,
									color: "#6A6B6C",
									marginTop: 5,
									marginHorizontal: 15,
								}}
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua ut
								enim adtempor incididunt ut laboa...
							</Text> */}
							<RenderContent
								text={
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim adtempor incididunt ut laboa..."
								}
							/>
							<Text
								style={{
									fontWeight: "400",
									fontSize: 16,
									marginTop: 10,
									marginHorizontal: 15,
								}}
							>
								Monday - Friday:
							</Text>
							<Text
								style={{
									fontWeight: "400",
									fontSize: 16,
									marginTop: 0,
									marginHorizontal: 15,
								}}
							>
								Saturday - Sunday:
							</Text>
						</View>
					)}

					<TouchableOpacity
						onPress={() => toggleAccordion()}
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<GeneralButton
							style={styles.shift}
							message="Contact Seller"
							backgroundColor={"#iFEDD00"}
							color="black"
							width={335}
							height={50}
							borderColor={"#FEDD00"}
							size={15}
							top={10}
							marginLeft={120}
							marginTop={80}
							marginHorizintal={25}
						/>
					</TouchableOpacity>
					{expanded && (
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								padding: 20,
							}}
						>
							<TouchableOpacity
								onPress={() =>
									handleExternalLinkWhatsApp(
										`https://wa.me/+234${storeData.businessPhone}`
									)
								}
								style={{
									marginVertical: 10,
								}}
							>
								<Text>
									<FontAwesome name="whatsapp" size={24} color="black" />
									{"  WhatsApp"}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => console.log("Instagram Link Clicked")}
								style={{
									marginVertical: 10,
								}}
							>
								<Text>
									<AntDesign name="instagram" size={24} color="black" />
									{"  Instagram"}:{/* Mufasa */}
								</Text>
							</TouchableOpacity>
						</View>
					)}
					<Text
						style={{
							fontSize: 20,
							fontWeight: "600",
							marginHorizontal: 20,
							marginVertical: 10,
						}}
					>
						Popular
					</Text>

					<FlatList
						style={{}}
						data={DATA2}
						renderItem={({ item }) => (
							<PopularCard
								name={"Play Mat"}
								location={"N20,000"}
								rate={"4.8(1.2k)"}
							/>
						)}
						keyExtractor={(item) => item.id}
						horizontal
					/>

					<Text
						style={{
							fontSize: 20,
							fontWeight: "600",
							marginLeft: 20,
							marginVertical: 20,
						}}
					>
						Recommended Products
					</Text>

					<View style={{ marginBottom: 30, paddingLeft: 30 }}>
						<Image
							style={styles.orderpic}
							source={require("../../../assets/orderpic.png")}
						></Image>
						<Text
							style={{
								marginHorizontal: 125,
								marginTop: -95,
								fontWeight: "500",
								fontSize: 17,
							}}
						>
							HD SLR Camera
						</Text>
						<Text
							style={{
								color: "#0485E8",
								marginHorizontal: 125,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							N20,000
						</Text>
						<Text
							style={{
								marginHorizontal: 125,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							QTY:2
						</Text>
					</View>

					<View style={{ marginBottom: 30, paddingLeft: 30 }}>
						<Image
							style={styles.orderpic}
							source={require("../../../assets/orderpic.png")}
						></Image>
						<Text
							style={{
								marginHorizontal: 125,
								marginTop: -95,
								fontWeight: "500",
								fontSize: 17,
							}}
						>
							HD SLR Camera
						</Text>
						<Text
							style={{
								color: "#0485E8",
								marginHorizontal: 125,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							N20,000
						</Text>
						<Text
							style={{
								marginHorizontal: 125,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							QTY:2
						</Text>
					</View>

					<View style={{ marginBottom: 30, paddingLeft: 30 }}>
						<Image
							style={styles.orderpic}
							source={require("../../../assets/orderpic.png")}
						></Image>
						<Text
							style={{
								marginHorizontal: 125,
								marginTop: -95,
								fontWeight: "500",
								fontSize: 17,
							}}
						>
							HD SLR Camera
						</Text>
						<Text
							style={{
								color: "#0485E8",
								marginHorizontal: 125,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							N20,000
						</Text>
						<Text
							style={{
								marginHorizontal: 125,
								fontWeight: "500",
								fontSize: 15,
								marginTop: 5,
							}}
						>
							QTY:2
						</Text>
					</View>

					<View style={{ marginTop: 70 }} />
				</ScrollView>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF",
		flex: 1,
	},
	// row: {
	// 	display: "flex",
	// 	flexDirection: "row",
	// 	marginTop: 20,
	// },
	// row3: {
	// 	display: "flex",
	// 	flexDirection: "row",
	// 	marginTop: 20,
	// 	flex: 1,
	// 	// backgroundColor: 'red',
	// 	// rowGap: 10,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// row2: {
	// 	display: "flex",
	// 	flexDirection: "row",
	// 	marginTop: 30,
	// },
	// stretch: {
	// 	width: 50,
	// 	height: 50,
	// 	marginHorizontal: 10,

	// 	borderRadius: 50,
	// },
	// location: {
	// 	fontSize: 12,
	// 	fontWeight: "400",
	// 	color: "#98999A",
	// 	marginHorizontal: 5,
	// },
	// central: {
	// 	fontSize: 16,
	// 	fontWeight: "500",
	// 	color: "#0B0B0E",
	// 	marginHorizontal: 5,
	// },
	// shift: {
	// 	marginLeft: 120,
	// 	marginTop: 0,
	// },
	// orderpic: {
	// 	width: 102,
	// 	height: 102,
	// 	marginHorizontal: 10,
	// 	marginTop: 15,
	// 	borderRadius: 10,
	// },
});

export default ShopPage;
