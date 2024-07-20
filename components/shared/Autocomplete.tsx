import { TextInput, FlatList, View, TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
interface AutocompleteSearchProps {
  apiEndpoint: string;
  debounceDelay: number;
  placeholder: string;
  onSelect: (suggestion: Destination) => void;
  style?: ViewStyle;
  textInputStyle?: TextStyle;
  listStyle?: ViewStyle;
}
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Destination } from '@/interfaces/interfaces';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ apiEndpoint, debounceDelay, placeholder, onSelect, ...props }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Destination[] | null>([]);

  useEffect(() => {
    const debouncedFetchSuggestions = debounce(fetchSuggestions, debounceDelay);
    if (input.length > 2) {
      debouncedFetchSuggestions(input);
    }
    setSuggestions([])
    return () => debouncedFetchSuggestions.cancel();
  }, [input]);

  const fetchSuggestions = async (searchTerm: string) => {
    try {
      const response = await fetch(`${apiEndpoint}?search=${searchTerm}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectSuggestion = (suggestion: Destination) => {
    setInput(suggestion.name);

    setSuggestions([]);
    onSelect(suggestion);
  };

  const handleSearch = () => {
    if (input === "") return;
    router.push(`/explore?queryTerm=${input}`);


  }
  const handleClear = () => {
    setInput("")
  }

  return (
    <View className='relative' style={{
      ...props.style
    }}><View className='flex-row  p-2 rounded-full shadow-sm border border-gray-300 items-center'>
        <TouchableOpacity className={` rounded-full h-12 w-12 items-center justify-center`} onPress={handleSearch} >
          <Ionicons color={'#fff'} name='search-outline' size={29} />
        </TouchableOpacity>
        <TextInput value={input} onChangeText={setInput} style={props.textInputStyle} placeholder={placeholder} className='flex-1 h-full p-2 text-white' placeholderTextColor={'#fff'} />
        {input !== "" && (
          <TouchableOpacity className={`bg-primary-100 bg-[#535151] rounded-full h-12 w-12 items-center justify-center`} onPress={handleClear}>
            <Ionicons color={'#fff'} name='close' size={24} />
          </TouchableOpacity>
        )}
      </View>
      {
        suggestions!.length > 0 && (
          <View className='h-52 p-2 inset-0 w-full z-50 absolute mt-20'>
            <FlatList
              className=''
              data={suggestions}
              renderItem={({ item }) => (
                <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={() => handleSelectSuggestion(item)}>
                  <Text className='text-white'>{item.name}</Text>
                  <Ionicons color={'#fff'} name='chevron-forward-outline' size={24} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              style={styles.suggestionsList}
            />
          </View>
        )
      }
    </View>
  );
};
const styles = StyleSheet.create({
  suggestionsList: {


    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#000',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    // maxHeight: 200,
  },
});


export default AutocompleteSearch;
