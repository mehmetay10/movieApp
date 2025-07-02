// Bu custom hook AI desteği ile geliştirildi (ChatGPT)
import { useState, useEffect } from 'react';
import api from '../api/axios';

interface Artist {
  id: number;
  name: string;
  profile_path?: string;
  // cursor ile geliştirildi
  [key: string]: any;
}

interface ArtistDetailState {
  artist: Artist | null;
  loading: boolean;
  error: string | null;
}

const useFetchArtistDetail = (artistId: number): ArtistDetailState => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/person/${artistId}`);
        setArtist(res.data);
        setError(null);
      } catch (err: any) {
        setError('Sanatçı bilgisi alınamadı');
        setArtist(null);
      }
      setLoading(false);
    };
    fetchArtist();
  }, [artistId]);

  return { artist, loading, error };
};

export default useFetchArtistDetail; 