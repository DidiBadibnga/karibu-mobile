// import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { CheckBox } from '@rneui/themed';
// import { Stack } from 'expo-router'
// import { Overlay } from '@rneui/themed';
// enum Sort {
//     "asc",
//     "desc"
// }
// const filter = () => {
//     const [visible, setVisible] = useState(false);

//     const toggleOverlay = () => {
//         setVisible(!visible);
//     };
//     const [filters, setFilters] = useState({
//         sort: Sort.asc,

//         rating: 0,


//     })
//     return (
//         <SafeAreaView>
//             <Stack.Screen />
//             <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

//             </Overlay>
//             <View className='p-4'>
//                 <View className=''>
//                     <Text>
//                         Sort By:

//                     </Text>

//                     <View className='flex-row justify-between'>
//                         <Text>A-Z</Text>
//                         <CheckBox
//                             checked={filters.sort === Sort.asc}
//                             onPress={() => setFilters(
//                                 {
//                                     ...filters,
//                                     sort: Sort.asc
//                                 }
//                             )}

//                             checkedIcon="dot-circle-o"
//                             uncheckedIcon="circle-o"
//                         />


//                     </View>
//                     <View className='flex-row justify-between'>
//                         <Text>A-Z</Text>
//                         <CheckBox
//                             checked={filters.sort === Sort.desc}
//                             onPress={() => setFilters(
//                                 {
//                                     ...filters,
//                                     sort: Sort.desc
//                                 }
//                             )}

//                             checkedIcon="dot-circle-o"
//                             uncheckedIcon="circle-o"
//                         />


//                     </View>
//                     {/*  */}

//                 </View>


//             </View>
//         </SafeAreaView>
//     )
// }

// export default filter

// const styles = StyleSheet.create({})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from '@rneui/themed';
import { Overlay } from '@rneui/themed';

export enum Sort {
    "asc",
    "desc"
}

interface FilterProps {
    visible: boolean;
    onApply: (filters: { sort: Sort; rating: number }) => void;
    onClose: () => void;
}

const Filter: React.FC<FilterProps> = ({ visible, onApply, onClose }) => {
    const [filters, setFilters] = useState({
        sort: Sort.asc,
        rating: 0,
    });

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    useEffect(() => {
        if (!visible) {
            setFilters({ sort: Sort.asc, rating: 0 });
        }
    }, [visible]);

    return (
        <SafeAreaView style={styles.container}>
            <Overlay isVisible={visible} onBackdropPress={onClose}>
                <View style={styles.overlayContent}>
                    <Text style={styles.overlayTitle}>Filters</Text>
                    <View style={styles.filterSection}>
                        <Text style={styles.filterLabel}>Sort By:</Text>
                        <View style={styles.checkboxContainer}>
                            <Text style={styles.checkboxLabel}>A-Z</Text>
                            <CheckBox
                                checked={filters.sort === Sort.asc}
                                onPress={() => setFilters({ ...filters, sort: Sort.asc })}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                        <View style={styles.checkboxContainer}>
                            <Text style={styles.checkboxLabel}>Z-A</Text>
                            <CheckBox
                                checked={filters.sort === Sort.desc}
                                onPress={() => setFilters({ ...filters, sort: Sort.desc })}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                        <Text style={styles.applyButtonText}>Apply Filters</Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        </SafeAreaView>
    );
};

export default Filter;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayContent: {
        padding: 20,
        width: 300,
    },
    overlayTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    filterSection: {
        marginBottom: 20,
    },
    filterLabel: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        fontSize: 16,
    },
    applyButton: {
        padding: 10,
        backgroundColor: '#0ac6a1',
        borderRadius: 8,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
