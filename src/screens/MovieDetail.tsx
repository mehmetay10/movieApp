// src/screens/MovieDetail.js
// Bu screen AI desteği ile geliştirildi (Claude)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favorites/favoritesActions';
import useFetchMovieDetail from '../hooks/useFetchMovieDetail';
import MovieCard from '../components/MovieCard';
import ArtistCard from '../components/ArtistCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { wp, hp, fp } from '../utils'

const { width } = Dimensions.get('window');
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Yardımcı fonksiyon: Tarihi DD.MM.YYYY formatına çevir
const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-';
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};

interface MovieDetailProps {
  route: { params: { movieId: number } };
  navigation: any;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  credits?: any;
  similar?: any;
  [key: string]: any; // cursor ile geliştirildi
}

const MovieDetail: React.FC<MovieDetailProps> = ({ route, navigation }) => {
  const { movieId } = route.params;
  const { movie, loading, error } = useFetchMovieDetail(movieId);
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const isFavorite = favorites.some((fav: Movie) => fav.id === movieId);

  // Animasyon için state
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const similar = movie?.similar?.results || [];
  const cast = movie?.credits?.cast?.slice(0, 10) || [];

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/movie/${movieId}?append_to_response=credits,similar`);
      setMovie(res.data);
    } catch (err) {
      setMovie(null);
    }
    setLoading(false);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movieId));
    } else {
      dispatch(addFavorite(movie));
    }
    animateHeart();
  };

  if (loading || !movie) {
    return (
      <View style={styles.container}>
        <LoadingSpinner text="Yükleniyor..." />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 0 }} showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movie Detail</Text>
        <View style={{ width: 40 }} />
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: movie.backdrop_path ? IMAGE_URL + movie.backdrop_path : IMAGE_URL + movie.poster_path }}
          style={styles.banner}
        />
        {/* Favori Butonu */}
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite} activeOpacity={0.7}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={40} color={isFavorite ? 'red' : 'red'} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {/* Film Başlık ve Bilgiler */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 0 }}>
        <Text style={styles.title}>{movie.title}</Text>
        {/* Bilgiler ve etiketler iki satır */}
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>{movie.original_language ? movie.original_language.toUpperCase() : '-'}</Text>
            <Text style={styles.infoValue}>{movie.vote_average ? movie.vote_average.toFixed(1) : '-'}</Text>
            <Text style={styles.infoValue}>{movie.runtime} min</Text>
            <Text style={styles.infoValue}>{formatDate(movie.release_date)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Language</Text>
            <Text style={styles.infoLabel}>Rating</Text>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoLabel}>Release Date</Text>
          </View>
        </View>
        {/* Açıklama */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{movie.overview}</Text>
        {/* Benzer Filmler */}
        <Text style={styles.sectionTitle}>Similar</Text>
        {similar.length === 0 ? (
          <Text style={styles.infoLabel}>Benzer film bulunamadı.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
            {similar.map((sim: Movie) => (
              <MovieCard
                key={sim.id}
                movie={sim}
                onPress={() => navigation.push('MovieDetail', { movieId: sim.id })}
                small
              />
            ))}
          </ScrollView>
        )}
        {/* Oyuncular */}
        <Text style={[styles.sectionTitle, { marginTop: -10 }]} >Artist</Text>
        {cast.length === 0 ? (
          <Text style={styles.infoLabel}>Oyuncu bilgisi yok.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
            {cast.map((actor: any) => (
              <ArtistCard
                key={actor.id}
                artist={actor}
                onPress={() => navigation.navigate('ArtistDetail', { artistId: actor.id })}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: hp(28),
    backgroundColor: '#eee',
    marginBottom: hp(1.3),
  },
  banner: {
    width: '100%',
    height: hp(28),
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
  },
  favoriteButton: {
    position: 'absolute',
    top: hp(18),
    right: wp(4),
    backgroundColor: '#FFFFFf',
    borderRadius: wp(12),
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    fontSize: fp(3),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: hp(2.5),
    textAlign: 'center',
  },
  infoBlock: {
    marginBottom: hp(0.7),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    flex: 1,
    textAlign: 'center',
    fontSize: fp(1.8),
    fontWeight: 'bold',
    color: '#222',
  },
  infoLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: fp(1.5),
    color: '#aaa',
    fontWeight: '500',
    marginTop: hp(0.2),
  },
  sectionTitle: {
    fontSize: fp(2.2),
    fontWeight: 'bold',
    color: '#222',
    marginTop: hp(2.3),
    marginBottom: hp(0.8),
    textAlign: 'left',
  },
  description: {
    fontSize: fp(1.6),
    color: '#888',
    textAlign: 'left',
  },
  similarMovie: {
    marginRight: wp(3),
    borderRadius: wp(2.5),
    overflow: 'hidden',
    width: wp(24),
    height: hp(17),
    backgroundColor: '#eee',
  },
  similarPoster: {
    width: wp(24),
    height: hp(17),
    borderRadius: wp(2.5),
  },
  artistCircle: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: '#fff',
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  artistImg: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(4),
    paddingTop: hp(0.2),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 20,
  },
  headerBack: {
    width: wp(10),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(7.5),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: fp(2.7),
    fontWeight: 'bold',
    color: '#222',
    marginTop: hp(7),
  },
});

export default MovieDetail;