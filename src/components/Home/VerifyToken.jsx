import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Pressable,
	ScrollView,
	ActivityIndicator,
	Alert,
	SafeAreaView,
} from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import GeneralInput from "../General/GeneralInput";
import GeneralButton from "../General/GeneralButton";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from "../../settings";

const CELL_COUNT = 4;

const VerifyToken = ({ navigation, route }) => {
    const email = route.params.email;

    const [verify, setVerify] = useState("");

	const [loading, setLoading] = useState(false);

	const [value, setValue] = useState("");
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const navigate = useNavigation();

	const registerUser = async () => {
		if (value.length === 4) {
			try {
				setLoading(true);
				const token = await AsyncStorage.getItem("token");
				console.log(token);
				console.log(verify);
				const response = await fetch(API_URL + "/auth/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						code: verify,
					}),
				});

				const res_status_code = response.status;
				const res_data = await response.json();
				console.log(res_data);
				console.log(res_status_code);
				if (res_status_code != 200) {
					throw new Error(res_data.message);
				}

				await AsyncStorage.setItem("isLoggedIn", "true");

				Alert.alert("Verification succesful", "Verification was successful", [
					{ text: "OK", onPress: () => navigation.navigate("hometab") },
				]);

				navigation.navigate("hometab");
			} catch (error) {
				// Handle network or other errors
				console.error(error);
				Alert.alert("Error", "An error occured while verifying email.");
			} finally {
				setLoading(false);
			}
		} else {
			Alert.alert("Error", "An error occured while verifying email.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ display: "flex", flexDirection: "column"}}>
                <View style={{display: "flex", flexDirection: "column", alignItems: 'flex-start', marginBottom: 20}}>
					<Text
						style={{
							fontWeight: "500",
							fontSize: 24,
							color: "#0B0B0E",
							textAlign: "center",
							// marginLeft: 145,
							marginTop: 60,
						}}
					>
						Verify Token
					</Text>
					<Text
						style={{
							color: "#6A6B6C",
						}}
					>
						Kindly input the 4-digit verification code sent to
						“{email}”
					</Text>
				</View>
				{/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",marginLeft:70}}>Register an account so you can start selling on Klick.</Text> */}
				{/* <GeneralInput placeholder={''} name="Input Token" width={335} value={verify} onChangeValue={text => setVerify(text)} inputMode={'numeric'}/> */}

				<CodeField
					ref={ref}
					{...props}
					// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
					value={value}
					onChangeText={setValue}
					cellCount={CELL_COUNT}
					rootStyle={styles.codeFieldRoot}
					keyboardType="number-pad"
					textContentType="oneTimeCode"
					renderCell={({ index, symbol, isFocused }) => (
						<Text
							key={index}
							style={[styles.cell, isFocused && styles.focusCell]}
							onLayout={getCellOnLayoutHandler(index)}
						>
							{symbol || (isFocused ? <Cursor /> : null)}
						</Text>
					)}
				/>

				<TouchableOpacity
					onPress={() => registerUser()}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<GeneralButton
						backgroundColor={"#FEDD00"}
						message={loading ? "Loading ....." : "Continue"}
						width={335}
						height={54}
						borderColor={"#FEDD00"}
						marginLeft={130}
						top={15}
						marginHorizintal={40}
						marginTop={30}
					/>
				</TouchableOpacity>
				{loading && <ActivityIndicator size="large" />}

				{/* <Text style={{ fontWeight: "500", fontSize: 20, color: "#0B0B0E", marginLeft: 60, marginTop:15 }}>Don't have an account yet? </Text>
        <Pressable onPress={() => navigation.navigate('login')}><Text style={{ fontWeight: "500", fontSize: 20, color: "blue", marginLeft: 260, marginTop: -22 }}>Log in</Text></Pressable> */}

				<View style={{ marginTop: 50 }} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	codeFieldRoot: { marginTop: 20 },
	cell: {
		width: 50,
		height: 50,
		lineHeight: 40,
		fontSize: 24,
		borderWidth: 2,
		borderColor: "#00000030",
		textAlign: "center",
        marginBottom: 30,
        borderRadius: 10
	},
	focusCell: {
		borderColor: "#000",
	},
});

export default VerifyToken;
