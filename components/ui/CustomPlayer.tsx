// import React
// , { useRef, useState } from "react";
// import { AVPlaybackStatus, Video } from "expo-av";
// import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
// import { Slider } from 'react-native-awesome-slider';
// import { useSharedValue } from "react-native-reanimated";
// const CustomVideoPlayer = ({ source }) => {
//     const videoRef = useRef<Video>(null);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [isFullScreen, setIsFullScreen] = useState(false);
//     const progress = useSharedValue(0.20);
//     const min = useSharedValue(0);
//     const max = useSharedValue(0.50);

//     const playPause = () => {
//         setIsPlaying(!isPlaying);
//     };
//     const handleSeek = (slideValue: number) => {
//         // console.log(slideValue)
//         const value = parseFloat(slideValue.toFixed(2)) * 1000
//         console.log(value)
//         videoRef?.current?.setPositionAsync(value)
//         // progress.modify(slideValue)
//     };

//     const handleLoad = () => {
//         const status = videoRef.current?.getStatusAsync().then(status => status).then(status => status)



//     }


//     const toggleFullScreen = () => {
//         setIsFullScreen(!isFullScreen);
//         if (isFullScreen) {

//             videoRef?.current?.dismissFullscreenPlayer();
//         } else {
//             videoRef?.current?.presentFullscreenPlayer();
//         }
//     };
//     // const handleVolume = (v) => {
//     //     videoRef.current?.setVolumeAsync(v)
//     //     // max.modify(event.nativeEvent.duration)

//     // }
//     return (
//         <View style={[styles.container, isFullScreen ? styles.fullScreen : {}]}>
//             <Video

//                 ref={videoRef}
//                 source={source}

//                 onLoad={(status) => handleLoad()}
//                 useNativeControls={true} // Disable native controls
//                 // onPlaybackStatusUpdate={(status) => {
//                 //     setIsPlaying(status.isPlaying);
//                 //     setCurrentTime(status.currentTime);
//                 //     setDuration(status.duration);

//                 // }}

//                 style={[styles.video, isFullScreen ? styles.fullScreenVideo : {}]}
//             />
//             <View style={styles.controls}>
//                 <TouchableOpacity onPress={playPause}>
//                     <Text style={styles.controlText}>{isPlaying ? 'Pause' : 'Play'}</Text>
//                 </TouchableOpacity>
//                 {/* <Slider
            
//                     style={styles.slider}
//                     minimumValue={0}
//                     maximumValue={duration}
//                     value={currentTime}
//                     onSlidingComplete={handleSeek}
//                 /> */}
//                 <Slider
//                     style={styles.slider}
//                     progress={progress}
//                     onValueChange={(v) => {
//                         handleSeek(v)
//                     }}
//                     minimumValue={min}
//                     maximumValue={max}
//                 // onSlidingComplete={(v) => {
//                 //     handleSeek(v)
//                 // }}

//                 />
//                 <Text style={styles.controlText}>{Math.trunc(currentTime)}s / {Math.trunc(duration)}s</Text>
//                 <TouchableOpacity onPress={toggleFullScreen}>
//                     <Text style={styles.controlText}>{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     video: {
//         flex: 1,

//     },
//     fullScreen: {
//         // position: 'absolute',
//         // top: 0,
//         // left: 0,
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//     },
//     fullScreenVideo: {
//         width: '100%',
//         height: '100%',
//     },
//     controls: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: 10,
//     },
//     controlText: {
//         color: 'white',
//         fontSize: 16,
//     },
//     slider: {
//         width: '80%',
//     },
// });

// export default CustomVideoPlayer;