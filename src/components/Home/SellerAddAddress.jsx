import React, { useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import { useSellerOnboardingContext } from "./SellerOnboarding";
import MyModal from "../../utils/MyModal";

const SellerAddAddress = ({ navigation, prevStage, nextStage }) => {
	const [fillAllFields, setFillAllFields] = useState(false);

	const {
		setCountry,
		setAddress,
		setState,
		setCity,
		country,
		address,
		state,
		city,
	} = useSellerOnboardingContext();
	const handleSubmit = () => {
		if (
			country.length !== 0 &&
			address.length !== 0 &&
			state.length !== 0 &&
			city.length !== 0
		) {
			nextStage();
		} else {
			setFillAllFields(true);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
							marginLeft: 40,
						}}
					>
						Add an Address
					</Text>
					{/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
					<GeneralInput
						placeholder={"e.g Nigeria"}
						name="Country"
						width={335}
						value={country}
						onChangeValue={(text) => setCountry(text)}
					/>
					<GeneralInput
						placeholder={"e.g 7 wale Ademola lane, Ikeja"}
						name="Address"
						width={335}
						value={address}
						onChangeValue={(text) => setAddress(text)}
					/>

					<GeneralInput
						placeholder={"e.g Ikeja"}
						name="City"
						width={335}
						value={city}
						onChangeValue={(text) => setCity(text)}
					/>
					<GeneralInput
						placeholder={"e.g Lagos"}
						name="State"
						width={335}
						value={state}
						onChangeValue={(text) => setState(text)}
					/>
					<View
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
							marginTop: 20,
						}}
					>
						<TouchableOpacity
							style={{
								marginRight: 10,
							}}
							onPress={() => prevStage()}
						>
							<GeneralButton
								backgroundColor={"#FEDD00"}
								message={"Back"}
								width={160}
								height={54}
								borderColor={"#FEDD00"}
								marginLeft={130}
								top={15}
								marginHorizintal={40}
								marginTop={30}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => handleSubmit()}>
							<GeneralButton
								backgroundColor={"#FEDD00"}
								message={"Next"}
								width={160}
								height={54}
								borderColor={"#FEDD00"}
								marginLeft={130}
								top={15}
								marginHorizintal={40}
								marginTop={30}
							/>
						</TouchableOpacity>
					</View>
					<View style={{ marginTop: 70 }} />
				</View>
			</ScrollView>
			<MyModal
				state={fillAllFields}
				setState={setFillAllFields}
				text={"Please fill in all fields"}
				button={"Try again"}
				ButtonColor={"#FEDD00"}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#FFF",
		//   alignItems: 'center',
		justifyContent: "center",
		marginTop: 50,
	},
});

export default SellerAddAddress;
