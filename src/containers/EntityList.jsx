import React from "react";
import EntityListItem from "../components/EntityListItem";
import EntityListSearch from "../components/EntityListSearch";
import EntityListView from "./EntityListView";
import EntityReturnButton from "../components/EntityReturnButton";

export class EntityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems: [], selectedItem: null, currPage: 0, count: 0, rowsPerPage: 10
        }
    }


    async componentDidMount() {
        const response = await fetch('https://swapi.co/api/people/')
        const data = await response.json()
        this.setState({allItems: data})
    }


    onChangePage = (event, page) => {
        if (this.state.currPage < page && this.state.allItems.results.length < ((page + 1) * this.state.rowsPerPage)) {
            this.loadAdditionalItems()
        }
        this.setState({currPage: page});
    }


    handleChangeValue = (e) => {
        let searchText = e.target.value;
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            const response = await fetch(`https://swapi.co/api/people?search=${searchText}`)
            const data = await response.json()
            this.setState({allItems: data})
        }, 500);
    }

    loadAdditionalItems() {
        const {next} = this.state.allItems
        if (next) {
            fetch(next)
                .then(response => response.json())
                .then(data => this.setState(prevState => ({
                    allItems: {
                        ...prevState.allItems,
                        next: data.next,
                        previous: data.previous,
                        results: [...this.state.allItems.results, ...data.results]
                    }
                })))
        }
    }

    changeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleCellClick = rowItem => {
        if (!this.state.selectedItem) {
            this.setState({selectedItem: rowItem})
        } else {
            this.setState({selectedItem: null})
        }
    }


    render() {
        const {allItems, currPage, rowsPerPage, selectedItem, value} = this.state
        return (
            !selectedItem ?
                <React.Fragment>
                    <EntityListSearch value={value}
                                      onChangeValue={this.handleChangeValue}/>
                    <EntityListItem selectItem={this.handleCellClick} allItems={allItems}
                                    currPage={currPage}
                                    rowsPerPage={rowsPerPage} handleChangePage={this.onChangePage}
                                    handleChangeRowsPerPage={this.changeRowsPerPage}/>
                </React.Fragment> : <React.Fragment>
                    <EntityReturnButton handleClick={this.handleCellClick}> Return </EntityReturnButton>
                    <EntityListView selectedItem={selectedItem}/>
                </React.Fragment>
        )
    }

}

export default EntityList


