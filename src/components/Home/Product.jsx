import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Product = ({ item }) => {
	const { name, images, discount, price } = item;
	return (
		<View style={styles.card}>
			{/* Image */}
			<Image
				source={{
					uri: images[0],
				}}
				style={{
                    alignSelf: "center",
                    borderRadius: 10,
					width: 70,
					height: 70,
				}}
			/>
			
			<View
				style={{
					display: "flex",
					flexDirection: "column",
                    marginLeft: 10,
				}}
			>
				<Text style={styles.title}>{name}</Text>
				<Text style={{}}>D: {discount}</Text>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<Text style={{fontSize: 14}}>{price}</Text>
				</View>
			</View>
			{/* <Text style={styles.description}>{2}</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		marginBottom: 30,
		elevation: 10,
		// backgroundColor: "red",
		width: windowWidth,
		marginHorizontal: 10,
		display: "flex",
		flexDirection: "row",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
	},
});

export default Product;
