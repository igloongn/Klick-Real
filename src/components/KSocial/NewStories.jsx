import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const windowWidth = Dimensions.get("window").width;

const FullScreenCarousel = () => {
	const [data, setData] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		axios.get("https://klick-api.onrender.com/post/").then((res) => {
			// console.log("!!!!!!!!!!Data!!!!!!!!!Yea");
			// console.log(res.data.data.rows);
			setData(res.data.data);
			console.log('!!!!!!!!!!!!Stories!!!!!!!!!!!')
			console.log('!!!!!!!!!!!!Stories!!!!!!!!!!!')
			console.log('!!!!!!!!!!!!Stories!!!!!!!!!!!')
			console.log('!!!!!!!!!!!!Stories!!!!!!!!!!!')
			console.log(res.data.data[0].id)
		});

		const interval = setInterval(() => {
			setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
		}, 15000); // Adjust the interval time as desired (in milliseconds)

		return () => clearInterval(interval);
	}, []);

	const renderItem = ({ item }) => {
		return (
			<View style={styles.carouselItem}>
				<Image source={{ uri: item.contentUrl[0] }} style={styles.image} />
			</View>
		);
	};

	const onSnapToItem = (index) => {
		setActiveIndex(index);
		// con
		if (index === data.length-1 ) {
		    console.log('Finished')
		}
		console.log("Index");
		console.log(index);
		console.log("Data Length");
		console.log(data.length);
	};

	return (
		<View style={styles.container}>
			{data ? (
				<>
					<Carousel
						data={data}
						renderItem={renderItem}
						sliderWidth={windowWidth}
						itemWidth={windowWidth}
						onSnapToItem={onSnapToItem}
						firstItem={activeIndex}
						stopAutoplay={() => console.log("holla")}
						// loop
						autoplay
						autoplayInterval={15000} // Adjust the interval time as desired (in milliseconds)
					/>
					{/* <View style={styles.pagination}>
						{data.map((item, index) => (
							<Text
								key={item.id}
								style={[
									styles.paginationDot,
									index === activeIndex && styles.paginationDotActive,
								]}
							>
								&bull;
							</Text>
						))}
					</View> */}
				</>
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		justifyContent: "center",
		alignItems: "center",
	},
	carouselItem: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	pagination: {
		position: "absolute",
		bottom: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	paginationDot: {
		fontSize: 20,
		color: "#fff",
		marginHorizontal: 5,
	},
	paginationDotActive: {
		color: "#00f",
		fontSize: 24,
	},
});

export default FullScreenCarousel;
