import React from "react";
import EntityListItem from "./EntityListItem";
import EntityListSearch from "./EntityListSearch";
import EntityListView from "./EntityListView";
import EntityReturnButton from "./EntityReturnButton";

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
        if (this.state.currPage < page && this.state.allItems.results.length < ((page + 1) * this.state.rowsPerPage)) {
            this.loadAdditionalItems()
        }
        this.setState({currPage: page});
    }



    handleChangeValue = e => {
            let searchText = e.target.value;
            if(this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                fetch(`https://swapi.co/api/people?search=${searchText}`)
                    .then(response => response.json())
                    .then(data => this.setState({allItems: data}))
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


render()
{
    const {allItems, currPage, rowsPerPage, selectedItem, value} = this.state
    return (
        <>
            {!selectedItem ?
                //Вопрос с ключами. Если их не ставить - сыпятся ворнинги, как лучше сделать?
                [<EntityListSearch key={0} value={value}
                                   onChangeValue={this.handleChangeValue}/>,
                    <EntityListItem key={1} selectItem={this.handleCellClick} allItems={allItems}
                                    currPage={currPage}
                                    rowsPerPage={rowsPerPage} handleChangePage={this.onChangePage}
                                    handleChangeRowsPerPage={this.changeRowsPerPage}/>] :
                [<EntityReturnButton key={2} handleClick={this.handleCellClick}> Return </EntityReturnButton>,
                    <EntityListView key={3} selectedItem={selectedItem}/>]
            }
        </>
    )
}

}

export default EntityList


