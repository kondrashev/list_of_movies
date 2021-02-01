export const MOVIE_FULL_FETCH_DATA_SUCCESS = 'MOVIE_FULL_FETCH_DATA_SUCCESS';

export const movieFullFetchDataSuccess = (movie) => {
    return {
        type: MOVIE_FULL_FETCH_DATA_SUCCESS,
        movie
    }
}
export const movieFullFetchData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return response.ok;
                }
            })
            .then(movie => {
                dispatch(movieFullFetchDataSuccess(movie));
            })
    }
}