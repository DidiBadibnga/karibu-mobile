import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import ListingBottomSheet from '@/components/sections/ListingBottomSheet';
import { Link, Stack, Tabs, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { City, Destination } from '@/interfaces/interfaces';
import { SearchBar } from '@rneui/themed';
import { categories } from '@/constants/Data';
import * as Haptics from "expo-haptics"
import { Skeleton } from '@rneui/themed';
import ExploreHeader from '@/components/ui/ExploreHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '@/components/ui/loading';
import DestinationListing from '@/components/sections/DestinationListing';
import { ip_adress } from '@/constants/constants';
import FiltersModal, { Sort } from '@/components/sections/FiltersModal';
interface Props {
    activeSection: (n: number) => void;
    category?: string;
    searchTerm?: string;
}

export const Kinshasa = {
    latitude: -4.33390,
    longitude: 15.3272, // Longitude of New York City
    latitudeDelta: 0.0922, // Adjust zoom level as needed (smaller for more zoomed-in)
    longitudeDelta: 0.0421, // Adjust zoom level as needed (smaller for more zoomed-in)
};
const { width, height } = Dimensions.get('screen');
const Home = ({ activeSection }: Props) => {
    const { queryTerm } = useGlobalSearchParams<{ queryTerm: string }>()
    const router = useRouter()

    const [cat, setCat] = useState("")
    const handleActive = (n: number) => {
        activeSection(n)
    }
    const [category, setCategory] = useState("")
    const [term, setTerm] = useState('')
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '80%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
    }, []);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([])
    const scrollRef = useRef<ScrollView>(null)
    const [destinations, setDestinations] = useState<Destination[] | null>(null)
    const [refrech, setRefrech] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('')
    const [refreshing, setRefreshing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0)
    const listRef = useRef<FlatList>(null)
    const onRefresh = () => {
        setRefreshing(true);
        setRefreshing(false);
    };
    const url = `http://${ip_adress}:8080/api/destinations${category !== "" ? '?category=' + category : ''}${term ? (category ? '&' : '?') + 'search=' + term : ''}`;
    const fetchData = async () => {
        try {

            const res = await fetch(url).then(response => response.json())
            setDestinations(res)

            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
            setError(true)

        }
    }
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            fetchData()
        }, 2000);
        if (refrech) {
            listRef.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }
    }, [refrech, category, term])
    const handleQuery = (v: string) => {

        setQuery(v)
    }
    const newYorkMarker = {
        latitude: 40.7128,
        longitude: -74.0059,
    };
    const onMarkerSelected = () => {
        router.push('/destination/2')
    }

    const selectCategory = (index: number) => {
        // const selected = itemsRef.current[index]
        if (categories[index]?.name === "All") {
            setCategory("")
            setActiveIndex(index)


        }

        else {
            setActiveIndex(index)
            setCategory(categories[index]?.name!)
        }


    }

    const handleSearch = () => {
        if (query === "") return;
        console.log(query)
        setTerm(query)

    }
    const handleClear = () => {
        setQuery("")
        setTerm("")
    }
    const markers = [
        {
            latitude: -4.3368,
            longitude: 15.3242,
            title: 'Monument'
        }
    ]
    const routesCoordinates = [
        {
            latitude: -4.3368,
            longitude: 15.3242,

        },
        {
            latitude: -4.483,
            longitude: 14.050,

        },
    ]


    const [value, setValue] = React.useState("");
    const [filterVisible, setFilterVisible] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<{ sort: Sort; rating: number } | null>(null);
    const handleOpenFilter = () => {
        setFilterVisible(true);
    };

    const handleCloseFilter = () => {
        setFilterVisible(false);
    };

    const handleApplyFilters = (filters: { sort: Sort; rating: number }) => {
        setAppliedFilters(filters);
    };
    return (
        <View className='h-full bg-white' style={{
            flex: 1,
        }} >

            <Stack.Screen options={{
                header: () =>
                    <SafeAreaView className='bg-white  ' style={{
                        height: 200
                    }} >
                        <View className='p-2 bg-gray-100 flex-row space-x-1 '>
                            <SearchBar
                                // className='flex-1'
                                placeholder='Goma, Congo'
                                platform="android"
                                containerStyle={{
                                    backgroundColor: 'transparent',
                                    paddingHorizontal: 16,
                                    paddingVertical: 4,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: '#000',
                                    flex: 1
                                }}
                                inputContainerStyle={{}}
                                inputStyle={{}}
                                leftIconContainerStyle={{}}
                                rightIconContainerStyle={{}}
                                loadingProps={{}}
                                onChangeText={newVal => {
                                    if (newVal === "") setTerm('');
                                    else {
                                        setTerm(newVal)
                                    }

                                }
                                }
                                // onClearText={() => setTerm("")}
                                placeholderTextColor="#888"
                                //   cancelButtonTitle="Cancel"
                                //   cancelButtonProps={{}}
                                //   onCancel={() => console.log(onCancel())}
                                value={term}
                            />
                            <TouchableOpacity className='p-3 flex items-center justify-center  border rounded-full'>
                                <Ionicons name="options-outline" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                            gap: 20,
                            alignItems: "center",
                            padding: 5
                        }}>
                            {categories.map((category, idx) => (
                                <TouchableOpacity className='flex-col space-y-2' onPress={() => selectCategory(idx)} ref={(el) => itemsRef.current[idx] = el} key={idx}  >
                                    <View className={`${activeIndex === idx ? "bg-primary-extra border-none" : "bg-white border-gray-100 border"} p-4 items-center justify-center  rounded-full`}>

                                        {
                                            activeIndex === idx ? (
                                                <Ionicons name='airplane-outline' size={18} color={'#fff'} />
                                            ) :
                                                (
                                                    <Ionicons name='airplane-outline' size={18} color={'#000'} />
                                                )
                                        }
                                    </View>
                                    <Text className={`${activeIndex === idx ? "text-white" : "text-black "} font-semibold `} style={styles.menuItemStyle}>{category?.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </SafeAreaView>
            }} />
            {/* <MapView className='' zoomControlEnabled style={{
                height: height,
                width: width,
            }} initialRegion={{
                latitude: -4.038333,
                longitude: 21.758664,
                latitudeDelta: 5.0,
                longitudeDelta: 5.0,
            }}
            >
            </MapView> */}
            <View className='h-full'>
                {
                    filterVisible && (
                        <FiltersModal
                            visible={filterVisible}
                            onApply={handleApplyFilters}
                            onClose={handleCloseFilter}
                        />
                    )
                }
                {loading && (
                    <View className='gap-4 p-2'>

                        {Array.from({
                            length: 3
                        }).map((i, idx) => (
                            <View key={idx} className='space-y-3'>
                                <Skeleton animation='pulse' height={200} />
                                <View className='flex-row gap-2'>
                                    <Skeleton width={330} height={40} />
                                    <Skeleton circle width={40} height={40} />
                                </View>
                            </View>
                        ))}
                        {/* <Loading size={50} color={"#fff"} />
                        <Text className='font-bold text-2xl text-white'>
                            Loading...
                        </Text> */}

                    </View>
                )}
                {!loading && (
                    <DestinationListing destinations={destinations} />
                )}
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    menuItemStyle: {
        fontFamily: "Nunito"
    }
})
