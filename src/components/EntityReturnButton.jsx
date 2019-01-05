import React from 'react';
import Button from "@material-ui/core/Button/Button";


function EntityReturnButton(props) {
return (
    <Button variant="outlined" onClick={props.handleClick}>
        Return
    </Button>
)
}
export default EntityReturnButton
