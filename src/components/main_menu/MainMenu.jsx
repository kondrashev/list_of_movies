import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListMovies from '../load_list_movies/ListMovies';
import FormBySearch from '../load_list_movies/FormBySearch';
import { Transition, animated } from 'react-spring/renderprops';
import FormByAPIkey from '../load_list_movies/FormByAPIkey';
import TableResources from '../load_list_movies/TableResources';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
function MainMenu(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [resourcesDelete, setResourcesDelete] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setResourcesDelete(false);
        setURLadress(false);
        setStyleFormBySearch(false);
    };
    const deleteResources = () => {
        setResourcesDelete(!resourcesDelete);
    }
    const [showFormBySearch, setShowFormBySearch] = React.useState(false);
    const toggleFormBySearch = () => {
        setChangeTitle('batman');
        setShowFormBySearch(!showFormBySearch);
        props.paginationShow(false);
    }
    const [showFormByAPIkey, setShowFormByAPIkey] = React.useState(false);
    const toggleFormByAPIkey = () => {
        setShowFormByAPIkey(!showFormByAPIkey);
        props.paginationShow(false);
    }
    const [changeTitle, setChangeTitle] = React.useState('batman');
    const [changeYear, setChangeYear] = React.useState('');
    const size = () => {
        if (localStorage.getItem('resources') === null) {
            return -1;
        } else {
            let anotherSize = JSON.parse(localStorage.resources);
            return anotherSize.length;
        }
    }
    let sizeResources = size();
    const [countResources, setCountResources] = React.useState(sizeResources);
    const getSearch = (title, year) => {
        setChangeTitle(title);
        setChangeYear(year);
        props.paginationShow(true);
        setCountResources(countResources + 1);
        setShowFormBySearch(false);
        setStyleFormBySearch(true);
    }
    const [title, setTitle] = React.useState('');
    const [year, setYear] = React.useState('');
    const getTitleYear = (url) => {
        let arraySplit = url.split('=').join().split('&').join().split(',');
        setTitle(arraySplit[3]);
        setYear(arraySplit[5]);
    }
    const [urlAddress, setURLadress] = React.useState(false);
    const clickURL = (url) => {
        setURLadress(true);
        getTitleYear(url);
    }
    const styleTab = {
        marginRight: '50px'
    }
    const [styleFormBySearch, setStyleFormBySearch] = React.useState(false);
    const formSearchStyle = () => {
        setStyleFormBySearch(true);
    }
    const styleFormSearch = {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-125%, 0)'
    }
    const resources = localStorage.getItem('resources') === null ? [] : JSON.parse(localStorage.resources);
    return (
        <div
            className={classes.root}
            style={{
                position: 'relative'
            }}
        >
            <AppBar
                style={{
                    position: 'static',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="simple tabs example"
                >
                    <Tab
                        style={styleTab}
                        label="load list of movies"
                        onClick={() => getSearch('batman', '')}
                    />
                    <Tab
                        style={styleTab}
                        label="search"
                        onClick={toggleFormBySearch}
                    />
                    <Tab
                        style={styleTab} label="give free api key"
                        onClick={toggleFormByAPIkey}
                    />
                    <Tab
                        style={styleTab}
                        label="history of requests"
                        onClick={() => props.paginationShow(false)}
                    />
                </Tabs>
            </AppBar>
            <TabPanel
                value={value}
                index={0}
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-125%, 0)'
                }}
            >
                <ListMovies
                    title={changeTitle}
                    year={changeYear}
                    page={props.page}
                    pageCount={(countButtonsPage) => props.pageCount(countButtonsPage)}
                    resources={resources}
                />
            </TabPanel>
            <TabPanel
                value={value}
                index={1}
                style={
                    styleFormBySearch === true ?
                        styleFormSearch :
                        null
                }
            >
                <Transition
                    native
                    items={showFormBySearch}
                    from={{ marginLeft: -350 }}
                    enter={{ marginLeft: -24 }}
                    leave={{ marginLeft: -350 }}
                    config={{ duration: 1000 }}
                >
                    {show => show && (props => (
                        <animated.div
                            style={props}
                        >
                            <FormBySearch
                                toggleFormBySearch={toggleFormBySearch}
                                getSearch={(title, year) => getSearch(title, year)}
                                formSearchStyle={formSearchStyle}
                            />
                        </animated.div>
                    ))}
                </Transition>
                {
                    (changeTitle !== 'batman' || changeYear !== '')
                    && <ListMovies
                        title={changeTitle}
                        year={changeYear}
                        page={props.page}
                        pageCount={(countButtonsPage) => props.pageCount(countButtonsPage)}
                        countResources={countResources}
                        resources={resources}
                    />
                }
            </TabPanel>
            <TabPanel
                value={value}
                index={2}
            >
                <Transition
                    native
                    items={showFormByAPIkey}
                    from={{ marginLeft: -350 }}
                    enter={{ marginLeft: -24 }}
                    leave={{ marginLeft: -350 }}
                    config={{ duration: 1000 }}
                >
                    {show => show && (props => (
                        <animated.div
                            style={props}
                        >
                            <FormByAPIkey
                                toggleFormByAPIkey={toggleFormByAPIkey}
                            />
                        </animated.div>
                    ))}
                </Transition>
            </TabPanel>
            {
                urlAddress === false ?
                    <TabPanel
                        value={value}
                        index={3}
                    >
                        {
                            //no delete resources
                            resourcesDelete === false ?
                                <TableResources
                                    deleteResources={deleteResources}
                                    resources={resources}
                                    clickURL={clickURL}
                                /> :
                                //delete resources
                                <TableResources
                                    deleteResources={deleteResources}
                                    resources={resources}
                                />
                        }
                    </TabPanel> :
                    <TabPanel
                        value={value}
                        index={3}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translate(-125%, 0)'
                        }}
                    >
                        {
                            urlAddress === true &&
                            <ListMovies
                                title={title}
                                year={year}
                                page={props.page}
                                pageCount={(countButtonsPage) => props.pageCount(countButtonsPage)}
                                resources={resources}
                            />
                        }
                    </TabPanel>
            }
        </div >
    );
}
export default MainMenu;