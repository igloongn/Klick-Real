import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import MyModal from "../utils/MyModal";
const BuyerSwitchVendorContext = React.createContext();

export const BuyerSwitchVendor = ({ children }) => {
	const [SuccessModalVisible, setSuccessModalVisible] = useState(true);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	{
		/* Login Successful Modal */
	}
	<MyModal
		state={SuccessModalVisible}
		setState={setSuccessModalVisible}
		text={"User switched succesfully"}
		button={"Thank You"}
		ButtonColor={"#FEDD00"}
	/>;
	{
		/* Login Successful Modal */
	}
	<MyModal
		state={failedModalVisible}
		setState={setFailedModalVisible}
		text={"An error occured during switching"}
		button={"Try again"}
		ButtonColor={"#EB270B"}
	/>;

	const [mode, setMode] = useState("buyer");

	const switchMode = async (type) => {
		// console.log(mode, type)
		if (mode === type) return;

		try {
			const token = await AsyncStorage.getItem("token");
			const response = await fetch(
				"https://klick-api.onrender.com/auth/switch",
				{
					method: "POST",
					mode: "no-cors",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response?.status >= 200 && response?.status < 203) {
				const _data = await response.json();
				console.log("y", _data);
				setMode(type);
				Alert.alert("Success", "user switched succesfully");
				// setSuccessModalVisible(true);
			} else {
				throw Error("");
			}
		} catch (err) {
			// Alert.alert("Error", "An error occured during switching");
			setFailedModalVisible(true);
		}
	};

	const value = {
		mode,
		setMode,
		switchMode,
	};
	return (
		<>
			<BuyerSwitchVendorContext.Provider value={value}>
				{children}
			</BuyerSwitchVendorContext.Provider>
		</>
	);
};

export const useBuyerSwitchVendorContext = () => {
	const context = useContext(BuyerSwitchVendorContext);
	if (!context) throw Error();
	return context;
};
