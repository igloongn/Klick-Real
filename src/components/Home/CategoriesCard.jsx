import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

function CategoriesCard({ navigation, route, pic, label }) {
	return (
		<TouchableOpacity onPress={() => navigation.navigate(route)}>
			<View style={styles.mumcover}>
				<Image style={styles.mum} source={pic} />
				<Text style={{ marginLeft: 5 }}>{label}</Text>
				{/* require('../../../assets/1.png') */}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	mumcover: {
		width: 50,
		height: 50,
		backgroundColor: "#E6E6FA",
		borderRadius: 50,
		marginTop: 20,
	},
	mum: {
		marginTop: 0,
		width: 70,
		height: 70,
		borderRadius: 10,
	},
});

export default CategoriesCard;
