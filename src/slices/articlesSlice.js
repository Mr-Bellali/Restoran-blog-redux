import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getArticles, getArticleById, createArticle, updateArticle, deleteArticle } from '../services/articleService';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await getArticles();
  return response;
});

export const fetchArticleById = createAsyncThunk('articles/fetchArticleById', async (id) => {
  const response = await getArticleById(id);
  return response;
});

export const addArticle = createAsyncThunk('articles/addArticle', async (article) => {
  const response = await createArticle(article);
  return response;
});

export const editArticle = createAsyncThunk('articles/editArticle', async ({ id, article }) => {
  const response = await updateArticle(id, article);
  return response;
});

export const removeArticle = createAsyncThunk('articles/removeArticle', async (id) => {
  await deleteArticle(id);
  return id;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        const index = state.items.findIndex(article => article.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(removeArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(article => article.id !== action.payload);
      });
  },
});

export default articlesSlice.reducer;
