// Bu custom hook AI desteği ile geliştirildi (ChatGPT)
import { useState, useEffect } from 'react';
import { getPopularMovies } from '../api/axios';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  // cursor ile geliştirildi
  [key: string]: any;
}

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const useFetchMovies = (): MoviesState => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await getPopularMovies();
        setMovies(res.data.results);
        setError(null);
      } catch (err: any) {
        setError('Filmler alınamadı');
        setMovies([]);
      }
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return { movies, loading, error };
};

export default useFetchMovies; 