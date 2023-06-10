import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';

const data = [
  { id: 1, image: 'https://example.com/status1.png' },
  { id: 2, image: 'https://example.com/status2.png' },
  { id: 3, image: 'https://example.com/status3.png' },
  // Add more status data as needed
];

const StatusCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    );
  };

  const onViewableItemsChanged = ({ viewableItems }) => {
    setActiveIndex(viewableItems[0]?.index || 0);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
      />
      <View style={styles.pagination}>
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
      </View>
      <View style={styles.statusInfo}>
        <Text style={styles.statusText}>John Doe</Text>
        <Text style={styles.timestamp}>Just now</Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  carouselItem: {
    width: windowWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  paginationDot: {
    fontSize: 10,
    color: '#fff',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    color: '#00f',
    fontSize: 16,
  },
  statusInfo: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: '#fff',
  },
});

export default StatusCarousel;
