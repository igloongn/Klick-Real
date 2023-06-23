import React from "react";
import { PayWithFlutterwave } from "flutterwave-react-native";

const handleOnRedirect = (data) => {
	console.log(data);
};

const generateTransactionRef = (length) => {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return `flw_tx_ref_${result}`;
};

const PaymentScreen = ({}) => {
	const transactionRef = generateTransactionRef(10);

	return (
		<PayWithFlutterwave
			onRedirect={handleOnRedirect}
			options={{
				tx_ref: transactionRef,
				authorization: "[merchant public key]",
				customer: {
					email: "customer-email@example.com",
				},
				amount: 2000,
				currency: "NGN",
				payment_options: "card",
			}}
		/>
	);
};

export default PaymentScreen;
