import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = ({ word }) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#0000ff" />
			<Text style={styles.text}>{word}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		marginTop: 16,
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default LoadingScreen;
