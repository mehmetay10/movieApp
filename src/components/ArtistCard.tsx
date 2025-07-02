// Bu component AI desteği ile geliştirildi (ChatGPT)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
    width: 80,
    height: 100,
    borderRadius: 40,
    backgroundColor: '#fff',
    marginRight: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
    paddingTop: 8,
    paddingBottom: 8,
  },
  artistImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  artistName: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    width: 72,
  },
});

export default ArtistCard; 