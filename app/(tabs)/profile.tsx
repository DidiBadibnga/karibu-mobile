import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { Input } from '@rneui/themed';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as ImagePicker from "expo-image-picker";
import { TextInput } from 'react-native-gesture-handler';

const UserProfile = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)

  useEffect(() => {
    if (user) {
      setFirstName(user?.firstName)
      setLastName(user?.lastName)
      setEmail(user?.emailAddresses[0].emailAddress)
    }
    else {
      return
    }
  }, [user])

  const onSaveUser = async () => {
    try {
      if (!firstName || !lastName) return;
      await user?.update({
        firstName,
        lastName,
      });
    } catch (error) {
      console.error(error);

    } finally {

      setEdit(false)
    }

  }

  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.75,
      allowsEditing: true,

      base64: true

    });
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;

      user?.setProfileImage({
        file: base64
      })
    }
  }
  const [edit, setEdit] = useState(false);

  const [expanded, setExpanded] = useState(true);
  const liste2 = [
    {
      title: "Uncontrolled Accordion",
      icon: "folder",
      items: ["First item", "Second item"],
    },
    {
      title: "Controlled Accordion",
      icon: "folder",
      items: ["First item", "Second item"],
    },
  ];
  const handlePress = () => setExpanded(!expanded);
  return (
    <View className='flex-1 bg-white'>

      <View className='flex-1 p-3'>
        <View className='p-3 bg-gray-100 w-full h-36 items-center flex-row space-x-7'>
          <TouchableOpacity onPress={onCaptureImage}>
            <Avatar
              size={65}
              rounded
              source={{ uri: user?.imageUrl }}
            // "https://randomuser.me/api/portraits/men/35.jpg" 
            />
          </TouchableOpacity>
          <View>
            <View className='flex-row gap-7'>
              {
                edit ? (
                  <View className='flex-row items-center justify-between space-x-3 '>
                    <View className='flex-row space-x-3'>
                      <TextInput className='p-2 border rounded-md' placeholder="First name" value={firstName || ''} onChangeText={setFirstName} />
                      <TextInput className='p-2 border rounded-md' placeholder="Last name" value={lastName || ''} onChangeText={setLastName} />
                    </View>
                    <TouchableOpacity onPress={onSaveUser}>
                      <Ionicons name='checkmark-outline' size={24} color={'#000'} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className='flex-row justify-between items-center space-x-3'>
                    <Text className='font-semibold text-lg'>
                      {firstName} {lastName}
                    </Text>
                    <TouchableOpacity onPress={() => setEdit(true)}>
                      <Ionicons name='create-outline' size={28} color={'#535151'} />
                    </TouchableOpacity>
                  </View>
                )
              }

            </View>
            <Text style={{ fontSize: 16 }}>johndoe@gmail.com</Text>
          </View>


        </View>
        <View className='flex-1 py-4'>
          {
            isSignedIn && (
              <TouchableOpacity
                onPress={() => signOut()}
                className='bg-gray-100 p-5'


              >
                <View className='flex-row space-x-3'>
                  <Ionicons name='log-out-outline' size={20} className='text-red-500 ' color={'#ef4444'} />
                  <Text className='text-red-500'>
                    Log out
                  </Text>
                </View>

              </TouchableOpacity>
            )
          }
          {!isSignedIn && (
            <Link
              href={'/(modals)/login/'}
              asChild
              className='bg-gray-100 p-5'
            >
              <View className='flex-row space-x-3'>
                <Ionicons name='log-out-outline' size={20} className='text-blue-500 ' color={'#3b82f6'} />
                <Text className='text-blue-500'>
                  Log in
                </Text>
              </View>

            </Link>)
          }


        </View>


      </View>

    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})