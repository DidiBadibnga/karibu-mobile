import { StyleSheet, Text, View, Image, ListRenderItem, TouchableOpacity, Dimensions } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import MapView from 'react-native-maps'




const DestinationMap = () => {
    const { width, height } = Dimensions.get('screen');
    const bottomSheetRef = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => ['30%', "80%"], [])
    const [isShown, setIsShown] = useState(false)
    const showMap = () => {

        bottomSheetRef.current?.collapse();
        // setRefrech(refrech + 1)
    }
    return (
        <BottomSheet ref={bottomSheetRef}  backgroundStyle={{
            backgroundColor: "#23262D"
        }} index={1} enablePanDownToClose={true} handleIndicatorStyle={{
            backgroundColor: "#fff",
        }} style={{
            elevation: 4,
            borderRadius: 10,
        }} snapPoints={snapPoints} >
            <View className='flex-1 '>

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
                <View className='absolute bottom-8 w-full items-center  '>
                    <TouchableOpacity onPress={showMap} className='bg-white flex-row p-4  rounded-full items-center  mx-auto space-x-2'>
                        <Text className='text-sm font-semibold text-gray-900'>
                            Hide Map
                        </Text>
                        <Ionicons name='map' size={20} color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>

        </BottomSheet >
    )
}

export default DestinationMap

const styles = StyleSheet.create({})