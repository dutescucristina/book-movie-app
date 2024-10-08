import { createStore } from '@reduxjs/toolkit';
import MovieReducer from './reducers/MovieReducer';

export const store = createStore(MovieReducer);