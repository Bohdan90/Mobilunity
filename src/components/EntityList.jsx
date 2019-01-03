import React from "react";
import EntityListItem from "./EntityListItem";
import EntityListSearch from "./EntityListSearch";
import EntityListView from "./EntityListView";

export class EntityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           allItems: [], selectedItem: null, currPage: 0, count: 0, rowsPerPage: 10
        }
    }


    componentDidMount() {
        fetch('https://swapi.co/api/people/')
            .then(response => response.json())
            .then(data => this.setState({allItems: data}));

    }


    onChangePage = (event, page) => {
        this.setState({currPage: page});
    }

    handleChangeValue = e => {
        fetch(`https://swapi.co/api/people?search=${e.target.value}`)
            .then(response => response.json())
            .then(data => this.setState({allItems: data}));
    }

    changeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleCellClick = rowItem => {


       this.setState({selectedItem: rowItem})
    }

    render() {
        const {allItems, currPage, rowsPerPage, selectedItem, value} = this.state
        return (
            <>
                <EntityListSearch value={value}
                                  onChangeValue={this.handleChangeValue}/>
                {!selectedItem ?
                    <EntityListItem selectItem={this.handleCellClick} allItems={allItems}
                                    currPage={currPage}
                                    rowsPerPage={rowsPerPage} handleChangePage={this.onChangePage}
                                    handleChangeRowsPerPage={this.changeRowsPerPage}/> :
                    <EntityListView selectedItem={selectedItem}/>}
            </>
        )
    }

}

export default EntityList


