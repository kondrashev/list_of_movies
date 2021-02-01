import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

function PaginationButtons(props) {
    return (
        <Pagination
            count={props.count}
            variant="outlined"
            onChange={props.changeNumberPage}
            shape="rounded"
            style={{
                position: 'fixed',
                left: '50%',
                transform: 'translate(-50%,0)',
                bottom: '0px'
            }}
        />
    )
}
export default PaginationButtons;