// src/screens/Home.js
import React, { useEffect, useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import api from '../api/axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import useFetchMovies from '../hooks/useFetchMovies';
import useSearchMovies from '../hooks/useSearchMovies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const GRID_ITEM_HEIGHT = 220;
const LIST_ITEM_HEIGHT = 106; // poster yüksekliği (90) + padding/margin (16)

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  vote_average?: number;
  [key: string]: any; // cursor ile geliştirildi
}

const GridItem = memo(({ item, onPress }) => (
  <TouchableOpacity style={styles.gridItem} onPress={() => onPress(item)}>
    <Image
      source={{ uri: item.poster_path ? IMAGE_URL + item.poster_path : 'https://via.placeholder.com/200x300?text=No+Image' }}
      style={styles.gridPoster}
    />
  </TouchableOpacity>
));

const ListItem = memo(({ item, onPress }) => (
  <TouchableOpacity style={styles.listItem} onPress={() => onPress(item)}>
    <Image
      source={{ uri: item.poster_path ? IMAGE_URL + item.poster_path : 'https://via.placeholder.com/100x150?text=No+Image' }}
      style={styles.listPoster}
    />
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.listTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.listRating}>Rating: {item.vote_average ? item.vote_average.toFixed(1) : '-'}</Text>
    </View>
  </TouchableOpacity>
));

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { movies } = useFetchMovies();
  const [{ movies: searchResults, loading: searchLoading }, search] = useSearchMovies();
  const [query, setQuery] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);

  // Arama tetikleyici (sonsuz döngü olmadan, sadece buton veya input değişiminde)
  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length > 1) {
      setShowOverlay(true);
      await search(text);
    } else {
      setShowOverlay(false);
    }
  };

  const handleGridPress = useCallback((item: Movie) => {
    setShowOverlay(false);
    navigation.navigate('MovieDetail', { movieId: item.id });
  }, [navigation]);

  const renderOverlayItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.overlayListItem} onPress={() => handleGridPress(item)}>
      <Image
        source={{ uri: item.poster_path ? IMAGE_URL + item.poster_path : 'https://via.placeholder.com/100x150?text=No+Image' }}
        style={styles.overlayPoster}
      />
      <View style={styles.overlayInfo}>
        <Text style={styles.overlayTitleText} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.overlayRating}>Rating: {item.vote_average ? item.vote_average.toFixed(1) : '-'}</Text>
      </View>
    </TouchableOpacity>
  );

  // Rastgele film seçme fonksiyonu
  const goToRandomMovie = () => {
    if (movies.length === 0) return;
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    navigation.navigate('MovieDetail', { movieId: randomMovie.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MOOV MOVIE</Text>
        <TouchableOpacity style={styles.favoriteButton} onPress={() => navigation.navigate('Favorites')}>
          <Text style={{fontSize: 28, color: 'red'}}>♥</Text>
        </TouchableOpacity>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={handleSearch}
            placeholder="Film ara..."
            placeholderTextColor="#aaa"
          />
          {query.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => { setQuery(''); setShowOverlay(false); }}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Overlay mutlak konumda, grid üstünde float */}
      {showOverlay && (
        <View style={styles.absoluteOverlayContainer}>
          {searchLoading ? (
            <View style={styles.overlayLoading}><ActivityIndicator size="large" color="#7B61FF" /></View>
          ) : searchResults.length === 0 ? (
            <ErrorMessage message="Aradığınız film bulunamadı." />
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderOverlayItem}
              keyExtractor={(item: Movie) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 8, paddingTop: 2 }}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 320 }}
            />
          )}
        </View>
      )}
      {/* Grid */}
      <FlatList
        data={movies}
        renderItem={({ item }: { item: Movie }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => handleGridPress(item)}>
            <Image
              source={{ uri: item.poster_path ? IMAGE_URL + item.poster_path : 'https://via.placeholder.com/200x300?text=No+Image' }}
              style={styles.gridPoster}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item: Movie) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={{ paddingTop: 6, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={8}
      />
      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={goToRandomMovie}>
        <Text style={styles.fabIcon}>🎬</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIcon: {
    fontSize: 24,
    color: 'red',
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 38,
  },
  searchIcon: {
    fontSize: 18,
    color: '#888',
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
    color: '#222',
    backgroundColor: 'transparent',
  },
  clearButton: {
    marginLeft: 4,
    padding: 2,
  },
  clearIcon: {
    fontSize: 16,
    color: '#888',
  },
  absoluteOverlayContainer: {
    position: 'absolute',
    left: 6,
    right: 6,
    top: 190, // header + search bar yüksekliği (örnek)
    backgroundColor: '#f3f0fa',
    borderRadius: 14,
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 20,
    paddingBottom: 8,
    paddingTop: 10,
    paddingHorizontal: 4,
    maxHeight: 400,
  },
  overlayLoading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  overlayListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 8,
    shadowColor: '#7B61FF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  overlayPoster: {
    width: 60,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  overlayInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  overlayTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  overlayRating: {
    fontSize: 14,
    color: '#666',
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 0.68,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  gridPoster: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 45,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 40,
    color: '#fff',
  },
});

export default Home;