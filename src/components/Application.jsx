import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../store/reducers';
import { Provider } from 'react-redux';
import MainMenu from './main_menu/MainMenu';
import PaginationButtons from './main_menu/PaginationButtons';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default function Application() {
    const [numberPage, setNumberPage] = React.useState(1);
    const changeNumberPage = (event, value) => {
        setNumberPage(value);
    }
    const [showPagination, setShowPagination] = React.useState(true);
    const paginationShow = (hide) => {
        setShowPagination(hide);
    }
    const [countPages, setCountPages] = React.useState(0);
    const pageCount = (count) => {
        setCountPages(count);
    }
    (function writeAPIkey() {
        localStorage.setItem('APIkey', 'e75e3368');
    }());
    return (
        <Provider store={store}>
            <div>
                <MainMenu
                    page={numberPage}
                    paginationShow={(hidePagination) => paginationShow(hidePagination)}
                    pageCount={(countButtonsPage) => pageCount(countButtonsPage)}
                />
                {
                    (showPagination === true) &&
                    <PaginationButtons
                        changeNumberPage={changeNumberPage}
                        count={countPages}
                    />
                }
            </div>
        </Provider>
    )
}