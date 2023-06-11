import React from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const ShipSeller = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={{ textAlign: "center", marginTop: 50, fontSize: 30 }}>
				Ship With Seller
			</Text>
			<View
				style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
			>
				<AntDesign
					style={{ marginLeft: 30, marginTop: 30 }}
					name="phone"
					size={24}
					color="black"
				/>
				<Text style={{ marginTop: 30, fontSize: 20, marginLeft: 20 }}>
					09062056518
				</Text>
			</View>
			<Ionicons
				style={{ marginTop: 30, marginLeft: 30 }}
				name="logo-whatsapp"
				size={30}
				color="green"
			/>
			<AntDesign
				style={{ marginTop: 30, marginLeft: 30 }}
				name="instagram"
				size={30}
				color="pink"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		//   alignItems: 'center',
		//justifyContent: 'center',
	},
});

export default ShipSeller;
