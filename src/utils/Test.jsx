import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MediaUpload = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleSelectMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access media library denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedMedia(result);
    }
  };

  const handleUploadMedia = () => {
    if (selectedMedia) {
      // Perform the media upload logic here
      console.log('Uploading media:', selectedMedia.uri);
      // You can use a library or API to upload the media to a server
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Media" onPress={handleSelectMedia} />
      {selectedMedia && (
        <View style={styles.mediaInfo}>
          <Text>Selected Media:</Text>
          <Text>Filename: {selectedMedia.uri}</Text>
          <Text>File Size: {selectedMedia.fileSize / 1024} KB</Text>
        </View>
      )}
      <Button title="Upload Media" onPress={handleUploadMedia} disabled={!selectedMedia} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaInfo: {
    marginTop: 20,
  },
});

export default MediaUpload;
