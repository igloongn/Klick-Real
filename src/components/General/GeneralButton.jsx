import React from "react";
import { View, Dimensions, StyleSheet, Image, Text } from "react-native";

function GeneralButton({
	navigation,
	onPress,
	message,
	backgroundColor,
	color,
	marginLeft,
	marginBottom,
	borderColor,
	height,
	width,
	marginHorizintal,
	size,
	top,
	marginTop,
}) {
	return (
		<View
			style={{
				...styles.button,
				backgroundColor: backgroundColor,
				borderColor: borderColor,
				height: height,
				width: width,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Text
				style={{
					// ...styles.buttontext,
					color: color,
					// marginLeft: marginLeft,
					fontSize: size,
				}}
			>
				{message}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 80,
		marginTop: 25,
		borderWidth: 1,
	},
	buttontext: {
		fontWeight: "400",
		fontSize: 20,
		color: "#FFFFFF",
		// marginTop: 18,
		// marginLeft: 130,
	},
});

export default GeneralButton;
