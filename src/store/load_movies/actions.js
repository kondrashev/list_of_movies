export const MOVIES_FETCH_DATA_SUCCESS = 'MOVIES_FETCH_DATA_SUCCESS';
export const moviesFetchDataSuccess = (movies) => {
    return {
        type: MOVIES_FETCH_DATA_SUCCESS,
        movies
    }
}
export const moviesFetchData = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return response.ok;
                }
            })
            .then(movies => {
                dispatch(moviesFetchDataSuccess(movies));
            })
    }
}