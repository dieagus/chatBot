
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextStorage from './TextStorage';

const test = {
  name: "Diego",
  value: "hello"
};

const App = () => {
  return (
    <SafeAreaView>
      <TextStorage />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;