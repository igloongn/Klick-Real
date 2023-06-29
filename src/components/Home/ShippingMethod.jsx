import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Button,
	Pressable,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import PaymentModal from "../../utils/PaymentModal";

const ShippingMethod = ({ navigation, route }) => {
	// const { checkoutData, cartDetail, addressPayload } = route.params;
	const { checkoutData, cartDetail, addressPayload, item } = route.params;
	// console.log("!!!!!!!!!!!!!!!!!!!!");
	// console.log(cartDetail);
	// console.log(addressPayload);
	const [shipWithSellerModal, setShipWithSellerModal] = useState(false);
	const [shipWithKshipModal, setShipWithKshipModal] = useState(false);
	const [shipWithKsecureModal, setShipWithKsecureModal] = useState(false);

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={{ alignSelf: "center" }}>
					<TouchableOpacity
						onPress={() => {
							setShipWithSellerModal(true);
							// navigation.navigate("shipseller")
						}}
						style={{
							marginBottom: 40,
							paddingVertical: 40,
							backgroundColor: "white",
							elevation: 10,
							width: "75%",
							backgroundColor: "#ffffff",
							borderRadius: 30,
							shadowColor: "#000000",
							shadowOpacity: 0.3,
							shadowRadius: 5,
							shadowOffset: {
								width: 0,
								height: 2,
							},
						}}
					>
						<Text style={styles.titles}>Ship with Seller</Text>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-around",
								height: "auto",
								// height: 150,
								marginVertical: 12,
								paddingHorizontal: 20,
							}}
						>
							<Octicons name="person-fill" size={24} color="blue" style={{}} />
							<Text style={{ paddingLeft: 15 }}>
								Your order will be handled completely by the seller from {"\n"}
								payment to delivery. Contact seller for delivery information
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={{ alignSelf: "center" }}>
					<TouchableOpacity
						onPress={() => {
							setShipWithKshipModal(true);
							// navigation.navigate("shipseller")
						}}
						style={{
							display: "flex",
							justifyContent: "center",
							marginBottom: 40,
							marginBottom: 40,
							paddingVertical: 40,
							backgroundColor: "white",
							elevation: 10,
							width: "75%",
							backgroundColor: "#ffffff",
							borderRadius: 30,
							shadowColor: "#000000",
							shadowOpacity: 0.3,
							shadowRadius: 5,
							shadowOffset: {
								width: 0,
								height: 2,
							},
						}}
					>
						<Text style={styles.titles}>Ship with K-Ship</Text>
						<View
							style={{
								display: "flex",
								justifyContent: "space-around",
								height: "auto",
								// height: 150,
								marginVertical: 12,
								paddingHorizontal: 20,
							}}
						>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Octicons name="id-badge" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Delivered by K-verified shippers
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Feather name="package" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Real-Time package tracking
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Ionicons name="bicycle" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Insurance on good in transit
								</Text>
							</View>
							<View
								style={{
									height: 35,
									width: 70,
									backgroundColor: "#FEDD00",
									borderRadius: 20,
									marginLeft: 30,
									marginTop: 12,
									//  padding: 20
								}}
							>
								<Text style={{ marginLeft: 15, marginTop: 10 }}>
									₦{checkoutData.kship_fee}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>

				<View style={{ alignSelf: "center" }}>
					<TouchableOpacity
						onPress={() => {
							setShipWithKsecureModal(true);
							// navigation.navigate("shipseller")
						}}
						style={{
							marginBottom: 40,
							paddingVertical: 40,
							backgroundColor: "white",
							elevation: 10,
							width: "75%",
							backgroundColor: "#ffffff",
							borderRadius: 30,
							shadowColor: "#000000",
							shadowOpacity: 0.3,
							shadowRadius: 5,
							shadowOffset: {
								width: 0,
								height: 2,
							},
						}}
					>
						<Text style={styles.titles}>Ship with K-Secure</Text>
						<View
							style={{
								display: "flex",
								justifyContent: "space-around",
								height: "auto",
								marginVertical: 12,
								paddingHorizontal: 20,
							}}
						>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Octicons name="id-badge" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Delivered by K-verified shippers
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Feather name="package" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Real-Time package tracking
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Ionicons name="bicycle" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Insurance on good in transit
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Entypo name="wallet" size={24} color="blue" style={{}} />
								<Text style={{ paddingLeft: 15 }}>
									Payment secured by Klick
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<MaterialIcons
									name="security"
									size={24}
									color="blue"
									style={{}}
								/>
								<Text style={{ paddingLeft: 15 }}>
									Buyer’s protection with K-secure
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
								}}
							>
								<Ionicons
									name="ios-return-up-back-sharp"
									size={24}
									color="blue"
									style={{}}
								/>
								<Text style={{ paddingLeft: 15 }}>3 days return</Text>
							</View>

							<View
								style={{
									height: 35,
									width: 70,
									backgroundColor: "#FEDD00",
									borderRadius: 20,
									marginLeft: 30,
									marginTop: 12,
								}}
							>
								<Text style={{ marginLeft: 15, marginTop: 10 }}>
									₦{checkoutData.ksecure_fee}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</ScrollView>
			{/* Ship With Seller */}
			<PaymentModal
				state={shipWithSellerModal}
				setState={setShipWithSellerModal}
				onPress={() => {
					navigation.navigate({
						name: "paymentmethod",
						params: {
							addressPayload,
							sellerData: { name: "seller", price: cartDetail.totalAmount },
							subTotal: cartDetail.totalAmount,
							shippingCharge: 0,
						},
					});
				}}
				text={"You Are About to Ship with Seller"}
				button={"Make Payment"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Ship With K-Ship */}
			<PaymentModal
				state={shipWithKshipModal}
				setState={setShipWithKshipModal}
				onPress={() => {
					navigation.navigate({
						name: "paymentmethod",
						params: {
							// cartData,
							addressPayload,
							sellerData: {
								name: "kship",
								price: cartDetail.totalAmount + checkoutData.kship_fee,
							},
							shippingCharge: checkoutData.kship_fee,
							subTotal: cartDetail.totalAmount,
						},
					});
				}}
				text={"Ship with K-Ship"}
				secondText={
					"Ensure to know your Vendor! Klick is only responsible for the shipping and not the product."
				}
				button={"Continue"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Ship With K-Secure */}
			<PaymentModal
				state={shipWithKsecureModal}
				setState={setShipWithKsecureModal}
				onPress={() => {
					navigation.navigate({
						name: "paymentmethod",
						params: {
							// cartData,
							addressPayload,
							sellerData: {
								name: "ksecure",
								price: cartDetail.totalAmount + checkoutData.ksecure_fee,
							},
							shippingCharge: checkoutData.ksecure_fee,
							subTotal: cartDetail.totalAmount,
						},
					});
				}}
				text={"Ship with K-Secure "}
				secondText={
					"Klick will be in charge of your every transaction. Your payment is secured with Klick and will be released to the seller after product is delivered."
				}
				button={"Make Payment"}
				ButtonColor={"#FEDD00"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFF",
		flex: 1,
		paddingTop: 20,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		marginTop: 20,
	},
	titles: {
		fontSize: 18,
		fontWeight: "500",
		color: "#0B0B0E",
		paddingLeft: 20,
		// marginTop: 30,
	},
});

export default ShippingMethod;
