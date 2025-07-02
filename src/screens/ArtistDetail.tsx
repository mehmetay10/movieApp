// src/screens/ArtistDetail.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import useFetchArtistDetail from '../hooks/useFetchArtistDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import Icon from 'react-native-vector-icons/Ionicons';

interface ArtistDetailScreenProps extends StackScreenProps<any> {}

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Yardımcı fonksiyon: Tarihi DD.MM.YYYY formatına çevir
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};

const ArtistDetail: React.FC<ArtistDetailScreenProps> = ({ route, navigation }) => {
  const { artistId } = route.params;
  const { artist, loading, error } = useFetchArtistDetail(artistId);

  if (loading) {
    return <LoadingSpinner text="Yükleniyor..." />;
  }

  if (error || !artist) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Sanatçı bilgisi alınamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Bar (MovieDetail gibi) */}
      <View style={styles.headerBar}>
      <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artist Detail</Text>
        <View style={{ width: 40 }} />
      </View>
      {/* Profil ve Bilgi Kutusu */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: artist.profile_path ? IMAGE_URL + artist.profile_path : undefined }}
          style={styles.profileImg}
        />
        <View style={styles.infoBox}>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.infoLabel}>Known For</Text>
          <Text style={styles.infoValue}>{artist.known_for_department}</Text>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{artist.gender === 1 ? 'Female' : 'Male'}</Text>
          <Text style={styles.infoLabel}>Birthday</Text>
          <Text style={styles.infoValue}>{artist.birthday || '-'}</Text>
          <Text style={styles.infoLabel}>Place of Birth</Text>
          <Text style={styles.infoValue}>{artist.place_of_birth || '-'}</Text>
        </View>
      </View>
      {/* Biography */}
      <Text style={styles.bioTitle}>Biography</Text>
      <Text style={styles.bioText}>{artist.biography || 'No biography available.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 20,
  },
  headerBack: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  headerBackIcon: {
    fontSize: 28,
    color: '#222',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 55,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 18,
    margin: 18,
    padding: 16,
    marginBottom: 24,
  },
  profileImg: {
    width: 140,
    height: 250,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginRight: 18,
  },
  infoBox: {
    flex: 1,
    justifyContent: 'center',
  },
  artistName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: '#888',
    marginTop: 2,
  },
  infoValue: {
    fontSize: 17,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bioTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  bioText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginHorizontal: 18,
    alignSelf: 'flex-start',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default ArtistDetail;
