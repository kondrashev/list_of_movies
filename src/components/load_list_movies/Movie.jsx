import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { movieFullFetchData } from '../../store/load_movie_full/actions';
import MovieFull from './MovieFull';
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
function Movie(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const styleMovie = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
    const handleClick = () => {
        setOpen(!open);
        props.getMovieFull(`https://omdbapi.com/?apikey=e75e3368&t=${props.title}&y=${props.year}&p=full`);
    };
    return (
        <div
            key={props.key}
            style={{
                width: '1000px'
            }}
        >
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={props.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem
                        button className={classes.nested}
                    >
                        <ListItem
                            style={styleMovie}
                        >
                            <ListItemText primary='Poster' />
                            <img src={props.poster}
                                style={{
                                    width: '200px',
                                    borderRadius: '10px'
                                }}
                            >
                            </img>
                        </ListItem>
                        <ListItem>
                            <MovieFull
                                movieFull={props.movieFull}
                            />
                        </ListItem>
                    </ListItem>
                </List>
            </Collapse>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        movieFull: state.MovieFullReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        getMovieFull: (url) => dispatch(movieFullFetchData(url))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Movie);