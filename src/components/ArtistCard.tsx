// Bu component AI desteği ile geliştirildi (ChatGPT)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { wp, hp, fp } from '../utils'

interface ArtistCardProps {
  artist: {
    id: number;
    name: string;
    profile_path?: string;
    [key: string]: any; // cursor ile geliştirildi
  };
  onPress: () => void;
}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onPress }) => {
  return (
    <TouchableOpacity style={styles.artistCircle} onPress={onPress}>
      <Image
        source={{ uri: artist.profile_path ? IMAGE_URL + artist.profile_path : undefined }}
        style={styles.artistImg}
      />
      <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  artistCircle: {
    width: wp(21),
    height: hp(13),
    borderRadius: wp(10.5),
    backgroundColor: '#fff',
    marginRight: wp(4),
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    paddingTop: hp(1),
    paddingBottom: hp(1),
  },
  artistImg: {
    width: wp(17),
    height: wp(17),
    borderRadius: wp(8.5),
  },
  artistName: {
    fontSize: fp(1.7),
    color: '#222',
    fontWeight: 'bold',
    marginTop: hp(1),
    textAlign: 'center',
    width: wp(18),
  },
});

export default ArtistCard; 