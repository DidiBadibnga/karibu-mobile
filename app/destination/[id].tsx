import { Dimensions, ImageBackground, ScrollView, Share, StyleSheet, Image, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { City, Destination } from '@/interfaces/interfaces'
import { AVPlaybackStatus, AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeIn, FadeInUp, FadeOut, SlideInDown } from 'react-native-reanimated'
import { useSharedValue } from "react-native-reanimated";
import { AnimatableProps, createAnimatableComponent } from 'react-native-animatable'
import * as Linking from 'expo-linking';
import { Kinshasa } from '../(tabs)/home'
import * as Animatable from "react-native-animatable"
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Carousel from 'react-native-reanimated-carousel'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { LinearGradient } from 'expo-linear-gradient'
import { useDestinationContext } from '@/context/GlobalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import DestinationMap from '@/components/sections/DestinationMap'
import { ip_adress } from '@/constants/constants'
import { Tab } from '@rneui/themed';
interface Fade {
  children: React.ReactNode;
  props: AnimatableProps<PropsWithChildren>;
}
const DestinationDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { savedDestinations, removeDestination, addDestination, isDestinationSaved } = useDestinationContext();
  const videoRef = useRef<Video>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [play, setPlay] = useState(false)
  const [destination, setDestination] = useState<Destination | null>(null)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [currentPicture, setCurrentPicture] = useState(0)
  const [index, setIndex] = React.useState(0);
  const toggleOverlay = (index: number) => {
    if (index === currentPicture && isOverlayVisible) {
      setIsOverlayVisible(false);
    }
    else {
      setIsOverlayVisible(!isOverlayVisible);
      setCurrentPicture(index)
    }
  };
  const toggleMap = () => {
    if (isMapVisible) {
      setIsMapVisible(false)
    }
    else {
      setIsMapVisible(true)
    }
  };
  const fetchData = async () => {
    try {
      const res = await fetch(`http://${ip_adress}:8080/api/destinations/${id}`).then(response => response.json())
      setDestination(res)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  const router = useRouter()
  const shareListing = async () => {
    try {
      await Share.share({
        title: destination?.name,
        message: destination?.description,
        url: `http://localhost:3000/destination/${destination?.id}`
      })
    } catch (error) {
    }
  }
  const handlePlay = () => {
    setPlay(!play)
    if (play) {
      videoRef.current?.playAsync()
    }
    videoRef.current?.pauseAsync()
  }
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      videoRef?.current?.dismissFullscreenPlayer();
    } else {
      videoRef?.current?.presentFullscreenPlayer();
    }
  };
  const handleEnd = (status: AVPlaybackStatus) => {
  }
  const { height, width } = Dimensions.get('screen')
  const FadeView: React.FC<Fade> = ({ children, ...props }: Fade) => {
    const Comp = createAnimatableComponent(View)
    return <Comp {...props} >
      {children}
    </Comp>
  }
  return (
    <SafeAreaView className='h-full relative'>
      {isOverlayVisible && (
        <View className=' inset-0 h-full w-full bg-[#23262d]'>
          <TouchableWithoutFeedback onPress={() => setIsOverlayVisible(false)}>
            <View style={{ flex: 1 }} className='item-center justify-center flex-col relative'>
              <Animated.View entering={FadeIn.springify()} className='h-[46%]'>
                <Carousel defaultIndex={currentPicture} renderItem={({ item, index }) => (
                  <Animated.Image key={index} entering={FadeIn.delay(500)}
                    className={'h-full w-full'}
                    source={{ uri: item }}
                    resizeMode='cover'
                  />
                )} loop width={width} height={height / 2} data={destination?.images!} />
              </Animated.View>
              <View className='flex items-center inset-0 w-full h-full z-50 justify-end absolute'>
                <TouchableOpacity className='bg-white h-16 w-16  p-3 rounded-full mb-12 flex items-center justify-center' onPress={() => setIsOverlayVisible(false)}>
                  <Ionicons color={'#000'} name='close' size={24} />

                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
      {isMapVisible && (

        <View className=' inset-0 h-full w-full bg-black'>

          {/* <TouchableWithoutFeedback onPress={() => setIsMapVisible(false)}> */}
          <MapView zoomControlEnabled initialRegion={{
            latitude: -4.038333,
            longitude: 21.758664,
            latitudeDelta: 5.0,
            longitudeDelta: 5.0,
          }}
            style={{
              flex: 1,
              // height: `100%`,
              width: width,

            }} className='w-56' provider={PROVIDER_GOOGLE} mapType='standard' showsMyLocationButton showsUserLocation >
            <Marker pinColor='#000' coordinate={{
              latitude: -4.3840686,
              longitude: 15.4508775
            }}>
              <View className=''>
                <Ionicons name='location' color={'#000'} size={38} />
              </View>
            </Marker>
          </MapView>
          <View className='w-full p-3 justify-center items-center '>
            <TouchableOpacity className='bg-white h-16 w-16  p-3 rounded-full mb-12 flex items-center justify-center' onPress={() => setIsMapVisible(false)}>
              <Ionicons color={'#000'} name='close' size={24} />
            </TouchableOpacity>
          </View>

          {/* <View style={{ flex: 1 }} className='item-center justify-center flex-col relative'>
            
            <Animated.View entering={FadeIn.springify()} className='h-[76%]'>
              
            </Animated.View>
            <View className='flex items-center inset-0 w-full h-full z-50 justify-end absolute'>
              <TouchableOpacity className='bg-white h-16 w-16  p-3 rounded-full mb-12 flex items-center justify-center' onPress={() => setIsOverlayVisible(false)}>
                <Ionicons color={'#000'} name='close' size={24} />

              </TouchableOpacity>
            </View>
          </View> */}
          {/* </TouchableWithoutFeedback> */}
        </View>
      )}
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: '',

        headerLeft: () => (<TouchableOpacity className='bg-white mt-5 h-12 w-12  items-center justify-center rounded-full' onPress={() => {
          if (isMapVisible || isOverlayVisible) {
            setIsMapVisible(false);
            setIsOverlayVisible(false)
          }
          else {
            router.back()
          }
        }}>
          <Ionicons color={'#000'} name='arrow-back' size={24} />
        </TouchableOpacity>),
        headerRight: () => (<View className='flex flex-row items-center space-x-1 mt-5'>
          <TouchableOpacity className={`bg-white rounded-full h-12 w-12 items-center justify-center`} onPress={() => {
            if (isDestinationSaved(destination?.id!)) {
              removeDestination(destination?.id!)
            }
            else {
              addDestination(destination?.id!)
            }

          }}>
            {
              isDestinationSaved(destination?.id!) ? (

                <Ionicons className='' color={`#ff7c03`} name='heart' size={30} />
              ) : (
                <Ionicons className='' color={`#000`} name='heart-outline' size={30} />
              )
            }
          </TouchableOpacity>
          <TouchableOpacity className={`bg-white rounded-full h-12 w-12 items-center justify-center`} onPress={() => shareListing()}>
            <Ionicons color={'#000'} name='share-outline' size={24} />
          </TouchableOpacity>
        </View>)
      }} />


      <View className='flex-1'>
        <Animated.View entering={FadeIn.delay(200)} className={'relative h-[380px]'}>
          <Image className='h-full' source={{
            uri: destination?.images[0]
          }} />
          <Animated.View className='gap-2  absolute z-50  flex-row bottom-6 w-full justify-center items-center'>
            {destination?.images.slice(0, 3).map((item, idx) => (

              <View className={`h-20 w-20 my-4 relative `} key={idx} >
                <TouchableOpacity onPress={() => toggleOverlay(idx)} className='relative '>

                  <Image className='h-full w-full  rounded-2xl' source={{
                    uri: item
                  }} />
                  <View className={`absolute inset-0 h-full w-full items-center  justify-center ${idx == 2 ? "flex" : "hidden"}`}>
                    <Text className='text-white text-xl'>
                      {destination.images.length - 3}+
                    </Text>
                  </View>

                </TouchableOpacity>
              </View>

            ))}

          </Animated.View>
          <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            //   style={styles.background} // Assuming you have styles defined elsewhere
            className='absolute left-0 bottom-0 right-0 h-[150px]'
            start={{ x: 0.5, y: 1 }} // Start from bottom center
            end={{ x: 0.5, y: 0 }} // End at top center
          />
        </Animated.View>
        <View className='bg-white flex-1 -mt-5  py-4 ' style={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}>
          <ScrollView showsVerticalScrollIndicator={false} className='flex-1 ' contentContainerStyle={{
            backgroundColor: "#fff"
          }} >

            {/* <Tab value={index} onChange={setIndex} dense disableIndicator buttonStyle={{
              gap:12
            }}>
              <Tab.Item    containerStyle={(active) => ({
                // backgroundColor: active ? "red" : undefined,
                
                borderColor: "grey",
                borderWidth: 1,
                borderRadius:30
              })}>Tab</Tab.Item>
              <Tab.Item>Tab</Tab.Item>
            </Tab> */}
            <View className='flex-row'>

            </View>
            <Animated.View entering={FadeIn.delay(400)} className='px-6 '>


              <Text className='font-extrabold text-5xl text-primary-extra'>
                {destination?.name}
              </Text>

              <Text className='text-primary-extra'>
                {destination?.description}
              </Text>
              <Animated.View entering={FadeIn.duration(200)} className={'h-[200px] my-3 overflow-hidden rounded-lg bg-black relative '}>
                <Video ref={videoRef} shouldPlay={play} onPlaybackStatusUpdate={(s) => handleEnd(s)} isLooping source={{
                  uri: destination?.video!
                }} className='' resizeMode={ResizeMode.COVER} style={[styles.video, isFullScreen ? styles.fullScreenVideo : {}]} useNativeControls />
                {/* <View className='flex flex-row items-center justify-between p-3 absolute bottom-12 right-2  z-50'>
                  <TouchableOpacity onPress={toggleFullScreen}>
                    {isFullScreen ? (<Ionicons name='square-outline' size={15} color={'#fff'} />) : (<Ionicons name='diamond-sharp' size={15} color={'#fff'} />)}
                  </TouchableOpacity>
                </View> */}
                {/* <TouchableOpacity onPress={() => {
                  setPlay(false)
                }} className='inset-0 h-full w-full flex items-center justify-center absolute '>
                  {
                    play ? (
                      <Animatable.View animation="fadeOut" duration={2000} >
                        <TouchableOpacity className='' onPress={() => setPlay(false)}>
                          <Ionicons size={70} color={'#fff'} name='pause-circle' />
                        </TouchableOpacity>
                      </Animatable.View>

                    ) : (<TouchableOpacity className='' onPress={() => setPlay(true)}>
                      <Ionicons size={70} color={'#fff'} name='play-circle' />
                    </TouchableOpacity>)
                  }
                </TouchableOpacity> */}

              </Animated.View>
              <View className='space-y-3'>
                <Text className='font-bold text-2xl'>
                  Contacts
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:+243 ${destination?.contacts.phoneNumber}`)} className='rounded-md p-3 py-4 bg-orange-100 '>
                  <View className='flex items-center flex-row space-x-2'>
                    <Ionicons name='call' size={28} />
                    <Text>
                      {destination?.contacts.phoneNumber}
                    </Text>
                  </View>

                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${destination?.contacts.email}`)} className='rounded-md p-3 py-4 bg-blue-200 '>
                  <View className='flex items-center flex-row space-x-2'>
                    <Ionicons name='mail' size={28} />
                    <Text>
                      {destination?.contacts.email}
                    </Text>
                  </View>

                </TouchableOpacity>
              </View>
              <Animated.View className=' my-2 space-y-2' style={{

              }}>
                {/* <TouchableOpacity className='absolute bottom-6 right-6 z-50' onPress={toggleMap}>
                  <Ionicons name='square-outline' size={30} color={'#fff'} />
                </TouchableOpacity> */}
                <Text className='font-bold text-2xl'>
                  Contacts
                </Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${destination?.coordinates.latitude}%2C-122.3316393`)}>
                  <View className='overflow-hidden' style={{
                    borderRadius: 16,
                    height: 220,

                  }}>

                    <MapView zoomControlEnabled initialRegion={{
                      latitude: -4.038333,
                      longitude: 21.758664,
                      latitudeDelta: 5.0,
                      longitudeDelta: 5.0,
                    }}
                      style={{
                        height: "100%",

                        width: width,

                      }} className='w-56' provider={PROVIDER_GOOGLE} mapType='standard' showsMyLocationButton showsUserLocation >
                      <Marker pinColor='#000' coordinate={{
                        latitude: -4.3840686,
                        longitude: 15.4508775
                      }}>
                        <View className=''>
                          <Ionicons name='location' color={'#000'} size={38} />
                        </View>

                      </Marker>
                    </MapView>
                  </View>
                </TouchableOpacity>
              </Animated.View>


            </Animated.View>

          </ScrollView>
          {/* <DestinationMap /> */}

        </View>


      </View>

      <StatusBar animated style='dark' />
    </SafeAreaView>
  )
}
export default DestinationDetail
const styles = StyleSheet.create({
  video: {
    flex: 1,

  },
  fullScreen: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
})