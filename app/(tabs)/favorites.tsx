// import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { Stack } from 'expo-router'
// import { model } from '@/libs/generative'
// import { TextInput } from 'react-native'
// import { Part } from '@google/generative-ai'
// import { Ionicons } from '@expo/vector-icons'
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // const storeData = async (value) => {
// //     try {
// //       const jsonValue = JSON.stringify(value);
// //       await AsyncStorage.setItem('my-key', jsonValue);
// //     } catch (e) {
// //       // saving error
// //     }
// //   };
// enum Role {
//     "user",
//     "model"
// }
// interface Chat {
//     role: Role;
//     message: string;
// }
// const Favorites = () => {
//     const chat = model.startChat({
//         history: [
//             {
//                 role: "user",
//                 parts: [
//                     {
//                         text: "Pretend you're a tourism and you wanna know about the Congo DR"
//                     }
//                 ],
//             },
//             {
//                 role: "model",
//                 parts: [{
//                     text: "Pretend you know everything about the Congo DR"
//                 }],
//             },
//         ],
//         generationConfig: {
//             maxOutputTokens: 100,
//         },
//     });
//     const [loading, setIsLoading] = useState(false)
//     const [chats, setChats] = useState<Chat[]>([])
//     const [responses, setResponses] = useState<string[]>([])
//     const [prompt, setPrompt] = useState('')
//     const handleSend = async (message: string) => {
//         setPrompt('')
//         setChats((prevItems) => [...chats, {
//             message: message,
//             role: Role.user
//         }])
//         // setMessages([...messages, message])
//         try {
//             setIsLoading(true)
//             const req = await chat.sendMessage(message);
//             const result = req.response.text()

//             setChats((prevItems) => [...prevItems, {
//                 message: result,
//                 role: Role.model
//             }])

//         } catch (error) {
//             console.log(error)
//             setIsLoading(false)
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <View className='h-full p-0'>
//             <Stack.Screen options={{
//                 headerTitle: 'Liked Places',
//                 headerTitleAlign: 'center'
//             }} />

//             <View className='flex-1 '>

//                 <ScrollView style={{
//                     padding: 12,
//                     flex: 1
//                 }} contentContainerStyle={{
//                     gap: 15
//                 }} >


//                     {chats.map((item: Chat, idx: number) => {
//                         if (item.role === Role.user) {
//                             return (
//                                 <View key={idx} className=' flex w-full items-end p-2'>
//                                     <Text className='bg-fuchsia-200 p-2 rounded-md'>
//                                         {item.message}
//                                     </Text>
//                                 </View>
//                             )
//                         }
//                         return (
//                             <View key={idx} className=' flex w-full'>
//                                 <Text style={{
//                                     fontWeight: "500"
//                                 }} className='text-black  rounded-md bg-gray-200 p-2 '>
//                                     {item.message}
//                                 </Text>
//                             </View>
//                         )
//                     }


//                     )}

//                     {/* {messages.map((item, idx) => (
//                             <View key={idx} className=' flex w-full items-end p-2'>
//                                 <Text className='text-black font-bold'>
//                                     {item}
//                                 </Text>
//                             </View>

//                         ))} */}

//                 </ScrollView>
//             </View>
//             <View>
//                 {loading && (
//                     // <Ionicons name='circle'/>
//                     <Text className='text-black text-3xl'>
//                         Loading...
//                     </Text>
//                 )}
//             </View>
//             <View className='p-3 w-full'>
//                 <View className='flex flex-row w-full bg-gray-200/95 rounded-full p-3'>
//                     <TextInput className=' flex-1 w-full p-2 text-black placeholder:font-semibold ' placeholder='Type something ...' value={prompt} onChangeText={(v) => setPrompt(v)} />
//                     <TouchableOpacity className=' flex items-center justify-center p-1' onPress={() => handleSend(prompt)}>
//                         <Ionicons name='send' color={'#000'} size={40} />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             {/* <Text className='text-center text-2xl text-gray-900'>
//                         Sorry, You don't have any favor

//                     </Text> */}


//         </View>
//     )
// }

// export default Favorites

// const styles = StyleSheet.create({})

// SavedDestinationsScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDestinationContext } from '@/context/GlobalProvider';
import Animated, { FadeIn, FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const SavedDestinationsScreen = () => {
    const { savedDestinations, removeDestination, addDestination, isDestinationSaved } = useDestinationContext();
    useEffect(() => {
        console.log(savedDestinations)
    }, [savedDestinations])

    return (
        <View className='h-full font-Nunito bg-gray-200'>
            <FlatList data={savedDestinations} showsVerticalScrollIndicator={false} ListEmptyComponent={() => (
                <View className='flex-1 flex-col items-center justify-center'>
                    <Text className='text-black font-bold text-3xl'>
                        No item to show
                    </Text>

                </View>
            )} contentContainerStyle={{
                gap: 6,
                padding: 10
            }} className='h-full' keyExtractor={(item) => item.id.toString()} renderItem={({ item }: any) => (
                <Link asChild href={`/destination/${item.id}`} >
                    <TouchableOpacity className=' w-full relative bg-white rounded-lg'>

                        <Animated.View entering={FadeInUp} className='relative px-2 py-4'>
                            <Image className='h-[350px] rounded-md w-full object-cover object-center relative' source={{
                                uri: item?.images[0]
                            }} />
                            <TouchableOpacity className={`absolute rounded-full bg-white top-6 right-4 p-3`} onPress={() => {
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
                            <View className='p-2'>
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    destinationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
});

export default SavedDestinationsScreen;
