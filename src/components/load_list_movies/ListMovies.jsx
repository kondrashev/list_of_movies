import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Movie from './Movie';
import { moviesFetchData } from '../../store/load_movies/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
const checkDate = () => {
    if (new Date().getDate() < 10) {
        return `${'0'}${new Date().getDate()}`
    } else {
        return new Date().getDate();
    }
}
const checkMonth = () => {
    if (new Date().getMonth() + 1 < 10) {
        return `${'0'}${new Date().getMonth() + 1}`
    } else {
        return new Date().getMonth() + 1;
    }
}
const checkHour = () => {
    if (new Date().getHours() < 10) {
        return `${'0'}${new Date().getHours()}`
    } else {
        return new Date().getHours();
    }
}
const checkMinute = () => {
    if (new Date().getMinutes() < 10) {
        return `${'0'}${new Date().getMinutes() + 1}`
    } else {
        return new Date().getMinutes();
    }
}
function ListMovies(props) {
    let box = localStorage.getItem('resources') === null ? [] : props.resources;
    function createData(id, url, date, time) {
        return { id, url, date, time };
    }
    if (props.title === 'Batman') {
        props.getMovies(`https://omdbapi.com/?apikey=${localStorage.APIkey}&s=${props.title}&page=${props.page}`);
    } else {
        props.getMovies(`https://omdbapi.com/?apikey=${localStorage.APIkey}&s=${props.title}&y=${props.year}&page=${props.page}`);
        let url = `https://omdbapi.com/?apikey=${localStorage.APIkey}&s=${props.title}&y=${props.year}&page=${props.page}`;
        box[props.countResources] = createData(new Date().getTime(), url, `${checkDate()}.${checkMonth()}.${new Date().getFullYear()}p.`, `${checkHour()}:${checkMinute()}`);
        localStorage.resources = JSON.stringify(box);
    }
    const classes = useStyles();
    const countPages = (count) => {
        return count % 10 > 0 ? props.pageCount(Math.round(count / 10) + 1) : props.pageCount(Math.round(count / 10));
    }
    return (
        Object.entries(props.content).map(([key, value]) => {
            (key === 'totalResults') && countPages(value);
            if (key === 'Search') {
                return (
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                List movies
                            </ListSubheader>
                        }
                        className={classes.root}
                    >
                        {
                            value.map((movie) => {
                                return (
                                    <Movie
                                        key={movie.imdbID}
                                        title={movie.Title}
                                        year={movie.Year}
                                        id={movie.imdbID}
                                        type={movie.Type}
                                        poster={movie.Poster}
                                    />
                                )
                            })
                        }
                    </List>
                )
            }
        })
    );
}
const mapStateToProps = state => {
    return {
        content: state.MoviesReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getMovies: (url) => dispatch(moviesFetchData(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListMovies);