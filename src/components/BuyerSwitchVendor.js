import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text } from "react-native";
import MyModal from "../utils/MyModal";
import ModalFunc from "../utils/ModalFunc";
const BuyerSwitchVendorContext = React.createContext();

export const BuyerSwitchVendor = ({ children }) => {
	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);

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
				// Alert.alert("Success", "user switched succesfully");
				setSuccessModalVisible(true);
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
			<ModalFunc
				text="User switched succesfully"
				button="Good"
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
			/>			
			<ModalFunc
				text="An error occured during switching"
				button="Try Again"
				state={failedModalVisible}
				setState={setFailedModalVisible}
			/>
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
