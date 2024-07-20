import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
interface Props {
    open: boolean;
}
const ModalSheet = () => {
    // ref
    const [show, setShow] = useState(open)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '80%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {

        bottomSheetModalRef.current?.present();

    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (
        <BottomSheetModalProvider>
            <View style={styles.container} className='bg-amber-300'>
                <TouchableOpacity className='bg-blue-700' onPress={handlePresentModalPress}>
                    <Text className='text-white'>
                        Present Modal
                    </Text>
                </TouchableOpacity>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        // backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default ModalSheet;