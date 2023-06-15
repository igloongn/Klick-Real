import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";

const StoreAddress = () => {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<GeneralInput name={"Country"} width={320} placeholder={"Nigerida"} />
			<GeneralInput
				name={"Address"}
				width={320}
				placeholder={"1455A Dammole Street, Off Idejo Street"}
			/>
			<GeneralInput name={"State"} width={320} placeholder={"Lagos"} />
			<GeneralInput name={"City"} width={320} placeholder={"Victoria Island"} />

			<GeneralButton
				backgroundColor={"#FEDD00"}
				borderColor={"#FEDD00"}
				width={320}
				marginTop={30}
				marginHorizintal={43}
				message={"Save"}
				marginLeft={135}
				height={52}
				top={15}
			/>
		</View>
	);
};

export default StoreAddress;
