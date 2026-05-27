import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  addToWishlist,
  getWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";

const getWishlistItemsFromPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.wishlistItems)) {
    return payload.wishlistItems;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.wishlist?.items)) {
    return payload.wishlist.items;
  }

  if (Array.isArray(payload?.wishlist?.wishlistItems)) {
    return payload.wishlist.wishlistItems;
  }

  return null;
};

const getItemId = (item) => item?._id || item?.id;

const getProductId = (item) => {
  const product = item?.product || item?.productId;

  return product?._id || product?.id || product || getItemId(item);
};

const upsertWishlistItem = (wishlistItems, newItem) => {
  const newItemId = getItemId(newItem);
  const newProductId = getProductId(newItem);

  const existingIndex = wishlistItems.findIndex((item) => {
    const itemId = getItemId(item);
    const productId = getProductId(item);

    return (
      (newItemId && itemId === newItemId) ||
      (newProductId && productId === newProductId)
    );
  });

  if (existingIndex >= 0) {
    wishlistItems[existingIndex] = newItem;
    return;
  }

  wishlistItems.push(newItem);
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (token, { rejectWithValue }) => {
    try {
      return await getWishlist(token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load wishlist.",
      );
    }
  },
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      return await addToWishlist(productId, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to add item to wishlist.",
      );
    }
  },
);

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlistItem",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await removeWishlistItem(id, token);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to remove item from wishlist.",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    wishlistItems: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlistItems = getWishlistItemsFromPayload(action.payload) || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addWishlistItem.pending, (state) => {
        state.error = null;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        const wishlistItems = getWishlistItemsFromPayload(action.payload);

        if (wishlistItems) {
          state.wishlistItems = wishlistItems;
          return;
        }

        upsertWishlistItem(state.wishlistItems, action.payload);
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteWishlistItem.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteWishlistItem.fulfilled, (state, action) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => getItemId(item) !== action.payload,
        );
      })
      .addCase(deleteWishlistItem.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
