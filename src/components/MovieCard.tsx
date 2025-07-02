// Bu component AI desteği ile geliştirildi (ChatGPT)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    poster_path?: string;
    [key: string]: any; // cursor ile geliştirildi
  };
  onPress: () => void;
  small?: boolean;
}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress, small }) => {
  return (
    <TouchableOpacity style={[styles.card, small && styles.cardSmall]} onPress={onPress}>
      <Image
        source={{ uri: movie.poster_path ? IMAGE_URL + movie.poster_path : undefined }}
        style={[styles.poster, small && styles.posterSmall]}
      />
      {!small && (
        <Text style={[styles.title, small && styles.titleSmall]} numberOfLines={2}>{movie.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  cardSmall: {
    width: 90,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  posterSmall: {
    width: 90,
    height: 130,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  titleSmall: {
    fontSize: 12,
  },
});

export default MovieCard; 