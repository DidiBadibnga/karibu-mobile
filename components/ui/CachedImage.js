import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
const CachedImage = (props) => {
  const [cachedImage, setCachedSource] = useState(null);
  const { uri } = props;
  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);
        if (cachedImageData) {
          setCachedSource({
            uri: cachedImageData,
          });
        } else {
          const response = fetch(uri);
          const imageBlob = await response.blob();
          const base64Data = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({
            uri: base64Data,
          });
        }
      } catch (error) {
        console.error(error);
        setCachedSource({
          uri,
        });
      }
    };
    getCachedImage();
  }, []);

  return <Animated.Image source={cachedImage}>{...props}</Animated.Image>;
};

export default CachedImage;

const styles = StyleSheet.create({});
