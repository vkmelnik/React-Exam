import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  Button,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const cancelChoice = async () => {
    setImage(null);
  };

  return (
    <View style={styles.mainView}>
      <Image source={image ? { uri: image } : require('../assets/icon.png')} style={styles.image}/>
      <Button title="Выбрать картинку" onPress={pickImage}/>
      <Button title="Отменить выбор" onPress={cancelChoice}/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height - 160,
    marginTop: 16,
    resizeMode: 'contain',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 16
  },
})