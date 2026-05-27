import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { addToCart, getCart, removeCartItem } from "../../services/cartService";

const getCartItemsFromPayload = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.cartItems)) {
    return payload.cartItems;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.cart?.items)) {
    return payload.cart.items;
  }

  if (Array.isArray(payload?.cart?.cartItems)) {
    return payload.cart.cartItems;
  }

  return null;
};

const getItemId = (item) => item?._id || item?.id;

const getProductId = (item) => {
  const product = item?.product || item?.productId;

  return product?._id || product?.id || product;
};

const upsertCartItem = (cartItems, newItem) => {
  const newItemId = getItemId(newItem);
  const newProductId = getProductId(newItem);

  const existingIndex = cartItems.findIndex((item) => {
    const itemId = getItemId(item);
    const productId = getProductId(item);

    return (
      (newItemId && itemId === newItemId) ||
      (newProductId && productId === newProductId)
    );
  });

  if (existingIndex >= 0) {
    cartItems[existingIndex] = newItem;
    return;
  }

  cartItems.push(newItem);
};

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (token, { rejectWithValue }) => {
    try {
      return await getCart(token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load cart.",
      );
    }
  },
);

// ADD TO CART
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",

  async ({ productId, qty = 1, token }, { rejectWithValue }) => {
    try {
      return await addToCart(productId, qty, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to add item to cart.",
      );
    }
  },
);

// REMOVE CART ITEM
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",

  async ({ id, token }, { rejectWithValue }) => {
    try {
      await removeCartItem(id, token);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to remove item from cart.",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cartItems = getCartItemsFromPayload(action.payload) || [];
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // ADD CART ITEM
      .addCase(addCartItem.pending, (state) => {
        state.error = null;
      })

      .addCase(addCartItem.fulfilled, (state, action) => {
        const cartItems = getCartItemsFromPayload(action.payload);

        if (cartItems) {
          state.cartItems = cartItems;
          return;
        }

        upsertCartItem(state.cartItems, action.payload);
      })

      .addCase(addCartItem.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })

      // DELETE CART ITEM
      .addCase(deleteCartItem.pending, (state) => {
        state.error = null;
      })

      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => getItemId(item) !== action.payload,
        );
      })

      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default cartSlice.reducer;
