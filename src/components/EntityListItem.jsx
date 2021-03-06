import {Paper, Table, TableBody, TableCell, TablePagination, TableRow} from "@material-ui/core";
import React from "react";

function EntityListItem(props) {
    let {currPage, rowsPerPage} = props
    let {results, count} = props.allItems
    return (
        <Paper>
            <Table>
                <TableBody>
                    {results ? results.slice(currPage * rowsPerPage, currPage * rowsPerPage + rowsPerPage).map(item => {
                        return (<TableRow key={item.name} onClick={event => props.selectItem(item, event)}>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>)
                    }) : <></>}

                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={count ? count : 0}
                rowsPerPage={rowsPerPage ? rowsPerPage : 0}
                rowsPerPageOptions={[5, 10]}
                page={props.currPage}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}

            />
        </Paper>
    )

}

export default EntityListItem;
