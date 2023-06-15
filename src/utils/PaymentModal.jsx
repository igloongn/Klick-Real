import React from "react";
import { Alert, Modal, Pressable, StyleSheet, Text,  View } from "react-native";

const PaymentModal = ({
	text,
	secondText,
	button,
	state,
	setState,
	onPress,
	ButtonColor = "#FEDD00",
}) => {
	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={state}
				// onRequestClose={() => {
				// 	Alert.alert("Modal has been closed.");
				// 	setState(!state);
				// }}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						{/* <Text>ofnoe</Text> */}
						<Text style={styles.modalText}>{text}</Text>
						<Text style={styles.bodyModalText}>{secondText}</Text>
						<Pressable
							style={[styles.button, { backgroundColor: ButtonColor }]}
							onPress={() => {
								setState(!state);
								onPress();
							}}
						>
							<Text style={styles.textStyle}>{button}</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</View>
	);
};
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
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
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},

	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		fontSize: 20,
		textAlign: "center",
		fontWeight: "600"
	},	
	bodyModalText: {
		fontSize: 14,
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "400"
	},
});
export default PaymentModal;
