// src/screens/Favorites.js
// Bu modül AI desteği ile geliştirildi (ChatGPT)
import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/favorites/favoritesActions';
import MovieCard from '../components/MovieCard';
import ErrorMessage from '../components/ErrorMessage';
import { wp, hp, fp } from '../utils'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  [key: string]: any; // cursor ile geliştirildi
}

interface RootState {
  favorites: {
    favorites: Movie[];
  };
}

const Favorites: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [activeTab, setActiveTab] = useState('MOVIE');

  // Movies ve TV Series sayılarını hesapla
  const movieCount = useMemo(() => {
    return favorites.filter(item => item.media_type === 'movie' || !item.media_type).length;
  }, [favorites]);

  const tvSeriesCount = useMemo(() => {
    return favorites.filter(item => item.media_type === 'tv').length;
  }, [favorites]);

  const handleRemove = (movieId: number) => {
    dispatch(removeFavorite(movieId));
  };

  const handleMoviePress = (item: Movie) => {
    navigation.navigate('MovieDetail', { movieId: item.id });
  };

  const renderStyledFavoriteCard = (movie: Movie) => (
    <View style={styles.styledCard} key={movie.id}>
      <TouchableOpacity onPress={() => handleMoviePress(movie)} activeOpacity={0.85} style={{flex:1}}>
        <Image
          source={{ uri: movie.poster_path ? IMAGE_URL + movie.poster_path : undefined }}
          style={styles.styledPoster}
        />
        <View style={styles.styledInfoBox}>
          <Text style={styles.styledTitle} numberOfLines={2}>{movie.title}</Text>
          <Text style={styles.styledRating}>Rating: {movie.vote_average ? movie.vote_average.toFixed(1) : '-'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.styledRemoveIcon} onPress={() => handleRemove(movie.id)}>
        <Icon name="heart-dislike" size={28} color="#fff" style={styles.styledRemoveIconInner} />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <ErrorMessage message="Favori filminiz yok. Eklemek için kalp ikonuna tıklayın!" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#222" />
          </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>My Favorites</Text>
          {favorites.length > 0 && (
            <View style={styles.countContainer}>
              <Text style={styles.movieCount}>
                {movieCount} movie{movieCount !== 1 ? 's' : ''}
              </Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.tvCount}>
                {tvSeriesCount} TV series{tvSeriesCount !== 1 ? '' : ''}
              </Text>
            </View>
          )}
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, activeTab === 'MOVIE' && styles.activeTab]} onPress={() => setActiveTab('MOVIE')}>
          <Text style={[styles.tabText, activeTab === 'MOVIE' && styles.activeTabText]}>MOVIE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'TV' && styles.activeTab]} onPress={() => setActiveTab('TV')}>
          <Text style={[styles.tabText, activeTab === 'TV' && styles.activeTabText]}>TV SERIES</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'MOVIE' ? (
        movieCount === 0 ? (
          renderEmptyState()
        ) : (
          <ScrollView contentContainerStyle={{padding: 12}}>
            {favorites.filter(item => item.media_type === 'movie' || !item.media_type).map((movie) => (
              renderStyledFavoriteCard(movie)
            ))}
          </ScrollView>
        )
      ) : (
        tvSeriesCount === 0 ? (
          <View style={styles.emptyTabContent}>
            <Text style={styles.emptyTabText}>Henüz favori TV diziniz yok.</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{padding: 12}}>
            {favorites.filter(item => item.media_type === 'tv').map((movie) => (
              renderStyledFavoriteCard(movie)
            ))}
          </ScrollView>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fp(3),
    fontWeight: 'bold',
    color: '#333',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.7),
  },
  movieCount: {
    fontSize: fp(1.7),
    color: '#666',
  },
  separator: {
    fontSize: fp(1.7),
    color: '#666',
    marginHorizontal: wp(2),
  },
  tvCount: {
    fontSize: fp(1.7),
    color: '#666',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
  tabText: {
    fontSize: fp(2),
    color: '#888',
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#7B61FF',
  },
  activeTabText: {
    color: '#7B61FF',
  },
  styledCard: {
    backgroundColor: '#fff',
    borderRadius: wp(4.5),
    marginBottom: hp(2.3),
    overflow: 'hidden',
    shadowColor: '#7B61FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    position: 'relative',
  },
  styledPoster: {
    width: '100%',
    height: hp(26),
    borderTopLeftRadius: wp(4.5),
    borderTopRightRadius: wp(4.5),
    backgroundColor: '#eee',
  },
  styledInfoBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: hp(1.3),
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderBottomLeftRadius: wp(4.5),
    borderBottomRightRadius: wp(4.5),
  },
  styledTitle: {
    fontSize: fp(2.2),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: hp(0.5),
  },
  styledRating: {
    fontSize: fp(1.8),
    color: '#fff',
  },
  styledRemoveIcon: {
    position: 'absolute',
    top: hp(1.5),
    right: wp(3),
    backgroundColor: 'rgba(242, 74, 74, 0.85)',
    borderRadius: wp(5),
    padding: hp(0.5),
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styledRemoveIconInner: {
    textShadowColor: '#000',
    textShadowRadius: 4,
  },
  emptyTabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp(5),
  },
  emptyTabText: {
    fontSize: fp(2.2),
    color: '#aaa',
    textAlign: 'center',
  },
});

export default Favorites;