import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ productDetails, navigation  }) => {
	const { name, price, quantity, images, description } = productDetails;
	return (
		<TouchableOpacity
		 onPress={() => navigation.navigate({name: 'productdetails', params:{
			id: productDetails.id
		 }})}
		 >
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
					marginVertical: 10,
					// height: Dimensions.get("screen").height,
					width: Dimensions.get("screen").width,
					height: 120,
					backgroundColor: "#ffffff", // Set the background color
					opacity: 0.8, // Adjust the opacity
					elevation: 5,
				}}
			>
				{/* Image */}
				<View
					style={{
						marginLeft: 10,
					}}
				>
					{images.length > 0 ? (
						<Image
							source={{
								uri: images[0],
							}} // Remote image source
							style={{ width: 100, height: 100, borderRadius: 20 }} // Set the width and height of the image
						/>
					) : (
						<Image
							source={{
								uri:
									"https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=1024x1024&w=is&k=20&c=9Qfj9S124ojed7s4OWu3a3vbbMC76QYkqczg4L4M-Sc=",
							}} // Remote image source
							style={{ width: 80, height: 80, borderRadius: 20 }} // Set the width and height of the image
						/>
					)}
				</View>
				{/* Middle */}
				<View
					style={{
						flex: 0.9,
						justifyContent: "space-around",
						// backgroundColor: 'red',
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: 500,
							marginVertical: 10,
						}}
					>
						{name}
					</Text>
					<Text
						style={{
							fontSize: 13,
							fontWeight: 300,
							marginBottom: 10,
						}}
					>
						{" "}
						{description}
					</Text>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								fontSize: 19,
								fontWeight: 500,
								color: "#0485E8",
							}}
						>
							{price}
						</Text>
						<View
							style={{
								backgroundColor: "#FFFCE5",
								borderRadius: 15,
								paddingHorizontal: 10,
							}}
						>
							<Text
								style={{
									fontSize: 13,
									color: "#988400",
								}}
							>
								Availablie Stock: {quantity.instock}{" "}
							</Text>
						</View>
					</View>
				</View>
				{/* third */}
				<Text
					style={
						{
							// alignSelf: 'top'
						}
					}
				>
					{/* T */}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ProductCard;
