import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
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

const SERVER_URL = "http://localhost:3000/image";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const makeImage = async () => {
    // No permissions request is necessary for launching the image library
    let status = await ImagePicker.requestCameraPermissionsAsync();

    if (!status.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } else {
      alert("Нет разрешения на доступ к камере.");
    }
  };

  const cancelChoice = async () => {
    setImage(null);
  };

  const sendToServer = async() => {
    if (image) {
      const base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64' });
      fetch(SERVER_URL, {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          name: "Image" + new Date().getTime() + ".png",
          user: 'User'
        })
      }).then((response) => {
        console.log(response.status)
      } )
    }
  } 

  return (
    <View style={styles.mainView}>
      <Image source={image ? { uri: image } : require('../assets/icon.png')} style={styles.image}/>
      <Button title="Отправить на сервер" onPress={sendToServer}/>
      <Button title="Выбрать картинку" onPress={pickImage}/>
      <Button title="Открыть камеру" onPress={makeImage}/>
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
    height: Dimensions.get('window').height - 240,
    marginTop: 16,
    resizeMode: 'contain',
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 16
  },
})