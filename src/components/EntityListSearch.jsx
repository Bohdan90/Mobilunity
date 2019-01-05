import React from "react";
import {TextField} from "@material-ui/core";

function EntityListSearch(props) {
    return (
        <TextField
            id="outlined-name"
            label="Filter"
            value={props.value}
            onChange={props.onChangeValue}
            margin="normal"
            variant="outlined"
        />
    )
}

export default EntityListSearch;
