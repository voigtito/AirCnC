import React, { useState, useEffect } from 'react';
import { AsyncStorage, Image, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({navigation}) {
  const [techs, SetTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(techs => techs.trim())

      SetTechs(techsArray)
    })
  }, []);

  async function handleSignout() {
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('techs')

    navigation.navigate('Login')

  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>

      <TouchableOpacity onPress={handleSignout} style={styles.button}>
          <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  },
  button: {
    height: 42,
    backgroundColor: '#CB3737',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
})