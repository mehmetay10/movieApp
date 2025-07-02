// Bu custom hook AI desteği ile geliştirildi (ChatGPT)
import { useState, useEffect } from 'react';
import api from '../api/axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  credits?: any;
  similar?: any;
  // cursor ile geliştirildi
  [key: string]: any;
}

interface MovieDetailState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const useFetchMovieDetail = (movieId: number): MovieDetailState => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/movie/${movieId}?append_to_response=credits,similar`);
        setMovie(res.data);
        setError(null);
      } catch (err: any) {
        setError('Film detayı alınamadı');
        setMovie(null);
      }
      setLoading(false);
    };
    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};

export default useFetchMovieDetail; 