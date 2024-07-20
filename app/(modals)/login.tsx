import { Dimensions, Easing, ImageBackground, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Stack, useRouter } from 'expo-router'
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from "expo-web-browser";
import Animated, { FadeIn, SlideInUp, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
import * as Animatable from "react-native-animatable";
import TextWrittingEffect from '@/components/ui/text-writting';
import Carousel from 'react-native-reanimated-carousel';
import { useFirstTime } from '@/context/GlobalProvider'
enum Strategy {
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
  Tiktok = 'oauth_tiktok'
}

WebBrowser.maybeCompleteAuthSession();
const Page = () => {
  // const [videos, setVideos] = useState([
  //   {
  //     url: '../assets/videos/nature.mp4'
  //   },
  //   {
  //     url: '../assets/videos/park.mp4'
  //   }
  // ])
  // const images = [
  //   {
  //     url: require('../assets/images/nature/kin_1.jpg')
  //   },
  //   {
  //     url: require('../assets/images/nature/kin_2.jpg')
  //   },
  //   {
  //     url: require('../assets/images/nature/kin_3.jpg')
  //   },
  //   {
  //     url: require('../assets/images/nature/kin_4.jpg')
  //   }
  // ]
  const router = useRouter()
  const width = Dimensions.get('screen').width
  const height = Dimensions.get('screen').height
  const duration = useSharedValue(100)
  const [shouldPlay, setShouldPlay] = useState(false)
  const { isFirstTime, setFirstTime } = useFirstTime();
  useWarmUpBrowser();
  const handlePress = () => {
    // setFirstTime(false);
    router.push('home');
  };
  useEffect(() => {
    // setTimeout(() => {
    //   router.push('/explore')
    // }, 100)
  })

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: tiktokOAuth } = useOAuth({ strategy: "oauth_tiktok" });

  const onSelectAuth = async (strategy: Strategy) => {
    // const selectedAuth = {
    //     [Strategy.Google]: googleAuth,
    //     [Strategy.Facebook]: facebookAuth,
    //     [Strategy.Tiktok]: tiktokOAuth,
    // }[strategy]
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        console.log('User logged in successfully')
        router.push('/home')
      } else {
        // Use signIn or signUp for next steps such as MFA
        router.push('/home')
      }
      // const { createdSessionId, setActive } = await selectedAuth();
      // if (createdSessionId) {
      //     setActive!({
      //         session: createdSessionId,
      //     })


      // }
    } catch (err) {
      console.log('OAuth error:', err)
    }

  }

  return (
    // <SafeAreaView>
    //   <View>
    //     <Text>Page</Text>
    //     <TouchableOpacity className='bg-blue-400' onPress={() => {
    //       router.push('/explore')
    //     }}>
    //       <Text>
    //         Go to home
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>

    <View className='h-full p-3 ' >
      {/* <Image height={height} width={width} className='object-center object-cover' source={{
        uri: "https://images.pexels.com/photos/3889927/pexels-photo-3889927.jpeg?auto=compress&cs=tinysrgb&w=600"
      }} /> */}
      <Stack.Screen options={{
        animation: 'slide_from_bottom'
      }} />


      <View className=' h-full'>
        <View className=' justify-end w-full'>
          <TouchableOpacity className='' onPress={handlePress}>
            <Text className='text-blue-400 font-semibold '>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <Image className='h-72 rounded-md w-full object-cover object-center' source={{
          uri: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }} />
        <View className='my-3 space-y-2'>
          <TouchableOpacity className=' border border-gray-400 p-3 rounded-full w-full flex-row space-x-2 items-center ' onPress={() => onSelectAuth(Strategy.Google)}>
            <Ionicons name='logo-google' size={30} color={'#000'} />
            <Text className='font-semibold text-black flex-1 '>
              Continue with Google
            </Text>

          </TouchableOpacity>

        </View >






      </View>


      {/* <View className='flex-col absolute top-2
      p-4 space-y-4'>
        <Animated.Text entering={FadeIn.delay(100)} className='mt-28 text-white font-bold text-5xl'>
          Explore The Beauty Of Congo
        </Animated.Text>
       
        <Text className='text-white font-medium text-center'>
          Discover what congo has to offer
        </Text>

      </View> */}
      {/* <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.9)', 'transparent']}
        //   style={styles.background} // Assuming you have styles defined elsewhere
        className='absolute left-0 bottom-0 right-0'
        style={{
          height: height / 2
        }}
        start={{ x: 0.5, y: 1 }} // Start from bottom center
        end={{ x: 0.5, y: 0 }} // End at top center
      /> */}
      <Animated.View entering={FadeIn.delay(500).springify(300)} className=' bottom-10 hidden   z-50 flex-1 w-full space-y-3  justify-center rounded-t-3xl pt-4 px-3 pb-3 overflow-hidden bg-white'>
        {/* <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam, fuga repudiandae sint voluptatibus iusto velit dolores! Aliquid porro, nostrum cupiditate similique nisi ipsum recusandae sed incidunt, voluptatem fugit mollitia soluta?
        </Text> */}
        <TouchableOpacity className='bg-blue-400 p-2 rounded-full w-full flex-row space-x-2 items-center justify-center' onPress={() => {
          router.push('/home')
        }}>
          <Ionicons name='mail-outline' size={25} color={'#fff'} />
          <Text className='font-semibold text-white '>
            Continue with Email
          </Text>

        </TouchableOpacity>
        <TouchableOpacity className=' border border-gray-400 p-2 rounded-full w-full flex-row space-x-2 items-center justify-center' onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name='logo-google' size={25} color={'#000'} />
          <Text className='font-semibold text-black '>
            Continue with Google
          </Text>

        </TouchableOpacity>
        <TouchableOpacity className=' border border-gray-400 p-2 rounded-full w-full flex-row space-x-2 items-center justify-center' onPress={() => onSelectAuth(Strategy.Facebook)}>
          <Ionicons name='logo-facebook' size={25} color={'#000'} />
          <Text className='font-semibold text-black '>
            Continue with Facebook
          </Text>

        </TouchableOpacity>
        <TouchableOpacity className=' border border-gray-400 p-2 rounded-full w-full flex-row space-x-2 items-center justify-center' onPress={() => onSelectAuth(Strategy.Tiktok)}>
          <Ionicons name='logo-tiktok' size={25} color={'#000'} />
          <Text className='font-semibold text-black '>
            Continue with Tiktok
          </Text>
        </TouchableOpacity>
        <View className='flex-row items-center justify-center space-x-2 mt-3'>
          <Text className='font-semibold'>
            Don't have an account ?
          </Text>
          <Link href={'/sign-up'} className=''>
            <Text className='text-gray-700 underline'>
              Sign Up
            </Text>
          </Link>
        </View>
        {/* <View>
          <Text className='text-center'>
            By registering, you have agreed to our terms of terms of sevice and privacy policy
          </Text>
        </View> */}
      </Animated.View>

    </View>
  )
}

export default Page

const styles = StyleSheet.create({})