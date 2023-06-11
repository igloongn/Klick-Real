import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddDeliveryLocation = ({ navigation, route }) => {
	const { id, itemCount } = route.params;
	console.log("!!!!!!!!!Product Id !!!!!!!");
	console.log(id);
	const [country, setCountry] = useState('Nigeria');
	const [address, setAddress] = useState('dpdmed');
	const [city, setCity] = useState('Benin');
	const [state, setState] = useState('Edo');
	const [fullName, setFullName] = useState('Mufasa James');

	const deliveryPayload = {};
	useEffect(() => {
		AsyncStorage.getItem("isLoggedIn").then((res) => {
			if (res === false) {
				navigation.navigate("login");
			} else {
				console.log("User is logged in");
			}
		});
	}, []);
	const onsubmit = () => {
		deliveryPayload.fullName = fullName;
		deliveryPayload.country = country;
		deliveryPayload.city = city;
		deliveryPayload.address = address;
		deliveryPayload.state = state;
		// console.log("!!!!!!!!!!delivery Address Payload!!!!!!!!!!!");
		// console.log(deliveryPayload);
		AsyncStorage.getItem('token').then((token) => {
			axios.post('https://klick-api.onrender.com/address/',{headers: {
				"Authorization": "Bearer " + token
			}}, deliveryPayload).then((res)=>{
				console.log('!!!!!!!!Response!!!!!!!!')
				console.log(res)
			}).catch((err) => {
				console.log('!!!!!!!!error!!!!!!!!!!')
				console.log(err.message)
			})

		})
		// navigation.navigate({
		// 	name: "checkout",
		// 	params: { id, itemCount: itemCount, deliveryPayload },
		// });
	};

	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<ScrollView>
				<GeneralInput
					name={"Full Name"}
					width={320}
					placeholder={"John Doe"}
					value={fullName}
					onChangeValue={(text) => setFullName(text)}
				/>
				<GeneralInput
					name={"Country"}
					width={320}
					placeholder={"Nigeria"}
					value={country}
					onChangeValue={(text) => setCountry(text)}
				/>
				<GeneralInput
					name={"Address"}
					width={320}
					placeholder={"1455A Dammole Street, Off Idejo Street"}
					value={address}
					onChangeValue={(text) => setAddress(text)}
				/>
				<GeneralInput
					name={"State"}
					width={320}
					placeholder={"Lagos"}
					value={state}
					onChangeValue={(text) => setState(text)}
				/>
				<GeneralInput
					name={"City"}
					width={320}
					placeholder={"Victoria Island"}
					value={city}
					onChangeValue={(text) => setCity(text)}
				/>
				<TouchableOpacity
					onPress={() => onsubmit()}
					style={{ alignItems: "center" }}
				>
					<GeneralButton
						message={"Continue to Shipping"}
						marginLeft={110}
						marginTop={40}
						marginBottom={40}
						top={15}
						backgroundColor={"#FEDD00"}
						borderColor={"#FEDD00"}
						height={45}
						width={335}
					/>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default AddDeliveryLocation;
