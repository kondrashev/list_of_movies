import { combineReducers } from 'redux';
import { MoviesReducer } from './load_movies/reducers';
import { MovieFullReducer } from './load_movie_full/reducers';
export default combineReducers({
    MoviesReducer,
    MovieFullReducer
});