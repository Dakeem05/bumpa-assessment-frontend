import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface PurchaseState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PurchaseState = {
  loading: false,
  error: null,
  success: false,
};

export const makePurchase = createAsyncThunk(
  'purchase/makePurchase',
  async ({ email, amount }: { email: string; amount: string }) => {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('amount', amount);

    const response = await fetch(`${API_BASE_URL}/users/purchase`, {
      method: 'POST',
      body: formdata,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  }
);

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    resetPurchase: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(makePurchase.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(makePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { resetPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;
