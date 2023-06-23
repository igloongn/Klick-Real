import React, { useState, useContext } from "react";
import SellerBetter from "./SellerBetter";
import SellerAddAddress from "./SellerAddAddress";
import SellerAddLogo from "./SellerAddLogo";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyModal from "../../utils/MyModal";
import axios from "axios";

const SelleronBoardingContext = React.createContext();

const SellerOnboarding = ({ navigation }) => {
	const [stage, setStage] = useState(1);
	const nextStage = () =>
		setStage((prevState) => (prevState + 1 > 3 ? 3 : prevState + 1));
	const prevStage = () =>
		setStage((prevState) => (prevState - 1 < 1 ? 1 : prevState - 1));

	const [storeName, setStoreName] = useState("");
	const [phone, setPhone] = useState("");
	const [industry, setIndustry] = useState("");
	const [address, setAddress] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [file, setFile] = useState("");
	const [country, setCountry] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [SuccessModalVisible, setSuccessModalVisible] = useState(false);
	const [failedModalVisible, setFailedModalVisible] = useState(false);
	const [weirdError, setWeirdError] = useState("There is an Error");

	const submit = async (navigation) => {
		setLoading(true);
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!");
		console.log({
			storeName,
			phone,
			state,
			city,
			address,
			industry,
			country,
			Image: file[0],
		});
		// if (true) return;
		let formData = new FormData();
		formData.append("storeName", storeName.trim());
		formData.append("phone", phone.trim());
		formData.append("state", state.trim());
		formData.append("city", city.trim());
		formData.append("address", address.trim());
		formData.append("industry", industry.trim());
		formData.append("country", country.trim());
		// formData.append('UPLOADCARE_PUB_KEY', 'c271ff5c8a4f6b806c36');
		formData.append("file", {
			uri: file[0]?.uri,
			type: "image/jpg",
			name: file[0]?.filename,
		});
		console.log("!!!!!!!!!!!!formData!!!!!!!!!!!!!!");
		console.log(formData);
		const pictureName = file[0];
		console.log("Yello");
		console.log(pictureName);
		if (pictureName) {
			// console.log("Picture is not set");
			// 	formData.append("file", {
			// 	uri: 'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg',
			// 	type: "image/jpg",
			// 	name: 'FrontendDefaultPicture.jpg',
			// });
		} else {
			console.log("Picture is not set");
		}
		console.log("General");

		AsyncStorage.getItem("token")
			.then((token) => {
				axios
					.post("https://klick-api.onrender.com/auth/registerstore", formData, {
						headers: {
							"Content-Type": "multipart/form-data",
							Authorization: `Bearer ${token}`,
						},
					})
					.then((res) => {
						const _data = res.data;

						console.log("y");
						console.log("y", _data);
						// Alert.alert("Success", "Your Store was created successfully");
						setSuccessModalVisible(true);
						setTimeout(() => {
							navigation.navigate("sellerstab");
						}, 2000);
						setLoading(false);
					})
					.catch((error) => {
						if (error.response) {
							console.log("Error status:", error.response.status);
							console.log("Error status:", error.response.status);
							console.log("Error status:", error.response.status);
							console.log("Error status:", error.response.status);
							console.log("Error data:", error.response.data.msg);
							setWeirdError(error.response.data.msg);
						} else {
							console.error("Error:", error.message);
						}
						console.error("!!!!!!!!!!!!!!!!Store Creation Error!!!!!!!!!");
						console.error(error);
						if (error.message === "Network Error") {
							console.error(error.message);
							setWeirdError("Please Add a Picture");
						}
						setFailedModalVisible(true);
						setLoading(false);
					});
			})
			.catch((err) => {
				console.log("Please Check your TOken");
			});
	};

	const values = {
		storeName,
		setStoreName,
		phone,
		setPhone,
		industry,
		setIndustry,
		address,
		setAddress,
		state,
		setState,
		city,
		setCity,

		file,
		setFile,
		country,
		setCountry,
		navigation,
		submit: () => submit(navigation),
	};
	return (
		<>
			<SelleronBoardingContext.Provider value={values}>
				{stage === 1 ? (
					<SellerBetter prevStage={prevStage} nextStage={nextStage} />
				) : (
					<></>
				)}
				{stage === 2 ? (
					<SellerAddAddress prevStage={prevStage} nextStage={nextStage} />
				) : (
					<></>
				)}
				{stage === 3 ? (
					<SellerAddLogo
						loading={loading}
						prevStage={prevStage}
						nextStage={nextStage}
					/>
				) : (
					<></>
				)}
			</SelleronBoardingContext.Provider>
			{/* Success Modal */}
			<MyModal
				state={SuccessModalVisible}
				setState={setSuccessModalVisible}
				text={"Your Store was created successfully"}
				button={"Thank You"}
				ButtonColor={"#FEDD00"}
			/>
			{/* Failed Modal */}
			<MyModal
				state={failedModalVisible}
				setState={setFailedModalVisible}
				text={weirdError}
				button={"Try again"}
				ButtonColor={"#EB270B"}
			/>
		</>
	);
};

export const useSellerOnboardingContext = () => {
	const context = useContext(SelleronBoardingContext);
	if (!context) throw Error();
	return context;
};

export default SellerOnboarding;
