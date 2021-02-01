import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function FormBySearch(props) {
    const [valueTitle, setValueTitle] = React.useState('');
    const titleChange = (event) => {
        setValueTitle(event.target.value);
    }
    const [valueYear, setValueYear] = React.useState('');
    const yearChange = (event) => {
        setValueYear(event.target.value);
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            props.getSearch(valueTitle, valueYear);
            props.formSearchStyle();
        }
    }
    return (
        <div
            className='form_search'
        >
            <button
                className='close_form_search'
                onClick={props.toggleFormBySearch}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                >
                    <path d="M6 4.36L10.02.34a1.16 1.16 0 0 1 1.64 1.64L7.64 6l4.02 4.02a1.16 1.16 0 0 1-1.64 1.64L6 7.64l-4.02 4.02a1.16 1.16 0 0 1-1.64-1.64L4.36 6 .34 1.98A1.16 1.16 0 1 1 1.98.34L6 4.36z" fill="black"></path>
                </svg>
            </button>
            <TextField
                label="Title movie"
                type="search"
                variant="outlined"
                value={valueTitle}
                onChange={titleChange}
                style={{
                    width: '330px'
                }}
            />
            <TextField
                label="Year movie"
                type="search"
                variant="outlined"
                disabled={!valueTitle}
                value={valueYear}
                onChange={yearChange}
                onKeyPress={onKeyPress}
                style={{
                    width: '330px'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={!valueTitle}
                onClick={() => props.getSearch(valueTitle, valueYear)}
                style={{
                    width: '330px',
                    height: '50px',
                    marginBottom: '50px'
                }}
            >
                Search
            </Button>
        </div>
    )
}
export default FormBySearch;