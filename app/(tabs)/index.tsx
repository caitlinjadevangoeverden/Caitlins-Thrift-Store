import { Image, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useItems } from '@/context/ItemsContext';

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


export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { items } = useItems();
  const allItems = [...SAMPLE_ITEMS, ...items];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f5f5f5', dark: '#1a1a1a' }}
      headerImage={
        <Image
          source={{ uri: 'https://img.freepik.com/premium-photo/fuzzy-picture-thrift-store-displaying-various-items_641503-101813.jpg' }}
          style={styles.headerImage}
        />
      }
    >

      <ThemedView style={styles.header}>
        <ThemedText type="title">Caitlin's Thrift</ThemedText>
        <TouchableOpacity 
        style={styles.postButton}
        onPress={() => router.push('/post-an-item')}>
          <ThemedText type="defaultSemiBold">+ Post an item</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TextInput
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {allItems
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((item) => (
        <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => router.push({
          pathname: '/item/[id]',
          params: { id: item.id },
        })
      }
    >

      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
      <ThemedText>{item.description}</ThemedText>
      <ThemedText>
        ${item.price} • Size {item.size}
      </ThemedText>
    </TouchableOpacity>

      ))}
    </ParallaxScrollView>
    );
  }

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 220,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postButton: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  search: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  card: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
});