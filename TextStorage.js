// TextStorage.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, ScrollView, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Speech from 'expo-speech';

const TextStorage = () => {
  const [userText, setUserText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // load user's text from AsyncStorage on component mount
    loadChatHistory();
  }, []);

  useEffect(() => {
    // Save the chat history whenever it changes
    saveChatHistory();
  }, [chatHistory]);

  const speak = () => {
    const speak = '1';
    Speech.speak(speak);
  };

  const loadChatHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('chatHistory');
      if (storedHistory !== null) {
        setChatHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveChatHistory = async () => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const saveUserText = () => {
    if (userText.trim() !== '') {
      const updatedHistory = [...chatHistory, userText];
      setChatHistory(updatedHistory);
      setUserText('');
    } else {
      Alert.alert('Error', 'Please enter a non-empty message.');
    }
  };

  return (
    
    <View style={styles.container}>
      {chatHistory.map((message, index) => (
        <Text key={index} style={styles.message}>
          {message}
        </Text>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Enter your text"
        value={userText}
        onChangeText={(text) => setUserText(text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={saveUserText} />
      </View>

      <View style={styles.container}>
        <Button title="Press to hear some words" onPress={speak} />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  message: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonContainer: {
    position: 'absolute',
    left: 165,
    bottom: -30,
  },
});

export default TextStorage;