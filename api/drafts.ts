// <FlatList data={cities} ListHeaderComponent={() => (
//     <Text className='text-white font-semibold text-center p-2'>
//         {cities?.length} destinations
//     </Text>
// )} ref={listRef} contentContainerStyle={{
//     paddingHorizontal: 10
// }} className='flex-1' keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
//     <Link asChild href={`/destination/${item.id}`} >
//         <TouchableOpacity className=' w-full '>
//             <Animated.View entering={FadeInUp} exiting={FadeOutDown} className=''>
//                 <Image className='h-[350px] rounded-md w-full object-cover object-center' source={{
//                     uri: "http://192.168.142.10:8080/images/kin_5.jpg"
//                 }} />
//                 <View className='p-2'>
//                     <Animated.Text entering={FadeIn} className='font-bold text-2xl text-white'>
//                         {item?.name}
//                     </Animated.Text>
//                     {/* <Text className='text-white font-semibold text-sm'>
//                     {item? .description}
//                 </Text> */}
//                 </View>
//             </Animated.View>
//         </TouchableOpacity>
//     </Link>
// )} />