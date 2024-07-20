import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useFirstTime } from '@/context/GlobalProvider'
const index = () => {
  const { width, height } = Dimensions.get('screen')
  const { isFirstTime, setFirstTime } = useFirstTime();
  const router = useRouter()
  const handlePress = () => {
    setFirstTime(false);
    router.push('home');
  };

  useEffect(() => {
    if (!isFirstTime) {
      router.push('home');
    }
  }, [isFirstTime]);
  return (
    <View className='h-full'>
      <ImageBackground source={require('@/assets/images/splash/trees.jpg')} className='object-cover object-center' style={{
        height: height,
        width: width,

      }}>
        <View className='w-full h-full px-4 py-6 justify-between'>
          <View>
            <Text className='font-bold text-3xl text-center text-white mt-4'>
              Mboka
            </Text>
          </View>
          <View className=' space-y-4 w-full'>
            <Text className='text-center w-1/2 font-semibold text-white leading-relaxed' >
              Welcome to Karibu App
            </Text>
            <Text className='text-center leading-snug text-white'>
              A mobile app designed to help you discover and engage with Congo's beautiful landscapes.
            </Text>

            <View className='pb-10'>
              <TouchableOpacity className='bg-[#0ac6a1] w-full rounded-full p-3 items-center justify-center' onPress={handlePress}>
                <Text className='text-white font-semibold text-center'>
                  Get Started
                </Text>
              </TouchableOpacity>
            </View>


          </View>


        </View>

      </ImageBackground>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})