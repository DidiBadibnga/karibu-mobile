// const YourComponent = () => {
//     const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  
//     const toggleOverlay = () => {
//       setIsOverlayVisible(!isOverlayVisible);
//     };
  
//     {/* Rest of your content */}
//     {/* <TouchableOpacity onPress={toggleOverlay}>
//       <Image
//         style={{ width: 100, height: 50 }}
//         source={{ uri: item }}
//       />
//     </TouchableOpacity> */}
//     return (
//       <View style={{ flex: 1 }}> {/* This View should fill the entire screen */}
//         <TouchableWithoutFeedback onPress={() => setIsOverlayVisible(false)}>
//           <View style={{ flex: 1 }}>
//             {isOverlayVisible && (
//               <View style={StyleSheet.absoluteFillObject}>
//                 {/* Your overlay content here */}
//                 <Image
//                   style={{ width: '100%', height: '100%' }}
//                   source={{ uri: item }}
//                   resizeMode='cover'
//                 />
//               </View>
//             )}
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   };
  