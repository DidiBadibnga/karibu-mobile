import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import * as Animatable from 'react-native-animatable'
import { Destination } from '@/interfaces/interfaces'
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from '@rneui/base'
import { StatusBar } from 'expo-status-bar'
import { FlatList } from 'react-native-gesture-handler'
import { AnimatedView } from 'react-native-reanimated/lib/typescript/reanimated2/component/View'
import { ip_adress } from '@/constants/constants'
interface CarouselProps {
    item: Event,
    index: number
}
const Explore = () => {
    const { width, height } = Dimensions.get('screen');
    const [destinations, setDestinations] = useState<Destination[] | null>(null)
    const [term, setTerm] = useState("")
    const router = useRouter()

    const fetchData = async () => {
        try {
            const response = await fetch(`http://192.168.43.10:8080/api/destinations`).then(response => response.json())

            setDestinations(response)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const zoomIn = {
        0: {
            scale: 0.9
        },
        1: {
            scale: 1
        }
    }
    const zoomOut = {
        0: {
            scale: 1
        },
        1: {
            scale: 0.9
        }
    }
    return (
        <View className='flex-1' style={{

        }}>
            <View className='flex-1 pb-14'>
                <FlatList
                    contentContainerStyle={{
                        gap: 15,

                    }}
                    className=''
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={destinations}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Link asChild href={`/destination/${item.id}`} >
                            <TouchableOpacity key={item.id} className='bg-white h-[88%] ' style={{
                                width: (width / 100) * 75
                            }}>
                                <Animated.View className={'p-4'}>
                                    <Image className='h-full w-28 rounded-md' source={{
                                        uri: item.images[0]
                                    }} />

                                </Animated.View>
                            </TouchableOpacity>
                        </Link>

                    )}

                />
            </View>
            <Stack.Screen options={{
                header: () => <View className='py-14  px-4   ' style={{
                    height: height
                }}>
                    <View className=' ' >
                        <SearchBar

                            platform="android"
                            containerStyle={{
                                backgroundColor: 'white',
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: '#fff',

                            }}
                            inputContainerStyle={{
                                backgroundColor: "white",
                            }
                            }
                            value={term}
                            onChangeText={(val) => setTerm(val)}
                            inputStyle={{
                                fontSize: 21,
                                fontFamily: "Nunito",


                            }} />
                    </View>

                </View>
            }} />
            <MapView className='' zoomControlEnabled style={{
                height: height,
                width: width,
            }} initialRegion={{
                latitude: -4.038333,
                longitude: 21.758664,
                latitudeDelta: 5.0,
                longitudeDelta: 5.0,
            }}
            >

            </MapView>
            <StatusBar style='auto' />
        </View>
    )
}

export default Explore

const styles = StyleSheet.create({})
