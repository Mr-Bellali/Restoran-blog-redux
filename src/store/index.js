import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../slices/articlesSlice';
import categoriesReducer from '../slices/categoriesSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    categories: categoriesReducer,
  },
});

export default store;
