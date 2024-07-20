import { StyleSheet, Text, View, Image, ListRenderItem, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Rating } from "@rneui/base";
import BottomSheet from "@gorhom/bottom-sheet"
import {
    ScrollView,
    FlatList
} from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Link } from 'expo-router'
import { getCities } from '@/api'
import { City, Destination } from '@/interfaces/interfaces'
import { Ionicons } from '@expo/vector-icons';
import { useDestinationContext } from '@/context/GlobalProvider';

interface Props {
    destinations: Destination[] | null;
    category?: string;
    term?: string;
    // refrech:number 
}
export default function DestinationListing({ destinations, category = "Mountain", term }: Props) {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null)
    const [refreshing, setRefreshing] = useState(false);
    const { savedDestinations, removeDestination, addDestination, isDestinationSaved } = useDestinationContext();

    // const isSaved = () => {
    //     return savedDestinations?.some(d => d.id === destinations?.id) 


    // }
    useEffect(() => {




    }, [savedDestinations, addDestination])
    return (
        <View className='flex-1 font-Nunito'>
            <FlatList data={destinations} showsVerticalScrollIndicator={false} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                        // Handle the refresh action here
                        // For example, fetch new data from an API
                        // Once done, setRefreshing(false);
                        setRefreshing(true);
                        // Fetch new data...
                        // After fetching, setRefreshing(false);
                    }}
                />
            } ListEmptyComponent={() => (
                <View className='flex-1 items-center justify-center'>
                    <Text className='text-white font-bold text-3xl'>
                        No item to show
                    </Text>

                </View>
            )} ref={listRef} contentContainerStyle={{
                paddingHorizontal: 10
            }} className='flex-1' keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
                <Link asChild href={`/destination/${item.id}`} >
                    <TouchableOpacity className=' w-full relative '>

                        <Animated.View entering={FadeInUp} exiting={FadeOutDown} className='relative'>
                            <Image className='h-[350px] rounded-md w-full object-cover object-center relative' source={{
                                uri: item?.images[0]
                            }} />
                            <TouchableOpacity className={`absolute rounded-full bg-white top-3 right-4 p-3`} onPress={() => {
                                if (isDestinationSaved(item.id)) {
                                    removeDestination(item.id)
                                }
                                else {
                                    addDestination(item.id)
                                }
                            }}>
                                {
                                    isDestinationSaved(item.id) ? (
                                        <Ionicons className='' color={`#ff7c03`} name='heart' size={30} />
                                    ) : (
                                        <Ionicons className='' color={`#000`} name='heart-outline' size={30} />
                                    )
                                }
                            </TouchableOpacity>
                            <View className='p-4'>
                                <Animated.Text entering={FadeIn} className='font-bold text-2xl text-primary-extra'>
                                    {item?.name}
                                </Animated.Text>
                                <View className='flex-row'>
                                    <Ionicons name='location-outline' color={"#000"} size={20} />
                                    <Text>
                                        {"Kinshasa"}
                                    </Text>
                                </View>
                                {/* <Text className='text-white font-semibold text-sm'>
                                    {item? .description}
                                </Text> */}
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </Link>
            )} />
        </View>
    )
}

const styles = StyleSheet.create({})


