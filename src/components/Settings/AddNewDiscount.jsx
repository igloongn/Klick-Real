import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
	Modal,
	Alert,
	Pressable,
	TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetLogginedUser } from "../../utils/apiHooks";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { Button } from "react-native-paper";
import MyModal from "../../utils/MyModal";

const AddNewDiscount = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const [title, setTitle] = useState("");
	const [value, setValue] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { user, Loading, isErorr, getUserData } = useGetLogginedUser();
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState("2023-12-12");

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);

	const today = new Date();
	const startDate = getFormatedDate(
		today.setDate(today.getDate() + 1),
		"YYYY-MM-DD"
	);

	function handleOnPress() {
		setOpen(!open);
	}

	function handleChange(propDate) {
		setDate(propDate);
	}

	const makeDiscount = async () => {
		setIsLoading(true);
		// console.log({ title, value, endDate });
		try {
			const token = await AsyncStorage.getItem("token");
			const userData = await getUserData();
			// console.log("data", typeof userData);
			// const url = `https://klick-api.onrender.com/product/?category=${selectCatId}`
			// console.log("userData?.stores[0].id");
			// console.log(userData?.stores[0].id);
			const response = await fetch(
				`https://klick-api.onrender.com/brand/discount/${userData?.stores[0].id}`,
				{
					method: "POST",
					mode: "no-cors",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						title,
						type: "percentage",
						value,
						endDate,
					}),
				}
			);
			if (response?.status >= 200 && response?.status < 203) {
				const _data = await response.json();
				// console.log("y", _data);
				// Alert.alert("Success", "Discount added");
				setSuccessModalVisible(true);

				setTimeout(() => {
					navigation.navigate("discounts");
				}, 3000);
			} else {
				throw Error("");
			}
		} catch (error) {
			// Handle network or other errors
			setFailedModalVisible(true);
			Alert.alert("Error", "An error occured ");
			console.error("error");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={{ backgroundColor: "white", alignItems: "center" }}>
			<Modal
				animationType="none"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View>
					<View
						style={{
							width: 270,
							height: 270,
							backgroundColor: "white",
							borderRadius: 15,
							marginTop: 200,
							marginLeft: 70,
						}}
					>
						{/* <SimpleLineIcons
							name="trash"
							size={44}
							color="blue"
							style={{ paddingTop: 40, marginLeft: 105 }}
						/> */}
						<Text
							style={{
								fontSize: 23,
								fontWeight: 600,
								color: "#0B0B0E",
								marginLeft: 25,
								marginTop: 10,
							}}
						>
							Delete Discount 20% OFF?
						</Text>
						<Text
							style={{
								fontSize: 16,
								fontWeight: 400,
								color: "#6A6B6C",
								marginLeft: 15,
							}}
						>
							Are you sure you want to delete this discount. It will not be
							available for users after deletion
						</Text>
						<Pressable onPress={() => setModalVisible(!modalVisible)}>
							<View
								style={{ display: "flex", flexDirection: "row", marginTop: 30 }}
							>
								<GeneralButton
									height={50}
									width={100}
									borderColor={"#FEDD00"}
									backgroundColor={"#FFF"}
									message={"Cancel"}
									marginHorizintal={20}
									marginLeft={30}
									top={15}
								/>
								<GeneralButton
									height={50}
									width={100}
									borderColor={"red"}
									backgroundColor={"red"}
									message={"Delete"}
									marginLeft={30}
									top={15}
									color={"white"}
								/>
							</View>
						</Pressable>
					</View>
				</View>
			</Modal>
			<Pressable onPress={() => setModalVisible(true)}>
				{/* <SimpleLineIcons
					name="trash"
					size={24}
					color="red"
					style={{ marginLeft: 340, marginTop: 10 }}
				/> */}
			</Pressable>
			<ScrollView>
				<GeneralInput
					name={"Discount Title"}
					width={320}
					placeholder={"e.g Easter sales"}
					value={title}
					onChangeValue={(text) => setTitle(text)}
				/>
				{/* <GeneralInput name={"Coupon Amount"} width={320}  placeholder={"20%"}/> 
     <GeneralInput name={"Minimum Spend"} width={320} placeholder={"0"}/>
    <GeneralInput name={"Maximum Spend"} width={320} placeholder={"N20,000"}/> */}
				<GeneralInput
					name={"Discount Percentage"}
					width={320}
					placeholder={"e.g 20 "}
					value={value}
					onChangeValue={(text) => setValue(text)}
				/>

				<TouchableOpacity>
					{/* <GeneralInput
						name={"Usage End Date"}
						width={320}
						placeholder={"e.g 2023-04-17"}
						value={endDate}
						onChangeValue={(text) => setEndDate(text)}
					/> */}

					<View
						style={{
							marginTop: 20,
						}}
					>
						<Button
							title="Open Date Picker"
							onPress={() => setEndDate("")} // Reset selected date before opening
							// onPress={() => console.log("HEllo")} // Reset selected date before opening
							// mode="contained"
						>
							Usage End Date
						</Button>
						<DatePicker
							mode="calendar"
							selected={endDate}
							onSelectedChange={(date) => {
								setEndDate(date);
								console.log(endDate);
							}}
							options={{
								backgroundColor: "#FFFFFF",
								textHeaderColor: "#000000",
								textDefaultColor: "#333333",
								selectedTextColor: "#FFFFFF",
								mainColor: "#009688",
								// Custom styles
								borderRadius: 8,
								width: 100,
								height: 100,
							}}
						/>
					</View>
				</TouchableOpacity>
				<Modal animationType="slide" transparent={true} visible={open}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<DatePicker
								mode="calender"
								minimumDate={startDate}
								selected={date}
								onDateChange={handleChange}
							/>
							<TouchableOpacity onPress={handleOnPress}>
								<Text>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>

				{/* <GeneralInput name={"Usage Limit Per Person"} width={320} placeholder={"https://wa.me/9062056518"}/> */}

				<TouchableOpacity
					onPress={() => makeDiscount()}
					style={{
						marginBottom: 50,
					}}
				>
					<GeneralButton
						backgroundColor={"#E1E1E1"}
						borderColor={"#E1E1E1"}
						width={320}
						marginTop={30}
						marginHorizintal={43}
						message={"Save"}
						marginLeft={135}
						height={52}
						top={15}
					/>
				</TouchableOpacity>
				{/* {loading && <ActivityIndicator size="large" />} */}

				<View style={{ marginTop: 50 }} />
			</ScrollView>
			{/* Login Successful Modal */}
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Discount added"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Login Failed Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={"An error occured during login"}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
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
		width: "98%",
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
});

export default AddNewDiscount;
