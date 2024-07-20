import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SearchBar } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
const ExploreHeader = () => {
    // const [value, setValue] = React.useState("");
    return (


        <View style={{
            backgroundColor: "#fff",
            flex: 1,
            // height: 150,
            padding:40,

        }}>
            
            {/* <SearchBar
                    platform="default"
                    containerStyle={{
                        width: '100%',
                        backgroundColor: "none"
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#fff',
                            padding: 10,
                            
                            borderRadius: 40,
                            }}
                            inputStyle={{}}
                            leftIconContainerStyle={{}}
                            rightIconContainerStyle={{}}
                            loadingProps={{}}
                            onChangeText={newVal => setValue(newVal)}
                            //   onClearText={() => console.log(onClearText())}
                    placeholder="Type query here..."
                    placeholderTextColor="#888"
                    //   cancelButtonTitle="Cancel"
                    //   cancelButtonProps={{}}
                    //   onCancel={() => console.log(onCancel())}
                    value={value}
                    /> */}

        </View>




    )
}

export default ExploreHeader

const styles = StyleSheet.create({})