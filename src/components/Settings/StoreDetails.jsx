import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const StoreDetails = () => {
	const [name, setName] = useState(null);
	const [email, setEmail] = useState(null);
	const [phone, setPhone] = useState(null);
	const onSubmit = () => {
		// console.log("onSubmit");
		if (name !== "" || email !== "" || phone !== "" || phone.length === 10) {
			// console.log('!!!!!!!!!!!!!!Payload!!!!!!!!!!!')
			const payload = {
				name,
				email,
				phone,
			};
			// console.log(payload)
			AsyncStorage.getItem("token")
				.then((token) => {
					axios
						.get("https://klick-api.onrender.com/auth/user", {
							headers: {
								"Content-Type": "application/json", // Replace with your desired Content-Type header
								Authorization: "Bearer " + token, //
							},
						})
						.then((data) => {
							axios.put(
								"https://klick-api.onrender.com/brand/update/" +
									data.data.stores[0].id,
								payload,
								{
									headers: {
										"Content-Type": "application/json", // Replace with your desired Content-Type header
										Authorization: "Bearer " + token, //
									},
								}
							);
						});
				})
				.catch((err) => {});
		}
	};

	return (
		<View
			style={{
				alignItems: "center",
			}}
		>
			<GeneralInput
				name={"Store Name"}
				width={320}
				placeholder={"The Cuddle Club"}
				value={name}
				onChangeValue={setName}
			/>
			<GeneralInput
				name={"Email"}
				width={320}
				placeholder={"john@gmail.com"}
				value={email}
				onChangeValue={setEmail}
				mode={"email"}
			/>
			<GeneralInput
				name={"Phone number (must be 10 digits)"}
				width={320}
				value={phone}
				onChangeValue={setPhone}
				mode={"tel"}
			/>
			<TouchableOpacity onPress={() => onSubmit()}>
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
		</View>
	);
};

export default StoreDetails;
