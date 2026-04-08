import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useItems } from '@/context/ItemsContext';
import { useState } from 'react';

const SAMPLE_ITEMS = [
  {
    id: '1',
    name: 'Vintage Denim Jacket',
    description: 'A classic denim jacket with a worn-in look. Perfect for layering in the fall!',
    price: '25',
    size: 'M',
    image: 'https://media-assets.grailed.com/prd/listing/29351294/e70eb1f854f6472d85bf867e8da0d38a?auto=format',
  },
  {
    id: '2',
    name: 'Nike Hoodie',
    description: 'A cozy Nike hoodie in great condition - worn once. Ideal for casual wear or workouts.',
    price: '30',
    size: 'L',
    image: 'https://th.bing.com/th/id/R.6dfd84c7983590a01c887e7fa5b50c57?rik=0DIauujeOuGA6A&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f0574%2f3906%2f0173%2fproducts%2fIMG_3211.jpg%3fv%3d1665635033&ehk=Hux6xW35loGVNGwdvJDsnkM6xne86s7lNw5dTidMxuA%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    id: '3',
    name: 'Summer Dress',
    description: 'Beautiful light and breezy summer dress with a floral pattern. Perfect for sunny days.',
    price: '18',
    size: 'S',
    image: 'https://i.pinimg.com/originals/68/7f/f2/687ff26862600855dcdf8e55f300f35e.jpg',
  },
];

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const { items } = useItems();

const item = [...SAMPLE_ITEMS, ...items].find(
  (i) => i.id === String(id)
);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  if (!item) {
    return <Text>Item not found</Text>;
  }

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, message]);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price} • Size {item.size}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* MESSAGE SECTION */}
      <View style={styles.messageSection}>
        <Text style={styles.messageTitle}>Message Seller</Text>

        <TextInput
          placeholder="Ask a question..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>

        {/* MESSAGE LIST */}
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>
            • {msg}
          </Text>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginVertical: 5,
    color: 'gray',
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
  },
  messageSection: {
    marginTop: 20,
  },
  messageTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'grey',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 5,
    fontSize: 14,
  },
});