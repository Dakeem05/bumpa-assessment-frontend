import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AchievementsData {
  unlocked_achievements: string[];
  next_available_achievements: string[];
  current_badge: string;
  next_badge: string;
  remaining_to_unlock_next_badge: number;
}

interface AchievementsState {
  data: AchievementsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AchievementsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAchievements = createAsyncThunk(
  'achievements/fetchAchievements',
  async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${email}/achievements`);

    if (!response.ok) {
      throw new Error('Failed to fetch achievements');
    }

    const result = await response.json();
    return result.data;
  }
);

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default achievementsSlice.reducer;
