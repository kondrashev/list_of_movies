import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

function FormByAPIkey(props) {
    const [valueKey, setValueKey] = React.useState('');
    const keyChange = (event) => {
        setValueKey(event.target.value);
    }
    const writeAPIkey = () => {
        localStorage.APIkey = valueKey;
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            writeAPIkey();
        }
    }
    return (
        <div
            className='form_api_key'
        >
            <button
                className='close_form_api_key'
                onClick={props.toggleFormByAPIkey}
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
            <div
                style={{
                    alignSelf: 'self-start',
                    marginLeft: '10px'
                }}
            >
                <DirectionsWalkIcon
                    style={{
                        color: 'blue'
                    }}
                />
                <a
                    target='_blank'
                    href='http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFggCAQ8QDxYCHgdDaGVja2VkZ2RkZGQCAw8QDxYCHwBoZGRkZAIFDxYCHgdWaXNpYmxlZ2QCBw8WAh8BaGQCAg8WAh8BaGQCAw8WAh8BaGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgMFC3BhdHJlb25BY2N0BQhmcmVlQWNjdAUIZnJlZUFjY3S0gwjl9jaVfARil8Yy9nisxxBo9QY1d1aRp4k6s2f83g%3D%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAW77Mkj8S6lO0evPKayW3ucmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulGmtD1h9A7%2B3Av2cTK2Z2qbhaCErXs89aADzZLPwy5pm&at=freeAcct&Email='
                >
                    GO TO RESOURCE
                    </a>
            </div>
            <TextField
                label="Input API key"
                type="search"
                variant="outlined"
                value={valueKey}
                onChange={keyChange}
                onKeyPress={onKeyPress}
                style={{
                    width: '330px'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                disableElevation
                disabled={!valueKey}
                onClick={writeAPIkey}
                style={{
                    width: '330px',
                    height: '50px',
                    marginBottom: '50px'
                }}
            >
                Write key
            </Button>
        </div>
    )
}
export default FormByAPIkey;