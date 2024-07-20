import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native'
const TabsLayout = () => {
    return (



        <Tabs  screenOptions={{
            tabBarActiveTintColor: "#fff",
            // tabBarStyle: {
            //     padding:10
            // },
            
            tabBarBackground: () => <View className=' h-[200]  bg-[#222831]'>
            </View >
        }}>
            <Tabs.Screen name='home' options={{

                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='home' color={color} size={30} />)
            }} />
            <Tabs.Screen name='explore' options={{
                headerTransparent: true,
                tabBarLabel: "Explore",

                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='compass' color={color} size={30} />)
            }} />
            <Tabs.Screen name='favorites' options={{

                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='heart' color={color} size={30} />)
            }} />

            <Tabs.Screen name='profile' options={{

                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='person-circle-outline' color={color} size={30} />)
            }} />



        </Tabs >
    )
}

export default TabsLayout

const styles = StyleSheet.create({})