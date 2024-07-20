import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import * as Animated from 'react-native-reanimated'

import { FadeIn, SlideInUp, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated'
// import { createAnimatedComponent } from 'react-native-reanimated/lib/typescript/createAnimatedComponent'
// const AnimatedText = Animated.crea
interface Props {
    text: string;
    duration?: number;
}
const TextWrittingEffect = ({ text, duration = 2000 }: Props) => {
    // const animatedValue = Animated.useSharedValue(0)
    // useEffect(() => {
    //     animatedValue.value = Animated.withTiming(text.length, {
    //         duration,
    //         easing: Animated.Easing.linear,
    //     });
    // }, [text, duration, animatedValue])

    // const animatedProps = Animated.useAnimatedProps(() => {
    //     const currentText = text.slice(0, Math.round(animatedValue.value));
    //     return {
    //         text: currentText
    //     }
    // })

    return (
        <View className='flex-1 '>
            {/* <AnimatedText className='font-bold text-white text-2xl' animatedProps={animatedProps}>
                {text}
            </AnimatedText> */}
        </View>
    )
}

export default TextWrittingEffect

const styles = StyleSheet.create({})