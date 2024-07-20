import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router';

import { LinearGradient } from 'expo-linear-gradient';
import { Event } from '@/interfaces/interfaces';
interface Props {
    title: string,
    imgUrl: string,
    authorName: string,
    publishTime: string,
    slug: string
    authorPic: string
    category: string
    // ref:never | any

}
const EventCarouselCard = ({ id,
    name,
    description,
    startDate,
    endDate,
    location,
    image,
}: Event) => {
    // const article = getArticle('ed-dwight-a-dream-realized-at-90')
    // const date = formattedDate(publishTime)

    const router = useRouter()
    return (
        <Link href={`/article/`} asChild className='mx-2' >
            <TouchableOpacity className='overflow-hidden rounded-xl shadow-lg border-transparent' >
                <View className='w-full flex-col'>
                    <View className=' relative rounded-xl'>
                        <Image source={{
                            uri: image
                            // uri: 'https://images.pexels.com/photos/20778184/pexels-photo-20778184/free-photo-of-ville-art-monument-building.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load'
                        }} className='w-full h-64 bg-center' />

                        <View className='absolute bottom-4 left-2 z-50'>

                            <Text className='font-bold text-xl leading-loose text-white'>
                                {name}
                            </Text>

                        </View>
                        <TouchableOpacity className='absolute top-5 left-2 bg-blue-800 p-2 flex items-center justify-center rounded-full w-24' >
                            <Text className='text-white font-semibold'>
                                {location}
                            </Text>
                        </TouchableOpacity>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                            //   style={styles.background} // Assuming you have styles defined elsewhere
                            className='absolute left-0 bottom-0 right-0 h-32'
                            start={{ x: 0.5, y: 1 }} // Start from bottom center
                            end={{ x: 0.5, y: 0 }} // End at top center
                        />
                    </View>

                    {/* <View className='flex flex-row items-center mt-2 p-2'>
                        <Image source={{
                            uri: authorPic
                        }} className='h-9 w-9 rounded-full bg-cover' />
                        <Text className='text-sm font-semibold text-gray-700 ml-2'>
                            {authorName}
                        </Text>
                        <Text className='text-sm ml-2'>
                            {date}
                        </Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        </Link >
    )
}

export default EventCarouselCard