import { MOVIE_FULL_FETCH_DATA_SUCCESS } from './actions';

export const MovieFullReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIE_FULL_FETCH_DATA_SUCCESS:
            return action.movie;
        default:
            return state;
    }
}