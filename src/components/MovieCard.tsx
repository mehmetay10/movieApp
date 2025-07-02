// Bu component AI desteği ile geliştirildi (ChatGPT)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { wp, hp, fp } from '../utils'

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
    width: wp(32),
    marginRight: wp(3),
    borderRadius: wp(2.5),
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  cardSmall: {
    width: wp(24),
  },
  poster: {
    width: wp(32),
    height: hp(24),
    borderRadius: wp(2.5),
  },
  posterSmall: {
    width: wp(24),
    height: hp(17),
  },
  title: {
    fontSize: fp(1.7),
    fontWeight: 'bold',
    color: '#222',
    marginTop: hp(0.7),
    textAlign: 'center',
    paddingHorizontal: wp(1),
  },
  titleSmall: {
    fontSize: fp(1.3),
  },
});

export default MovieCard; 