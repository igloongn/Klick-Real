import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const PopularCard = ({ item, navigation }) => {
	// console.log(item.images.length);
	return (
		<TouchableOpacity
			style={{
				padding: 10,
			}}
			onPress={() =>
				navigation.navigate({
					name: "productdetails",
					params: { id: item?.id },
				})
			}
		>
			<View style={styles.sponsoredcard}>
				{/* {item.images.length >= 1 ? (
				<Image
					style={styles.sponsoredimage}
					source={require("../../../assets/logoo.png")}
				/>
			) : ( */}
				{/* <Image style={styles.sponsoredimage} source={{ uri: item.images[0] }} /> */}
				<Image
					source={{ uri: item.images[0] }} // Replace with your image URL
					style={{ width: 150, height: 150, borderRadius: 20 }} // Set the desired width and height
				/>
				{/* )} */}
				<Text style={styles.sponsorbigtext}>{item.name}</Text>
				<View style={{ flexDirection: "row", display: "flex" }}>
					<Text style={styles.sponsorsmalltext}>
						{item.specifications.type}
					</Text>
					<Text style={styles.sponsorsmalltext}>₦{item.price}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	sponsoredcard: {
		height: 239,
		width: 193,
		borderRadius: 16,
		backgroundColor: "#FFF",
		marginTop: 20,
		marginHorizontal: 22,
	},
	sponsoredimage: {
		marginHorizontal: 20,
		// marginTop:-73,
		borderRadius: 16,
	},
	sponsorbigtext: {
		fontSize: 16,
		fontWeight: "500",
		color: "#000",
		marginHorizontal: 20,
		marginTop: 20,
	},
	sponsorsmalltext: {
		fontSize: 14,
		fontWeight: "400",
		color: "#6A6B6C",
		marginHorizontal: 20,
		marginTop: 5,
	},
});

export default PopularCard;
