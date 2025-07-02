// Bu custom hook AI desteği ile geliştirildi (ChatGPT)
import { useState } from 'react';
import { searchMovies } from '../api/axios';

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  // cursor ile geliştirildi
  [key: string]: any;
}

interface SearchMoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const useSearchMovies = (): [SearchMoviesState, (query: string) => Promise<void>] => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    setLoading(true);
    try {
      const res = await searchMovies(query);
      setMovies(res.data.results);
      setError(null);
    } catch (err: any) {
      setError('Arama başarısız');
      setMovies([]);
    }
    setLoading(false);
  };

  return [{ movies, loading, error }, search];
};

export default useSearchMovies; 