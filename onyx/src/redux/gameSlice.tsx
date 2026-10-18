import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { GameDetailsType, StateType } from "../types/type";

const initialState: StateType = {
    games: [],
    gamesCategory: [],
    featuredGames: [],
    searchResults: [],

    loading: false,
    error: null,
    GamesByCategory: {},

    GameDetails: null,
}

const API_KEY = "API KEY";
const BASE_URL = "https://api.rawg.io/api"

export const getGamesCategory = createAsyncThunk("games/getGamesCategory", async () => {
    const response = await axios.get(`${BASE_URL}/genres?key=${API_KEY}`);
    return response.data.results;
});

export const getFeaturedGames = createAsyncThunk("games/getFeaturedGames", async () => {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const response = await axios.get(`${BASE_URL}/games`, {
        params: {
            key: API_KEY,
            dates: `${formatDate(sixMonthsAgo)},${formatDate(today)}`,
            ordering: "-rating",
            page_size: 10,
        },
    });

    return response.data.results;
});

export const getGameByCategory = createAsyncThunk(
    'game/getGameByCategory',
    async (genres: string) => {
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                key: API_KEY,
                genres,
                page_size: 8,
            },
        });

        return {
            genre: genres,
            games: response.data.results,
        };
    }
);

export const searchGames = createAsyncThunk(
    'game/searchGames',
    async (query: string) => {
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                key: API_KEY,
                search: query,
                page_size: 20,
            },
        });
        return response.data.results;
    }
);


export const getGameDetails = createAsyncThunk<GameDetailsType, string>("getGameDetails", async (id) => {
    const response = await axios.get(`${BASE_URL}/games/${id}`, {
        params: {
            key: API_KEY,
        },
    });
    return response.data;
})

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGamesCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGamesCategory.fulfilled, (state, action) => {
                state.gamesCategory = action.payload;
                state.loading = false;
            })
            .addCase(getGamesCategory.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to load genres.';
            });

        builder
            .addCase(getFeaturedGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFeaturedGames.fulfilled, (state, action) => {
                state.loading = false;
                state.featuredGames = action.payload;
            })
            .addCase(getFeaturedGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong.";
            });

        builder
            .addCase(getGameByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getGameByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.GamesByCategory[action.payload.genre] = action.payload.games;
            })
            .addCase(getGameByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong.";
            });

        builder
            .addCase(searchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong.";
            });


        builder
            .addCase(getGameDetails.pending, (state) => {
                state.loading = true;
                state.GameDetails = null;
                state.error = null;
            })
            .addCase(getGameDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.GameDetails = action.payload;
            })
            .addCase(getGameDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong.";
            });

    },
});

export default gameSlice.reducer;