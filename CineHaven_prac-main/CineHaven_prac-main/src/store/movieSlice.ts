import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API setup
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

// Interfaces
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
  genres?: { id: number; name: string }[];
}

interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

interface MovieState {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  searchResults: Movie[];
  selectedMovie: Movie | null;
  cast: CastMember[];
  loading: boolean;
  error: string | null;
  page: number;
}

const initialState: MovieState = {
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  searchResults: [],
  selectedMovie: null,
  cast: [],
  loading: false,
  error: null,
  page: 1,
};

// Async thunks

// Fetch popular movies
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page: number) => {
    const response = await axios.get(
      `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return response.data;
  }
);

// Fetch top-rated movies
export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async (page: number) => {
    const response = await axios.get(
      `${baseUrl}/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return response.data;
  }
);

// Fetch upcoming movies
export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page: number) => {
    const response = await axios.get(
      `${baseUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return response.data;
  }
);

// Fetch search results
export const fetchSearchResults = createAsyncThunk(
  'movies/fetchSearchResults',
  async (query: string) => {
    const response = await axios.get(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${query}`
    );
    return response.data;
  }
);

// Fetch movie details
export const fetchMovieDetail = createAsyncThunk(
  'movies/fetchMovieDetail',
  async (movieId: string) => {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    return response.data;
  }
);

// Fetch cast details
export const fetchMovieCast = createAsyncThunk(
  'movies/fetchMovieCast',
  async (movieId: string) => {
    const response = await axios.get(
      `${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    );
    return response.data.cast;
  }
);

// Slice definition
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Popular Movies
    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.popularMovies = action.payload.results;
      state.page = action.payload.page;
    });
    builder.addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch popular movies';
    });

    // Top-Rated Movies
    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.topRatedMovies = action.payload.results;
      state.page = action.payload.page;
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch top-rated movies';
    });

    // Upcoming Movies
    builder.addCase(fetchUpcomingMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.upcomingMovies = action.payload.results;
      state.page = action.payload.page;
    });
    builder.addCase(fetchUpcomingMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch upcoming movies';
    });

    // Search Results
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload.results;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch search results';
    });

    // Movie Details
    builder.addCase(fetchMovieDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedMovie = action.payload;
    });
    builder.addCase(fetchMovieDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch movie details';
    });

    // Cast Details
    builder.addCase(fetchMovieCast.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieCast.fulfilled, (state, action) => {
      state.loading = false;
      state.cast = action.payload;
    });
    builder.addCase(fetchMovieCast.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch cast details';
    });
  },
});

// Export reducer
export default movieSlice.reducer;
