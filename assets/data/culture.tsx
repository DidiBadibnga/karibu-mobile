import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getCities } from '@/api'
import ListingBottomSheet from '@/components/sections/ListingBottomSheet'
import AutocompleteSearch from '@/components/shared/Autocomplete'
import { useRouter } from 'expo-router'

// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
const Blog = () => {
    const articles = getCities()
    const router = useRouter()
    return (
        <SafeAreaView className='flex-1'>
            {/* <AutocompleteSearch
                apiEndpoint="http://192.168.146.10:8080/api/destinations"
                debounceDelay={300}
                placeholder="Search destinations..."
                onSelect={(suggestion) => {
                    router.push(`/destination/${suggestion.id}`)

                }}
            /> */}
        </SafeAreaView>
    )
}

export default Blog

const styles = StyleSheet.create({})