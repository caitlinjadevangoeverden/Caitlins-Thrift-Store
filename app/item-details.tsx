import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useItems } from '@/context/ItemsContext';


export default function ItemDetails() {
  const router = useRouter();
  const { image } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const { addItem } = useItems();

  const handlePostItem = () => {
  if (!name || !description || !size || !price) {
    Alert.alert('Missing Fields', 'Please fill in all fields before posting.');
    return;
  }

  const newItem = {
  id: Date.now().toString(),
  image: (image as string) ?? 'https://picsum.photos/300',
  name,
  description,
  size,
  price,
};

  addItem(newItem);

  console.log('Posted Item:', newItem);

  Alert.alert('Success', 'Item posted to feed!');

  router.push('/(tabs)');
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Your Item</Text>

      {/* IMAGE PREVIEW */}
      {image && (
        <Image source={{ uri: image as string }} style={styles.image} />
      )}

      {/* FORM */}
      <TextInput
        placeholder="Item name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multiline]}
        multiline
      />

      <TextInput
        placeholder="Size (e.g. M, 10, 32)"
        value={size}
        onChangeText={setSize}
        style={styles.input}
      />

      <TextInput
        placeholder="Price ($)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* POST BUTTON */}
      <TouchableOpacity style={styles.button} onPress={handlePostItem}>
        <Text style={styles.buttonText}>Post Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});