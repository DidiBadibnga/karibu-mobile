import { StyleSheet, Text, View, Image, ListRenderItem, TouchableOpacity } from 'react-native'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import BottomSheet from "@gorhom/bottom-sheet"
import {
    ScrollView,
    FlatList
} from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Link } from 'expo-router'
import { getCities } from '@/api'
import { Destination } from '@/interfaces/interfaces'
import { Ionicons } from '@expo/vector-icons';
import DestinationListing from './DestinationListing';
import Loading from '../ui/loading';
import { LinearGradient } from 'expo-linear-gradient';
interface Props {
    category?: string;
    searchTerm?: string;
}
const ListingBottomSheet = ({
    category = '',
    searchTerm
}: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null)
    const listRef = useRef<FlatList>(null)
    const [destinations, setDestinations] = useState<Destination[] | null>(null)
    const [refrech, setRefrech] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const url = `http://192.168.31.10:8080/api/destinations${category !== "" ? '?category=' + category : ''}${searchTerm ? (category ? '&' : '?') + 'search=' + searchTerm : ''}`;
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]); // Your initial data
    const onRefresh = () => {
        setRefreshing(true);
        // Fetch new data and update your list
        // Update with new data
        setRefreshing(false);
    };
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch(url).then(response => response.json())
            setDestinations(res)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)

        }
    }
    useEffect(() => {
        fetchData()
        if (refrech) {
            listRef.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
    }, [refrech, category, searchTerm])
    const showMap = () => {
        bottomSheetRef.current?.collapse();
        // setRefrech(refrech + 1)
    }
    const snapPoints = useMemo(() => ['10%', "80%"], [])
    return (
        <BottomSheet ref={bottomSheetRef} enableOverDrag backgroundStyle={{
            backgroundColor: "#23262D"
        }} index={1} enablePanDownToClose={false} handleIndicatorStyle={{
            backgroundColor: "#fff",
        }} style={{
            elevation: 4,
            borderRadius: 10,
        }} snapPoints={snapPoints} >
            <View className='flex-1 '>
                {/* {(error && loading) && (
                    <View className='items-center justify-center '>
                        
                        <TouchableOpacity className='p-3 bg- flex items-center justify-center bg-[#263a99]' onPress={fetchData}>
                            <Text className='text-white text-center'>
                                Reesayer
                            </Text>
                        </TouchableOpacity>
                    </View>
                )} */}
                {/* {loading && (
                    <View className='items-center justify-center'>
                        <Loading size={50} color={"#fff"} />
                        <Text className='font-bold text-2xl text-white'>
                            Loading...
                        </Text>

                    </View>
                )} */}
                {/* {!loading && (
                    <DestinationListing destinations={destinations} />
                )} */}
                <View className='absolute bottom-8 w-full items-center  '>
                    <TouchableOpacity onPress={showMap} className='bg-white flex-row p-4  rounded-full items-center  mx-auto space-x-2'>
                        <Text className='text-sm font-semibold text-gray-900'>
                            Map
                        </Text>
                        <Ionicons name='map' size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

export default ListingBottomSheet
const styles = StyleSheet.create({})