import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CheckBox } from '@rneui/themed';
import { Stack } from 'expo-router'
import { Overlay } from '@rneui/themed';
enum Sort {
    "asc",
    "desc"
}
const filter = () => {
    const [filters, setFilters] = useState({
        sort: Sort.asc,
        // price: {},
        // minPrice: 0,
        // maxPrice: 0,
        // // minRating: 0,
        // // maxRating: 5,
        // priceRange: {},
        // location: '',
        // category: '',
        rating: 0,
        // distance: 0,
        // cuisine: '',

    })
    return (
        <SafeAreaView>
            <Stack.Screen />
            <View className='p-4'>
                <View className=''>
                    <Text>
                        Sort By:

                    </Text>

                    <View className='flex-row justify-between'>
                        <Text>A-Z</Text>
                        <CheckBox
                            checked={filters.sort === Sort.asc}
                            onPress={() => setFilters(
                                {
                                    ...filters,
                                    sort: Sort.asc
                                }
                            )}

                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                        />


                    </View>
                    <View className='flex-row justify-between'>
                        <Text>A-Z</Text>
                        <CheckBox
                            checked={filters.sort === Sort.desc}
                            onPress={() => setFilters(
                                {
                                    ...filters,
                                    sort: Sort.desc
                                }
                            )}

                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                        />


                    </View>
                    {/*  */}

                </View>


            </View>
        </SafeAreaView>
    )
}

export default filter

const styles = StyleSheet.create({})