import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_KEY: string = 'bbd0a018db787f428127e801707bcb39';
const ACCESS_TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmQwYTAxOGRiNzg3ZjQyODEyN2U4MDE3MDdiY2IzOSIsIm5iZiI6MTc1MTMxNjUyOS41NjYwMDAyLCJzdWIiOiI2ODYyZjgzMWNjYjBiYjk5NzE5YTFiODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kesx4XgsP4_Hiqb_mMEZtf4pNbYEcRMmHqublTlPMbk';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    accept: 'application/json',
  },
});

export const getPopularMovies = (): Promise<AxiosResponse<any>> => api.get('/movie/popular');
export const searchMovies = (query: string): Promise<AxiosResponse<any>> => api.get(`/search/movie?query=${encodeURIComponent(query)}`);

export default api;
export { API_KEY }; 