import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, AsyncStorage, Alert } from 'react-native';
import api from '../services/api.js'

export default function Book( {navigation} ) {
  const [date, setData] = useState('')
  const id = navigation.getParam('id');

  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: {user_id}
    })

    Alert.alert('Solicitação de reserva enviada!')
    navigation.navigate('List')
  }

   function handleCancel() {
    navigation.navigate('List')
  }
    
  return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Data de interesse *</Text>
        <TextInput 
          style={styles.Input}
          placeholder="Em qual data você quer reservar?"
          placeholderTextColor="#999"
          autoCorrect={false}
          value={date}
          onChangeText={setData}
          
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Solicitar reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 30,
    justifyContent: 'center',
    
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  Input: {
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  cancelButton: {
    height: 42,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});